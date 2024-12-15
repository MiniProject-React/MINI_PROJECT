import { useContext, useEffect, useState } from "react";
import AxiosApi3 from "../../../api/AxiosApi3";
import "../style/Tab.css";
import { Container1 } from "../style/Container";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../api/provider/UserContextProvider";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap 스타일 추가
import "../style/radio.css";
const PracticeSelect = () => {
  const [activeTab, setActiveTab] = useState("cpu");
  const [productList, setProductList] = useState([]);
  const [cpu, setCpu] = useState([]);
  const [gpu, setGpu] = useState([]);
  const [main, setMain] = useState([]);
  const [ram, setRam] = useState([]);
  const [ssd, setSsd] = useState([]);
  const [power, setPower] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  useEffect(() => {
    console.log("contextAPI로 email 검증 확인 : ", user.email);
    if (user.role !== 1) {
      navigate("/login");
    }
  }, [user.email, navigate]);

  useEffect(() => {
    productListForSelect();
  }, []);

  const productListForSelect = async () => {
    const rsp = await AxiosApi3.productList();
    setProductList(rsp.data);
    setGpu(rsp.data.gpu);
    setMain(rsp.data.main);
    setCpu(rsp.data.cpu);
    setRam(rsp.data.ram);
    setSsd(rsp.data.ssd);
    setPower(rsp.data.power);
  };
  const handleTabClick = (e, tabName) => {
    e.preventDefault(); // 기본 링크 동작 방지
    setActiveTab(tabName); // 탭 활성화
  };
  return (
    <>
      <Container1 className="product-users">
        {/* Bootstrap 클래스를 사용하여 탭 스타일 적용 */}
        <ul className="nav nav-pills bg-dark p-2">
          <li className="nav-item" onClick={() => setActiveTab("cpu")}>
            <a
              className={`nav-link ${
                activeTab === "cpu" ? "active" : ""
              } text-white`}
              href="#"
              onClick={(e) => handleTabClick(e, "cpu")}
            >
              CPU
            </a>
          </li>
          <li className="nav-item" onClick={() => setActiveTab("gpu")}>
            <a
              className={`nav-link ${
                activeTab === "gpu" ? "active" : ""
              } text-white`}
              href="#"
              onClick={(e) => handleTabClick(e, "gpu")}
            >
              GPU
            </a>
          </li>
          <li className="nav-item" onClick={() => setActiveTab("main")}>
            <a
              className={`nav-link ${
                activeTab === "main" ? "active" : ""
              } text-white`}
              href="#"
              onClick={(e) => handleTabClick(e, "main")}
            >
              MAIN
            </a>
          </li>
          <li className="nav-item" onClick={() => setActiveTab("ram")}>
            <a
              className={`nav-link ${
                activeTab === "ram" ? "active" : ""
              } text-white`}
              href="#"
              onClick={(e) => handleTabClick(e, "ram")}
            >
              RAM
            </a>
          </li>
          <li className="nav-item" onClick={() => setActiveTab("ssd")}>
            <a
              className={`nav-link ${
                activeTab === "ssd" ? "active" : ""
              } text-white`}
              href="#"
              onClick={(e) => handleTabClick(e, "ssd")}
            >
              SSD
            </a>
          </li>
          <li className="nav-item" onClick={() => setActiveTab("power")}>
            <a
              className={`nav-link ${
                activeTab === "power" ? "active" : ""
              } text-white`}
              href="#"
              onClick={(e) => handleTabClick(e, "power")}
            >
              POWER
            </a>
          </li>
        </ul>

        {/* 탭 콘텐츠 영역 */}
        <div className="tabcontent bg-dark text-white p-4">
          {/* CPU 탭 */}
          {activeTab === "cpu" && (
            <div id="cpu" className="active">
              <table className="table table-dark">
                <thead>
                  <tr>
                    <th></th>
                    <th>상품 ID</th>
                    <th>상품 명</th>
                    <th>상품 가격</th>
                  </tr>
                </thead>
                <tbody>
                  {cpu.length > 0 ? (
                    cpu.map((cpu) => (
                      <tr key={cpu.product_id}>
                        <td>
                          <input
                            type="checkbox"
                            className="radio"
                            id={`radio-${cpu.product_id}`}
                            value={cpu.product_id}
                            name="radio"
                          />
                        </td>
                        <td>{cpu.product_id}</td>
                        <td>{cpu.name}</td>
                        <td>{cpu.price}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4">데이터가 없습니다.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* GPU 탭 */}
          {activeTab === "gpu" && (
            <div id="gpu" className="active">
              <table className="table table-dark">
                <thead>
                  <tr>
                    <th></th>
                    <th>상품 ID</th>
                    <th>상품 명</th>
                    <th>상품 가격</th>
                  </tr>
                </thead>
                <tbody>
                  {gpu.length > 0 ? (
                    gpu.map((gpu) => (
                      <tr key={gpu.product_id}>
                        <td>
                          <input
                            type="checkbox"
                            className="radio"
                            id={`radio-${gpu.product_id}`}
                            value={gpu.product_id}
                            name="radio"
                          />
                        </td>
                        <td>{gpu.product_id}</td>
                        <td>{gpu.name}</td>
                        <td>{gpu.price}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4">데이터가 없습니다.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* MAIN 탭 */}
          {activeTab === "main" && (
            <div id="main" className="active">
              <table className="table table-dark">
                <thead>
                  <tr>
                    <th></th>
                    <th>상품 ID</th>
                    <th>상품 명</th>
                    <th>상품 가격</th>
                  </tr>
                </thead>
                <tbody>
                  {main.length > 0 ? (
                    main.map((main) => (
                      <tr key={main.product_id}>
                        <td>
                          <input
                            type="checkbox"
                            className="radio"
                            id={`radio-${main.product_id}`}
                            values={main.product_id}
                            name="radio"
                          />
                        </td>
                        <td>{main.product_id}</td>
                        <td>{main.name}</td>
                        <td>{main.price}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4">데이터가 없습니다.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* RAM 탭 */}
          {activeTab === "ram" && (
            <div id="ram" className="active">
              <table className="table table-dark">
                <thead>
                  <tr>
                    <th></th>
                    <th>상품 ID</th>
                    <th>상품 명</th>
                    <th>상품 가격</th>
                  </tr>
                </thead>
                <tbody>
                  {ram.length > 0 ? (
                    ram.map((ram) => (
                      <tr key={ram.product_id}>
                        <td>
                          <input
                            type="checkbox"
                            className="radio"
                            id={`radio-${ram.product_id}`}
                            value={ram.product_id}
                            name="radio"
                          />
                        </td>
                        <td>{ram.product_id}</td>
                        <td>{ram.name}</td>
                        <td>{ram.price}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4">데이터가 없습니다.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* SSD 탭 */}
          {activeTab === "ssd" && (
            <div id="ssd" className="active">
              <table className="table table-dark">
                <thead>
                  <tr>
                    <th></th>
                    <th>상품 ID</th>
                    <th>상품 명</th>
                    <th>상품 가격</th>
                  </tr>
                </thead>
                <tbody>
                  {ssd.length > 0 ? (
                    ssd.map((ssd) => (
                      <tr key={ssd.product_id}>
                        <td>
                          <input
                            type="checkbox"
                            className="radio"
                            id={`radio-${ssd.product_id}`}
                            value={ssd.product_id}
                            name="radio"
                          />
                        </td>
                        <td>{ssd.product_id}</td>
                        <td>{ssd.name}</td>
                        <td>{ssd.price}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4">데이터가 없습니다.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* POWER 탭 */}
          {activeTab === "power" && (
            <div id="power" className="active">
              <table className="table table-dark">
                <thead>
                  <tr>
                    <th></th>
                    <th>상품 ID</th>
                    <th>상품 명</th>
                    <th>상품 가격</th>
                  </tr>
                </thead>
                <tbody>
                  {power.length > 0 ? (
                    power.map((power) => (
                      <tr key={power.product_id}>
                        <td>
                          <input
                            type="checkbox"
                            className="radio"
                            id={`radio-${power.product_id}`}
                            value={power.product_id}
                            name="radio"
                          />
                        </td>
                        <td>{power.product_id}</td>
                        <td>{power.name}</td>
                        <td>{power.price}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4">데이터가 없습니다.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </Container1>
    </>
  );
};

export default PracticeSelect;
