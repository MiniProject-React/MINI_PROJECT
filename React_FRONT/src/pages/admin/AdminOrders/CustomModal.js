import { ModalStyle } from "../style/ModalStyle";
import { useEffect } from "react";

const CustomModal = (props) => {
  const { open, close, customOrderList } = props;

  useEffect(() => {
    console.log("커스텀 모달 렌더링");
  }, []);

  return (
    <ModalStyle>
      <div
        className={open ? "modal fade show d-block" : "modal fade"}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden={!open}
        style={{ background: "rgba(0, 0, 0, 0.5)" }} // 모달 배경 처리
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            {/* Header */}
            <div className="modal-header">
              <h5 className="modal-title">커스텀 주문 상세 정보</h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={close}
              ></button>
            </div>

            {/* Main Content */}
            <div className="modal-body">
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead className="thead-dark">
                    <tr>
                      <th>카테고리</th>
                      <th>제품 명</th>
                      <th>가격</th>
                      <th>수량</th>
                      <th>총액</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customOrderList && customOrderList.length > 0 ? (
                      customOrderList.map((custom, index) => (
                        <tr key={index}>
                          <td>{custom.category}</td>
                          <td>{custom.product}</td>
                          <td>{custom.price}</td>
                          <td>{custom.quantity}</td>
                          <td>{custom.subtotal}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="text-center">
                          데이터가 없습니다.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Footer */}
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={close}
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      </div>
    </ModalStyle>
  );
};

export default CustomModal;
