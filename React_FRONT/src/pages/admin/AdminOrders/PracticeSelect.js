import { useContext, useEffect, useState } from "react";
import AxiosApi3 from "../../../api/AxiosApi3";
import "../style/Tab.css";
import { Container } from "../style/Container";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../api/provider/UserContextProvider";
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
  const { email } = useContext(UserContext);
  useEffect(() => {
    console.log("contextAPI로 email 검증 확인 : ", email);
    if (!email) {
      navigate("/");
    }
  }, [email, navigate]);
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

  return (
    <>
      <Container className="product-users">
        <ul className="tabmenu">
          <li
            className={activeTab === "cpu" ? "active" : ""}
            onClick={() => setActiveTab("cpu")}
          >
            <a href="#cpu">CPU</a>
          </li>
          <li
            className={activeTab === "gpu" ? "active" : ""}
            onClick={() => setActiveTab("gpu")}
          >
            <a href="#gpu">GPU</a>
          </li>
          <li
            className={activeTab === "main" ? "active" : ""}
            onClick={() => setActiveTab("main")}
          >
            <a href="#main">MAIN</a>
          </li>
          <li
            className={activeTab === "ram" ? "active" : ""}
            onClick={() => setActiveTab("ram")}
          >
            <a href="#ram">RAM</a>
          </li>
          <li
            className={activeTab === "ssd" ? "active" : ""}
            onClick={() => setActiveTab("ssd")}
          >
            <a href="#ssd">SSD</a>
          </li>
          <li
            className={activeTab === "power" ? "active" : ""}
            onClick={() => setActiveTab("power")}
          >
            <a href="#power">POWER</a>
          </li>
        </ul>
        <div className="tabcontent">
          {activeTab === "cpu" && (
            <div id="cpu" className="active">
              <table>
                <thead>
                  <th></th>
                  <th>상품 ID</th>
                  <th>상품 명</th>
                  <th>상품 가격</th>
                </thead>
                <tbody>
                  {cpu ? (
                    cpu.map((cpu) => (
                      <tr key={cpu.product_id}>
                        <td>
                          <input type="checkbox"></input>
                        </td>
                        <td>{cpu.product_id}</td>
                        <td>{cpu.product}</td>
                        <td>{cpu.price}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td>데이터가 없습니다.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
          {activeTab === "gpu" && (
            <div id="gpud" className="active">
              {" "}
              <table>
                <thead>
                  <th></th>
                  <th>상품 ID</th>
                  <th>상품 명</th>
                  <th>상품 가격</th>
                </thead>
                <tbody>
                  {gpu ? (
                    gpu.map((gpu) => (
                      <tr key={gpu.product_id}>
                        <td>
                          <input type="checkbox"></input>
                        </td>
                        <td>{gpu.product_id}</td>
                        <td>{gpu.product}</td>
                        <td>{gpu.price}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td>데이터가 없습니다.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
          {activeTab === "main" && (
            <div id="gpud" className="active">
              {" "}
              <table>
                <thead>
                  <th></th>
                  <th>상품 ID</th>
                  <th>상품 명</th>
                  <th>상품 가격</th>
                </thead>
                <tbody>
                  {main ? (
                    main.map((main) => (
                      <tr key={main.product_id}>
                        <td>
                          <input type="checkbox"></input>
                        </td>
                        <td>{main.product_id}</td>
                        <td>{main.product}</td>
                        <td>{main.price}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td>데이터가 없습니다.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
          {activeTab === "ram" && (
            <div id="gpud" className="active">
              {" "}
              <table>
                <thead>
                  <th></th>
                  <th>상품 ID</th>
                  <th>상품 명</th>
                  <th>상품 가격</th>
                </thead>
                <tbody>
                  {ram ? (
                    ram.map((ram) => (
                      <tr key={ram.product_id}>
                        <td>
                          <input type="checkbox"></input>
                        </td>
                        <td>{ram.product_id}</td>
                        <td>{ram.product}</td>
                        <td>{ram.price}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td>데이터가 없습니다.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
          {activeTab === "ssd" && (
            <div id="gpud" className="active">
              {" "}
              <table>
                <thead>
                  <th></th>
                  <th>상품 ID</th>
                  <th>상품 명</th>
                  <th>상품 가격</th>
                </thead>
                <tbody>
                  {ssd ? (
                    ssd.map((ssd) => (
                      <tr key={ssd.product_id}>
                        <td>
                          <input type="checkbox"></input>
                        </td>
                        <td>{ssd.product_id}</td>
                        <td>{ssd.product}</td>
                        <td>{ssd.price}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td>데이터가 없습니다.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
          {activeTab === "power" && (
            <div id="gpud" className="active">
              {" "}
              <table>
                <thead>
                  <th></th>
                  <th>상품 ID</th>
                  <th>상품 명</th>
                  <th>상품 가격</th>
                </thead>
                <tbody>
                  {power ? (
                    power.map((power) => (
                      <tr key={power.product_id}>
                        <td>
                          <input type="checkbox"></input>
                        </td>
                        <td>{power.product_id}</td>
                        <td>{power.product}</td>
                        <td>{power.price}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td>데이터가 없습니다.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </Container>
    </>
  );
};

export default PracticeSelect;
