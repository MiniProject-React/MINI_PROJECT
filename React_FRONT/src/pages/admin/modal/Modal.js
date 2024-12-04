import axios from "axios";
import React, { useEffect, useState } from "react";
import { ModalStyle, ModalButton } from "../style/ModalStyle";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../../api/firebase";

const Modal = (props) => {
  const { open, close, type, productId, category, productName } = props;
  const [productDetail, setProductDetail] = useState(null);
  const [url, setUrl] = useState(null);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null); // 업로드할 파일

  useEffect(() => {
    if (productId) {
      DetailProduct();
    }
    if (category && productName) {
      getImage();
    }
  }, [productId, category, productName]);

  const DetailProduct = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8112/products/detail",
        {
          params: { productId: productId }, // 쿼리 파라미터로 전달
        }
      );
      setProductDetail(response.data.detailList);
    } catch (error) {
      console.error("Error fetching product detail:", error);
    }
  };

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
    setFile(e.target.files[0]);
  };
  // 업로드 버튼 클릭 핸들러
  const handleUploadClick = () => {
    if (!file) {
      alert("파일을 선택해주세요.");
      return;
    }
    const storageRef = ref(
      storage,
      `images/${category}/${productDetail[0].name}`
    ); // Firebase Storage 참조
    const fileRef = storageRef;
    fileRef
      .put(file) // 파일 업로드
      .then(() => {
        console.log("파일 업로드 성공!");
        return fileRef.getDownloadURL(); // 업로드된 파일의 URL 가져오기
      })
      .then((downloadUrl) => {
        console.log("저장된 경로:", downloadUrl);
        setUrl(downloadUrl); // 이미지 URL 상태 업데이트
      })
      .catch((error) => {
        console.error("업로드 중 에러 발생:", error);
      });
  };
  const update = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8112/products/update",
        productDetail[0]
      );
      if (response.data) {
        alert("수정되었습니다.");
        await handleUploadClick();
      } else {
        alert("수정에 실패하였습니다.");
      }
    } catch (error) {
      console.error("Update failed:", error);
      alert("에러가 발생했습니다.");
    }
  };
  // 모달 닫을 때 상태 초기화
  const resetModal = () => {
    setProductDetail(null);
    setUrl(null);
    setFile(null);
    setError(null);
  };
  return (
    <ModalStyle>
      <div className={open ? "openModal modal" : "modal"}>
        {open && (
          <section>
            <header>
              <h2>{productId ? "상품 수정" : "상품 등록"}</h2>
              <button
                onClick={() => {
                  close();
                  resetModal();
                }}
              >
                &times;
              </button>
            </header>
            <main>
              {url && !file ? (
                <img
                  src={url}
                  alt="Downloaded File"
                  style={{ maxWidth: "100%" }}
                />
              ) : file ? (
                <img
                  src={URL.createObjectURL(file)} // 또는 업로드 후의 URL을 사용
                  alt="Downloaded File"
                  style={{ maxWidth: "100%" }}
                />
              ) : (
                <p>파일이 선택되지 않았습니다.</p> // file과 url이 모두 없는 경우
              )}

              <input type="file" onChange={handleFileInputChange} />
              {productDetail ? (
                <>
                  <div>
                    <label>종류: </label>
                    <input
                      type="text"
                      value={productDetail[0].category}
                      readOnly
                    />
                  </div>
                  <div>
                    <label>상품 이름: </label>
                    <input
                      type="text"
                      value={productDetail[0].name}
                      onChange={(e) => {
                        const updatedDetail = [...productDetail];
                        updatedDetail[0].name = e.target.value;
                        setProductDetail(updatedDetail);
                      }}
                    />
                  </div>
                  <div>
                    <label>상품 가격: </label>
                    <input
                      type="text"
                      value={productDetail[0].price}
                      onChange={(e) => {
                        const updatedDetail = [...productDetail];
                        updatedDetail[0].price = e.target.value;
                        setProductDetail(updatedDetail);
                      }}
                    />
                  </div>
                  <div>
                    <label>수량: </label>
                    <input
                      type="number"
                      value={productDetail[0].stock}
                      onChange={(e) => {
                        const updatedDetail = [...productDetail];
                        updatedDetail[0].stock = e.target.value;
                        setProductDetail(updatedDetail);
                      }}
                    />
                  </div>
                  <div>
                    <label>상세 정보: </label>
                    <input
                      value={productDetail[0].description}
                      onChange={(e) => {
                        const updatedDetail = [...productDetail];
                        updatedDetail[0].description = e.target.value;
                        setProductDetail(updatedDetail);
                      }}
                    />
                  </div>
                </>
              ) : (
                <p>상품 데이터를 불러오는 중입니다...</p>
              )}
            </main>
            <footer>
              {productId ? (
                <ModalButton onClick={() => update()}>수정</ModalButton>
              ) : (
                <ModalButton>등록</ModalButton>
              )}
              <button
                onClick={() => {
                  close();
                  resetModal();
                }}
              >
                취소
              </button>
            </footer>
          </section>
        )}
      </div>
    </ModalStyle>
  );
};

export default Modal;
