import { ModalStyle, ModalButton } from "../style/ModalStyle";
import { useNavigate, useParams } from "react-router-dom";

const AddCustomModal = (props) => {
  const { open, close, type } = props;
  const { user_id } = useParams(); // Destructure user_id from useParams
  const navigate = useNavigate();

  const CustomOrder = () => {
    navigate(`/select/${user_id}`); // Navigate to /select/${user_id}
  };

  return (
    <ModalStyle>
      <div
        className={open ? "modal fade show d-block" : "modal fade"}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden={open ? "false" : "true"} // Handle accessibility
      >
        {open && (
          <section>
            <div className="modal-dialog">
              <div className="modal-content">
                <header className="modal-header">
                  <h2 className="modal-title">커스텀 추가</h2>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={close}
                  />
                </header>
                <main>
                  <button className="btn btn-secondary" onClick={CustomOrder}>
                    커스텀 주문으로 이동하기
                  </button>
                </main>
                <footer>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={close}
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

export default AddCustomModal;
