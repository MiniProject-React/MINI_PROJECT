import AxiosApi from "../../../api/AxiosApi3";
import { useEffect, useState, useRef } from "react";
import { ModalStyle, ModalButton } from "../style/ModalStyle";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../api/firebase";
import "bootstrap/dist/css/bootstrap.min.css";

const ProductSaveModal = (props) => {
  // 프롭스
  const { close, open, type } = props;
  // 카테고리 리스트
  const [categoryList, setCategoryList] = useState([]);
  // 이미지 출력
  const [url, setUrl] = useState(null);
  // 에러 내용 출력
  const [error, setError] = useState(null);
  // 이미지 저장
  const [file, setFile] = useState(null); // 업로드할 파일
  // 카테고리 저장
  const [category, setCategory] = useState(1);
  // 상품 이름 저장
  const [productName, setProductName] = useState("");
  // 상품 가격 저장
  const [price, setPrice] = useState("");
  //상품 수량 저장
  const [stock, setStock] = useState("");
  // 상품 상세 설명
  const [description, setDescription] = useState("");
  // 카테고리 명 저장
  const [categoryName, setCategoryName] = useState("");
  // 상품 이름 중복 검사
  const [isProductNameOK, setIsProductNameOK] = useState(false);

  useEffect(() => {
    if (open) {
      Categories();
    }
  }, [open]);
  useEffect(() => {
    if (productName) {
      productNameCheck();
    }
  }, [productName]);
  useEffect(() => {
    if (open) {
      getCatagoryName();
    }
  }, [open]);
  // 카테고리 명 가져오기
  const getCatagoryName = async () => {
    try {
      const rsp = await AxiosApi.getCatagoryName(category);
      console.log(rsp.data.categoryName[0].name);
      setCategoryName(rsp.data.categoryName[0].name);
    } catch {}
  };
  // 상품 카테고리 리스트
  const Categories = async () => {
    try {
      const rsp = await AxiosApi.categoryList();
      console.log();
      setCategoryList(rsp.data.category);
    } catch {}
  };
  // 상품 이름 중복 검사
  const productNameCheck = async () => {
    console.log("저장 모달 상품 이름 : ", productName);
    try {
      const rsp = await AxiosApi.productNameCheck(productName);
      setIsProductNameOK(rsp.data);
    } catch {}
  };
  // 상품 등록
  const productSave = async () => {
    try {
      const rsp = await AxiosApi.productSave(
        category,
        productName,
        price,
        stock,
        description
      );
      console.log(rsp.data);
      if (rsp.data === true) {
        alert("상품등록에 성공했습니다.");
        await handleUploadClick();
        close();
      } else {
        alert("상품 등록에 실패했습니다.");
      }
    } catch {}
  };

  // 업로드 버튼 클릭 핸들러
  const handleUploadClick = () => {
    if (!file) {
      alert("파일을 선택해주세요.");
      return;
    }
    const storageRef = ref(
      storage,
      `images/${categoryName}/${productName}.jpg`
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

  // 파일 선택 핸들러
  const handleFileInputChange = (e) => {
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
                  <h2 className="modal-title">상품 등록</h2>
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
                      src={URL.createObjectURL(file)}
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

                  <div className="mt-3">
                    <label>종류: </label>
                    <select
                      className="form-select"
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      {categoryList && categoryList.length > 0 ? (
                        categoryList.map((a) => (
                          <option key={a.category_id} value={a.category_id}>
                            {a.name}
                          </option>
                        ))
                      ) : (
                        <option>데이터가 없습니다.</option>
                      )}
                    </select>
                  </div>

                  <div className="mt-3">
                    <label>상품 이름: </label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => setProductName(e.target.value)}
                    />
                  </div>

                  <div className="mt-3">
                    <label>상품 가격: </label>
                    <input
                      type="number"
                      className="form-control"
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>

                  <div className="mt-3">
                    <label>수량: </label>
                    <input
                      type="number"
                      className="form-control"
                      onChange={(e) => setStock(e.target.value)}
                    />
                  </div>

                  <div className="mt-3">
                    <label>상세 정보: </label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </main>
                <footer className="modal-footer">
                  {isProductNameOK &&
                  price.length > 0 &&
                  stock.length > 0 &&
                  categoryName.length > 0 &&
                  description.length > 0 ? (
                    <ModalButton
                      onClick={productSave}
                      className="btn btn-primary"
                    >
                      등록
                    </ModalButton>
                  ) : (
                    <ModalButton disabled className="btn btn-secondary">
                      등록
                    </ModalButton>
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

export default ProductSaveModal;
