import { createContext } from "react";
import { AdminOrderProductsMap } from "../../../api/provider/ProductsSearchContextProvider";
import { ModalStyle, ModalButton } from "../style/ModalStyle";

export const USERID = createContext();

const AddOrderModal = (props) => {
  const { open, close, type, user_id } = props;
  // 여기서 user_id를 context API로 다시 한번 싸면 되지 않을까?
  // 근데 최근 order_id를 가지고 와야 함 ..... 2번 api를 타려면 예전 처럼 서비스를 만들어야 함 ....
  console.log("모달 창에서의 id 확인 :", user_id);
  return (
    <USERID.Provider value={user_id}>
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
                    <h2 className="modal-title">주문 추가</h2>
                    <button
                      type="button"
                      className="btn-close"
                      aria-label="Close"
                      onClick={close}
                    />
                  </header>
                  <main>
                    <div>
                      <AdminOrderProductsMap></AdminOrderProductsMap>
                    </div>
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
    </USERID.Provider>
  );
};
export default AddOrderModal;
