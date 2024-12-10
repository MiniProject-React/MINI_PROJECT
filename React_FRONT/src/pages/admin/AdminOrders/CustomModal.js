import { ModalStyle, ModalButton } from "../style/ModalStyle";
import { Container, Items } from "../../../components/SignupComponent";
import { useEffect } from "react";

const CustomModal = (props) => {
  const { open, close, type, customOrderList } = props;
  useEffect(() => {
    console.log("커스텀");
  });
  return (
    <>
      <ModalStyle>
        <div
          className={open ? "modal fade show d-block" : "modal fade"}
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          {open ? (
            <section>
              <div className="modal-dialog">
                <div className="modal-content">
                  <header className="modal-header">
                    <h2 className="modal-title">커스텀 주문</h2>
                    <button
                      type="button"
                      className="btn-close"
                      aria-label="Close"
                      onClick={() => close()}
                    />
                  </header>
                  <main>
                    <Container></Container>
                  </main>
                  <footer>
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
          ) : (
            <p>상세 정보를 불러오는 중입니다...</p>
          )}
        </div>
      </ModalStyle>
    </>
  );
};

export default CustomModal;
