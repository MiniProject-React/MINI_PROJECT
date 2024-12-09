import axios from "axios";
import React, { useEffect, useState } from "react";
import { ModalStyle, ModalButton } from "../style/ModalStyle";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { storage } from "../../../api/firebase";
import AxiosApi from "../../../api/AxiosApi3";
import "bootstrap/dist/css/bootstrap.min.css";

const Modal = (props) => {
  const { open, close, type, productId, category, productName } = props;
  const [productDetail, setProductDetail] = useState(null);
  const [url, setUrl] = useState(null);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null); // 업로드할 파일
  const [message, setMessage] = useState("");
  const [fileName, setFileName] = useState(""); // 입력받은 파일 이름
  const [checkNameChnage, setCheckNameChange] = useState("");
  const [checkFileChange, setCheckFileChange] = useState("");

  // 훅
  useEffect(() => {
    if (productId) {
      DetailProduct();
    }
    if (category && productName) {
      getImage();
    }
  }, [productId, category, productName]);

  // 상품 상세 내역 출력
  const DetailProduct = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8112/products/detail",
        {
          params: { productId: productId }, // 쿼리 파라미터로 전달
        }
      );
      setProductDetail(response.data.detailList);
      console.log(
        "상품 상세 내역 조회시 디테일리스트 안에서 상품명 가져오기 : ",
        response.data.detailList[0].name
      );
      setFileName(response.data.detailList[0].name);
    } catch (error) {
      console.error("Error fetching product detail:", error);
    }
  };

  // 이미지 파일 가져오기
  const getImage = async () => {
    const fileRef = ref(storage, `images/${category}/${productName}.jpg`);
    try {
      const downloadUrl = await getDownloadURL(fileRef);
      setUrl(downloadUrl);
    } catch (err) {
      console.error("Error fetching file:", err);
      setError("파일을 가져오는 데 실패했습니다.");
    }
  };

  // 파일 선택 핸들러
  const handleFileInputChange = (e) => {
    setCheckFileChange(e.target.value);
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (!selectedFile.type.startsWith("image/")) {
        alert("이미지 파일만 업로드할 수 있습니다.");
        return;
      }
      if (selectedFile.size > 5 * 1024 * 1024) {
        alert("파일 크기는 5MB를 초과할 수 없습니다.");
        return;
      }
      const img = new Image();
      img.src = URL.createObjectURL(selectedFile);
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = 150;
        canvas.height = 150;
        ctx.drawImage(img, 0, 0, 150, 150);
        console.log("이미지 그리기 완료");
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const resizedFile = new File([blob], selectedFile.name, {
                type: "image/jpeg",
              });
              setFile(resizedFile);
              setUrl(URL.createObjectURL(resizedFile));
            } else {
              console.log("이미지 변환 중 오류 발생");
            }
          },
          "image/jpeg",
          0.95
        );
        URL.revokeObjectURL(img.src);
      };
      img.onerror = () => {
        console.log("이미지 로드 중 오류 발생");
      };
    }
  };

  // 업로드 버튼 클릭 핸들러
  const handleUploadClick = () => {
    if (!file) {
      alert("파일을 선택해주세요.");
      return;
    }
    const storageRef = ref(
      storage,
      `images/${category}/${productDetail[0].name}.jpg`
    ); // Firebase Storage 참조
    uploadBytes(storageRef, file).then((snapshot) => {
      console.log("이미지 파이어베이스 업로드 성공");
      getDownloadURL(snapshot.ref)
        .then((url) => {
          console.log("경로 : " + url);
        })
        .catch((e) => {
          console.log("파일 업로드 에러 : " + e);
        });
    });
  };

  // 상품 수정 버튼 핸들러
  const update = async () => {
    console.log(
      "상품 이미지를 바꿨을때의 상태를 점검하는지 확인 : ",
      checkFileChange.length
    );
    console.log(
      "상품 이름을 바꿨을때의 상태를 점검하는지 확인 : ",
      checkNameChnage
    );
    try {
      const response = await axios.post(
        "http://localhost:8112/products/update",
        productDetail[0]
      );
      if (response.data) {
        alert("수정되었습니다.");
        await handleUploadClick();
        if (checkFileChange.length > 0 && checkNameChnage.length > 0) {
          await handleDeleteUnuseImage();
        }
        close();
      } else {
        alert("수정에 실패하였습니다.");
      }
    } catch (error) {
      console.error("Update failed:", error);
      alert("에러가 발생했습니다.");
    }
  };

  // 상품 삭제 활성화
  const deleteProduct = async () => {
    console.log("상품 ID 삭제시 점검 : ", productId);
    try {
      const rsp = await AxiosApi.deleteProduct(productId);
      if (rsp.data === true) {
        await handleDelete();
        alert("상품이 삭제되었습니다.");
        close();
      } else {
        alert("상품을 삭제하는데 실패하였습니다.");
      }
    } catch (error) {
      console.error("상품 삭제 중 오류:", error);
      alert("상품 삭제 중 오류가 발생했습니다.");
    }
  };

  // 상품 삭제시 이미지도 같이 삭제 되도록 수정
  const handleDelete = async () => {
    if (!fileName) {
      setMessage("파일 이름을 입력해주세요.");
      return;
    }
    const fileRef = ref(storage, `/images/${category}/${fileName}.jpg`);
    try {
      await deleteObject(fileRef);
      setMessage(`${fileName} 삭제 완료!`);
      setFileName("");
      console.log(message);
    } catch (error) {
      console.error("파일 삭제 실패:", error);
      setMessage("파일 삭제 중 오류가 발생했습니다.");
    }
  };

  // 상품 이미지와 상품 이름이 같이 변경 되었을시 안쓰는 이미지를 삭제한다.
  const handleDeleteUnuseImage = async () => {
    console.log(
      "상품 이름과 상품 이미지가 다른 상태로 업데이트 될 때 작용해야할 함수까지 작동 하는지 확인"
    );

    const fileRef = ref(storage, `/images/${category}/${fileName}.jpg`);
    try {
      await deleteObject(fileRef);
      setMessage(`${fileName} 삭제 완료!`);
      setFileName("");
      console.log(message);
    } catch (error) {
      console.error("파일 삭제 실패:", error);
      setMessage("파일 삭제 중 오류가 발생했습니다.");
    }
  };

  return (
    <ModalStyle>
      <div
        className={open ? "modal fade show d-block" : "modal fade"}
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        {open && (
          <section>
            <div className="modal-dialog">
              <div className="modal-content">
                <header className="modal-header">
                  <h2 className="modal-title">상품 수정</h2>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={() => close()}
                  />
                </header>
                <main className="modal-body">
                  {url && !file ? (
                    <img
                      src={url}
                      alt="Downloaded File"
                      className="img-fluid"
                    />
                  ) : file ? (
                    <img
                      src={URL.createObjectURL(file)} // 또는 업로드 후의 URL을 사용
                      alt="Downloaded File"
                      className="img-fluid"
                    />
                  ) : (
                    <p>파일이 선택되지 않았습니다.</p>
                  )}

                  <input
                    type="file"
                    className="form-control"
                    onChange={handleFileInputChange}
                  />

                  {productDetail ? (
                    <>
                      <div className="mt-3">
                        <label>종류: </label>
                        <input
                          type="text"
                          value={productDetail[0].category}
                          readOnly
                          className="form-control"
                        />
                      </div>
                      <div className="mt-3">
                        <label>상품 이름: </label>
                        <input
                          type="text"
                          value={productDetail[0].name}
                          onChange={(e) => {
                            const updatedDetail = [...productDetail];
                            updatedDetail[0].name = e.target.value;
                            setProductDetail(updatedDetail);
                            setCheckNameChange(e.target.value);
                          }}
                          className="form-control"
                        />
                      </div>
                      <div className="mt-3">
                        <label>상품 가격: </label>
                        <input
                          type="text"
                          value={productDetail[0].price}
                          onChange={(e) => {
                            const updatedDetail = [...productDetail];
                            updatedDetail[0].price = e.target.value;
                            setProductDetail(updatedDetail);
                          }}
                          className="form-control"
                        />
                      </div>
                      <div className="mt-3">
                        <label>수량: </label>
                        <input
                          type="number"
                          value={productDetail[0].stock}
                          onChange={(e) => {
                            const updatedDetail = [...productDetail];
                            updatedDetail[0].stock = e.target.value;
                            setProductDetail(updatedDetail);
                          }}
                          className="form-control"
                        />
                      </div>
                      <div className="mt-3">
                        <label>상세 정보: </label>
                        <input
                          value={productDetail[0].description}
                          onChange={(e) => {
                            const updatedDetail = [...productDetail];
                            updatedDetail[0].description = e.target.value;
                            setProductDetail(updatedDetail);
                          }}
                          className="form-control"
                        />
                      </div>
                    </>
                  ) : (
                    <p>상품 데이터를 불러오는 중입니다...</p>
                  )}
                </main>
                <footer className="modal-footer">
                  {productId ? (
                    <>
                      <ModalButton
                        onClick={() => update()}
                        className="btn btn-primary"
                      >
                        수정
                      </ModalButton>
                      <ModalButton
                        onClick={deleteProduct}
                        className="btn btn-danger"
                      >
                        삭제
                      </ModalButton>
                    </>
                  ) : (
                    <ModalButton className="btn btn-primary">등록</ModalButton>
                  )}
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => close()}
                  >
                    취소
                  </button>
                </footer>
              </div>
            </div>
          </section>
        )}
      </div>
    </ModalStyle>
  );
};

export default Modal;
