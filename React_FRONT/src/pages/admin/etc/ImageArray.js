import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { Pagination, Navigation } from "swiper/modules";
import axios from "axios";
import { storage } from "../../api/firebase";
import "../../css/product.css";
const ProductSwiper = () => {
  const KH_DOMAIN = "http://localhost:8112";

  const [cpu, setCpu] = useState([]);
  const [images, setImages] = useState({});
  const [error, setError] = useState("");

  // 오라클 DB에서 상품 리스트 가져오기
  const totalList = async () => {
    try {
      const response = await axios.get(KH_DOMAIN + "/products/list");
      const data = response.data;

      // 상품별로 상태 설정
      setCpu(data.cpu);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Firebase Storage에서 각 상품 이미지 가져오기
  const fetchImages = async (cpuList) => {
    const imagePromises = cpuList.map(async (item) => {
      const imageRef = ref(
        storage,
        `images/${item.category}/${item.product}.jpg`
      );
      try {
        const url = await getDownloadURL(imageRef);
        return { productId: item.product_id, url }; // 각 상품 ID와 URL 매핑
      } catch (err) {
        console.error(`Error fetching image for ${item.name}:`, err);
        return { productId: item.product_id, url: null }; // 에러 처리
      }
    });

    const imageResults = await Promise.all(imagePromises);
    const imageMap = imageResults.reduce((acc, cur) => {
      acc[cur.productId] = cur.url;
      return acc;
    }, {});

    setImages(imageMap); // 이미지 상태 업데이트
  };

  useEffect(() => {
    const fetchData = async () => {
      await totalList(); // DB에서 데이터 가져오기
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (cpu.length > 0) {
      fetchImages(cpu); // CPU 리스트를 기반으로 이미지 가져오기
    }
  }, [cpu]);

  return (
    <Swiper
      onSwiper={(swiper) => console.log(swiper)}
      slidesPerView={6}
      spaceBetween={30}
      pagination={{
        type: "fraction",
      }}
      navigation={true}
      modules={[Pagination, Navigation]}
      className="cpuSwiper"
    >
      {cpu.length > 0 ? (
        cpu.map((a) => (
          <SwiperSlide key={a.product_id} className="product-slide">
            <div className="product-image">
              {images[a.product_id] ? (
                <img src={images[a.product_id]} alt={a.name} />
              ) : (
                <p>이미지를 불러오는 중...</p>
              )}
            </div>
            <div className="product-info">
              <h3 className="product-name">{a.name}</h3>
              <p className="product-price">{a.price.toLocaleString()}원</p>
            </div>
          </SwiperSlide>
        ))
      ) : (
        <SwiperSlide>데이터가 없습니다.</SwiperSlide>
      )}
    </Swiper>
  );
};

export default ProductSwiper;
