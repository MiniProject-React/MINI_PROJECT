import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header4 from './components/Header4';
import Body4_1 from './components/Body4_1';
import Body4_2 from './components/Body4_2';
import Footer4 from './components/Footer4';
import ProductDetail4 from './product/ProductDetail4';  // 상세 페이지 컴포넌트 추가

function App() {
    return (
        <Router>
            <div className="App">
                <Header4 />
                <Routes>
                    <Route path="/" element={<><Body4_1 /><Body4_2 /></>} /> {/* 메인 페이지에 Body1과 Body2 보이도록 설정 */}
                    <Route path="/product/:category/:productId" element={<ProductDetail4 />} /> {/* 상세 페이지 라우트 설정 */}
                </Routes>
                <Footer4 />
            </div>
        </Router>
    );
}

export default App;
