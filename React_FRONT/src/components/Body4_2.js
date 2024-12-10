import React, { useRef } from 'react';
import { Link } from 'react-router-dom'; // Link 컴포넌트 추가
import '../css/Body4_2.css';

function Body2() {
    const scrollContainerRefs = useRef([]);

    const handleMouseDown = (e, index) => {
        const container = scrollContainerRefs.current[index];
        container.isDragging = true;
        container.startX = e.pageX - container.offsetLeft;
        container.scrollLeft = container.scrollLeft || 0;
    };

    const handleMouseMove = (e, index) => {
        const container = scrollContainerRefs.current[index];
        if (!container.isDragging) return;
        const x = e.pageX - container.offsetLeft;
        const walk = (x - container.startX) * 1.5; // 스크롤 속도 조절
        container.scrollLeft -= walk;
    };

    const handleMouseUpOrLeave = (index) => {
        const container = scrollContainerRefs.current[index];
        container.isDragging = false;
    };

    const categories = [
        "완성형 조립식 컴퓨터",
        "CPU Models",
        "Board Models",
        "RAM Models",
        "GPU Models",
        "SSD Models",
        "HDD Models"
    ];

    return (
        <div className="body2-wrapper">
            {categories.map((category, sectionIndex) => (
                <div className="product-section" key={sectionIndex}>
                    <h2 className="section-title">
                        <Link to={`/product/${category}`}>{category}</Link>
                    </h2>
                    <div
                        className="body2-container"
                        ref={(el) => (scrollContainerRefs.current[sectionIndex] = el)}
                        onMouseDown={(e) => handleMouseDown(e, sectionIndex)}
                        onMouseMove={(e) => handleMouseMove(e, sectionIndex)}
                        onMouseUp={() => handleMouseUpOrLeave(sectionIndex)}
                        onMouseLeave={() => handleMouseUpOrLeave(sectionIndex)}
                    >
                        {Array.from({ length: 6 }).map((_, index) => (
                            <div key={index} className="body2-box">
                                <div className="image-section">
                                    <Link to={`/product/${category}/${index + 1}`}>
                                        <img
                                            src={`/1_Image4/product-${sectionIndex + 1}-${index + 1}.jpg`}
                                            alt={`Product ${index + 1}`}
                                        />
                                    </Link>
                                </div>
                                <div className="description-section">
                                    <Link to={`/product/${category}/${index + 1}`}>
                                        <h3>{`Product ${index + 1} Title`}</h3>
                                        <p>{`This is a description for Product ${index + 1}.`}</p>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Body2;
