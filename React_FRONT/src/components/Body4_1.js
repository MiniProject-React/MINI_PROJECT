import React from "react";
import "../css/Body4_1.css";

function Body() {
  return (
    <div className="body-container">
      {/* 첫 번째 큰 박스 */}
      <a href="/own-pc" className="box large-box">
        <img src="/Main_Image4/MAIN_1.jpg" alt="Page 1" />
        <div className="overlay-content">
          <p className="font-size1">조립PC 견적 맞추기</p>
        </div>
      </a>
      {/* 나머지 작은 박스들 */}
      <a href="/product/sorted/1" className="box small-box">
        <img src="/Main_Image4/MAIN_2.jpg" alt="Page 2" />
        <div className="overlay-content">
          <p className="font-size2">CPU</p>
        </div>
      </a>
      <a href="/product/sorted/4" className="box small-box">
        <img src="/Main_Image4/MAIN_3.jpg" alt="Page 3" />
        <div className="overlay-content">
          <p className="font-size2">RAM</p>
        </div>
      </a>
      <a href="/product/sorted/5" className="box small-box">
        <img src="/Main_Image4/MAIN_4.jpg" alt="Page 4" />
        <div className="overlay-content">
          <p className="font-size2">SSD</p>
        </div>
      </a>
      <a href="/product/sorted/3" className="box small-box">
        <img src="/Main_Image4/MAIN_5.jpg" alt="Page 5" />
        <div className="overlay-content">
          <p className="font-size2">Board</p>
        </div>
      </a>
      <a href="/product/sorted/2" className="box small-box">
        <img src="/Main_Image4/MAIN_6.jpg" alt="Page 6" />
        <div className="overlay-content">
          <p className="font-size2">GPU</p>
        </div>
      </a>
      <a href="/product/sorted/6" className="box small-box">
        <img src="/Main_Image4/MAIN_7.jpg" alt="Page 7" />
        <div className="overlay-content">
          <p className="font-size2">HDD</p>
        </div>
      </a>
    </div>
  );
}

export default Body;
