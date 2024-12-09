import React from 'react';
import '../css/Body4_1.css';

function Body() {
    return (
        <div className="body-container">
            {/* 첫 번째 큰 박스 */}
            <div className="box large-box">
                <a href="/page1">
                    <img src="/Main_Image4/MAIN_1.jpg" alt="Page 1"/>
                    <div className="overlay-content">
                        <p className="font-size1">부품 골라담기</p>
                        <br />
                        <a href="/page1-details" className="details-link">상세보기</a>
                    </div>
                </a>
            </div>
            {/* 나머지 작은 박스들 */}
            <div className="box small-box">
                <a href="/page2">
                    <img src="/Main_Image4/MAIN_2.jpg" alt="Page 2"/>
                    <div className="overlay-content">
                        <p className="font-size2">CPU</p>
                        <a href="/page1-details" className="details-link2">상세보기</a>
                    </div>
                </a>
            </div>
            <div className="box small-box">
                <a href="/page3">
                    <img src="/Main_Image4/MAIN_3.jpg" alt="Page 3"/>
                    <div className="overlay-content">
                        <p className="font-size2">RAM</p>
                        <a href="/page1-details" className="details-link2">상세보기</a>
                    </div>
                </a>
            </div>
            <div className="box small-box">
                <a href="/page4">
                    <img src="/Main_Image4/MAIN_4.jpg" alt="Page 4"/>
                    <div className="overlay-content">
                        <p className="font-size2">SSD</p>
                        <a href="/page1-details" className="details-link2">상세보기</a>
                    </div>
                </a>
            </div>
            <div className="box small-box">
                <a href="/page5">
                    <img src="/Main_Image4/MAIN_5.jpg" alt="Page 5"/>
                    <div className="overlay-content">
                        <p className="font-size2">Board</p>
                        <a href="/page1-details" className="details-link2">상세보기</a>
                    </div>
                </a>
            </div>
            <div className="box small-box">
                <a href="/page6">
                    <img src="/Main_Image4/MAIN_6.jpg" alt="Page 6"/>
                    <div className="overlay-content">
                        <p className="font-size2">GPU</p>
                        <a href="/page1-details" className="details-link2">상세보기</a>
                    </div>
                </a>
            </div>
            <div className="box small-box">
                <a href="/page7">
                    <img src="/Main_Image4/MAIN_7.jpg" alt="Page 7"/>
                    <div className="overlay-content">
                        <p className="font-size2">HDD</p>
                        <a href="/page1-details" className="details-link2">상세보기</a>
                    </div>
                </a>
            </div>
        </div>
    );
}

export default Body;
