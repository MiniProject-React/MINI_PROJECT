import { ModalStyle, ModalButton } from "../style/ModalStyle";

const AddCustomModal = (props) => {
  const { open, close, type } = props;

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
                  <h2 className="modal-title">커스텀 추가</h2>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={close}
                  />
                </header>
                <main>
                  <div></div>
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
