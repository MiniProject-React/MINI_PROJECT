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
  // 체크시 확인
  const [cpuCheck, setCpuCheck] = useState(false);
  const [gpuCheck, setGpuCheck] = useState(false);
  const [mainCheck, setMainCheck] = useState(false);
  const [ramCheck, setRamCheck] = useState(false);
  const [ssdCheck, setSsdCheck] = useState(false);
  const [powerCheck, setPowerCheck] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [total, setTotal] = useState("");
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

  const CheckingCPU = (e, productId, price, name, category) => {
    setCpuCheck(true);
    handleTabClick(e, "gpu");

    // 선택한 상품 추가 및 가격 합산
    setSelectedProduct((prev) => [
      ...prev,
      { product_id: productId, price: price, name: name },
    ]);
    setTotal((prevTotal) => Number(prevTotal) + Number(price));
  };

  const CheckingGPU = (e, productId, price, name) => {
    setGpuCheck(true);
    handleTabClick(e, "main");

    setSelectedProduct((prev) => [
      ...prev,
      { product_id: productId, price: price, name: name },
    ]);
    setTotal((prevTotal) => Number(prevTotal) + Number(price));
  };

  const CheckingMAIN = (e, productId, price, name) => {
    setMainCheck(true);
    handleTabClick(e, "ram");

    setSelectedProduct((prev) => [
      ...prev,
      { product_id: productId, price: price, name: name },
    ]);
    setTotal((prevTotal) => Number(prevTotal) + Number(price));
  };

  const CheckingRAM = (e, productId, price, name) => {
    setRamCheck(true);
    handleTabClick(e, "ssd");

    setSelectedProduct((prev) => [
      ...prev,
      { product_id: productId, price: price, name: name },
    ]);
    setTotal((prevTotal) => Number(prevTotal) + Number(price));
  };

  const CheckingSSD = (e, productId, price, name) => {
    setSsdCheck(true);
    handleTabClick(e, "power");

    setSelectedProduct((prev) => [
      ...prev,
      { product_id: productId, price: price, name: name },
    ]);
    setTotal((prevTotal) => Number(prevTotal) + Number(price));
  };

  const CheckingPOWER = (e, productId, price, name) => {
    setPowerCheck(true);
    handleTabClick(e);

    setSelectedProduct((prev) => [
      ...prev,
      { product_id: productId, price: price, name: name },
    ]);
    setTotal((prevTotal) => Number(prevTotal) + Number(price));
  };

  const CustomOrder = async () => {
    const rsp = await AxiosApi3.customOrderList(selectedProduct);
  };

  const handleRefresh = () => {
    window.location.reload(); // 페이지 새로고침
  };

  return (
    <>
      <div className="container-wrapper">
        <Container1 className="product-users">
          <div className="container">
            {/* Bootstrap 클래스를 사용하여 탭 스타일 적용 */}
            <ul className="nav nav-pills bg-dark p-2">
              <li className="nav-item" onClick={() => setActiveTab("cpu")}>
                <a
                  className={`nav-link ${
                    activeTab === "cpu" ? "active" : ""
                  } text-white`}
                  href="#"
                  onClick={(e) => handleTabClick(e, "cpu", setCpuCheck(false))}
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
                  onClick={(e) => handleTabClick(e, "gpu", setGpuCheck(false))}
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
                  onClick={(e) =>
                    handleTabClick(e, "main", setMainCheck(false))
                  }
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
                  onClick={(e) => handleTabClick(e, "ram", setRamCheck(false))}
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
                  onClick={(e) => handleTabClick(e, "ssd", setSsdCheck(false))}
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
                  onClick={(e) =>
                    handleTabClick(e, "power", setPowerCheck(false))
                  }
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
                              {cpuCheck ? (
                                <>
                                  <input type="checkbox" disabled />
                                </>
                              ) : (
                                <>
                                  <input
                                    type="checkbox"
                                    className="radio"
                                    id={`radio-${cpu.product_id}`}
                                    value={cpu.product_id}
                                    name="radio"
                                    onChange={(e) =>
                                      CheckingCPU(
                                        e,
                                        cpu.product_id,
                                        cpu.price,
                                        cpu.name,
                                        cpu.category_id
                                      )
                                    }
                                  />
                                </>
                              )}
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
                              {gpuCheck ? (
                                <input type="checkbox" disabled />
                              ) : (
                                <input
                                  type="checkbox"
                                  className="radio"
                                  id={`radio-${gpu.product_id}`}
                                  value={gpu.product_id}
                                  name="radio"
                                  onChange={(e) =>
                                    CheckingGPU(
                                      e,
                                      gpu.product_id,
                                      gpu.price,
                                      gpu.name,
                                      gpu.category_id
                                    )
                                  }
                                />
                              )}
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
                              {mainCheck ? (
                                <input type="checkbox" disabled />
                              ) : (
                                <input
                                  type="checkbox"
                                  className="radio"
                                  id={`radio-${main.product_id}`}
                                  values={main.product_id}
                                  name="radio"
                                  onChange={(e) =>
                                    CheckingMAIN(
                                      e,
                                      main.product_id,
                                      main.price,
                                      main.name,
                                      main.category_id
                                    )
                                  }
                                />
                              )}
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
                              {ramCheck ? (
                                <input type="checkbox" disabled />
                              ) : (
                                <input
                                  type="checkbox"
                                  className="radio"
                                  id={`radio-${ram.product_id}`}
                                  value={ram.product_id}
                                  name="radio"
                                  onChange={(e) =>
                                    CheckingRAM(
                                      e,
                                      ram.product_id,
                                      ram.price,
                                      ram.name,
                                      ram.category_id
                                    )
                                  }
                                />
                              )}
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
                              {ssdCheck ? (
                                <input type="checkbox" disabled />
                              ) : (
                                <input
                                  type="checkbox"
                                  className="radio"
                                  id={`radio-${ssd.product_id}`}
                                  value={ssd.product_id}
                                  name="radio"
                                  onChange={(e) =>
                                    CheckingSSD(
                                      e,
                                      ssd.product_id,
                                      ssd.price,
                                      ssd.name,
                                      ssd.category_id
                                    )
                                  }
                                />
                              )}
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
                              {powerCheck ? (
                                <input type="checkbox" disabled />
                              ) : (
                                <input
                                  type="checkbox"
                                  className="radio"
                                  id={`radio-${power.product_id}`}
                                  value={power.product_id}
                                  name="radio"
                                  onChange={(e) =>
                                    CheckingPOWER(
                                      e,
                                      power.product_id,
                                      power.price,
                                      power.name,
                                      power.category_id
                                    )
                                  }
                                />
                              )}
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
          </div>
        </Container1>
        <Container1>
          {" "}
          <div className="container">
            <h3>선택한 상품 목록</h3>
            {selectedProduct.length === 0 ? (
              <p>선택한 상품이 없습니다.</p>
            ) : (
              <>
                <ul className="list-group mb-3">
                  {selectedProduct.map((item, index) => (
                    <li
                      key={index}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      {item.name} - {item.price.toLocaleString()}원
                    </li>
                  ))}
                </ul>
                <h4>총합: {total.toLocaleString()}원</h4>
              </>
            )}
          </div>
          <div>
            <button className="btn btn-warning" onClick={handleRefresh}>
              다시 선택 하기
            </button>
            {cpuCheck &&
            gpuCheck &&
            mainCheck &&
            ramCheck &&
            ssdCheck &&
            powerCheck ? (
              <button className="btn btn-secondary" onClick={CustomOrder}>
                커스텀 PC 주문
              </button>
            ) : (
              <button
                className="btn btn-secondary"
                onClick={() => alert("전체 구성을 선택해주세요")}
              >
                커스텀 PC 주문
              </button>
            )}
          </div>
        </Container1>
      </div>
    </>
  );
};

export default PracticeSelect;
