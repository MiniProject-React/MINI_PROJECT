import React, { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// firebase
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../api/firebase";
import { Pagination, Navigation } from "swiper/modules";
import axios from "axios";
import MyComponent from "../../components/MyComponent";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../../css/style1.css";
import "../../css/product.css";
import { Button3 } from "../../components/style3";

const KH_DOMAIN = "http://localhost:8112";

export default function AdminHome() {
  // State for storing product categories
  const [cpu, setCpu] = useState([]);
  const [gpu, setGpu] = useState([]);
  const [main, setMain] = useState([]);
  const [ram, setRam] = useState([]);
  const [ssd, setSsd] = useState([]);
  const [power, setPower] = useState([]);

  // State for storing image URLs
  const [cpuImage, setCpuImage] = useState({});
  const [gpuImage, setGpuImage] = useState({});
  const [mainImage, setMainImage] = useState({});
  const [ramImage, setRamImage] = useState({});
  const [ssdImage, setSsdImage] = useState({});
  const [powerImage, setPowerImage] = useState({});

  // Fetch product data from the backend
  const totalList = async () => {
    try {
      const response = await axios.get(KH_DOMAIN + "/products/list");
      const data = response.data;
      // Update the state with product categories
      setCpu(data.cpu);
      setGpu(data.gpu);
      setMain(data.main);
      setRam(data.ram);
      setSsd(data.ssd);
      setPower(data.power);

      // Fetch images only if there are products in the category
      if (data.cpu && data.cpu.length > 0) {
        fetchImage(data.cpu, "cpu");
      }
      if (data.gpu && data.gpu.length > 0) {
        fetchImage(data.gpu, "gpu");
      }
      if (data.main && data.main.length > 0) {
        fetchImage(data.main, "main");
      }
      if (data.ram && data.ram.length > 0) {
        fetchImage(data.ram, "ram");
      }
      if (data.ssd && data.ssd.length > 0) {
        fetchImage(data.ssd, "ssd");
      }
      if (data.power && data.power.length > 0) {
        fetchImage(data.power, "power");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Fetch image URLs from Firebase
  const fetchImage = async (productList, category) => {
    const imagePromises = productList.map(async (item) => {
      const imageRef = ref(
        storage,
        `images/${item.category}/${item.product}.jpg`
      );
      try {
        const downloadUrl = await getDownloadURL(imageRef);
        return { productId: item.product_id, downloadUrl };
      } catch (err) {
        console.error(`Error fetching image for ${item.name}:`, err);
        return { productId: item.product_id, downloadUrl: null }; // Handle error gracefully
      }
    });

    const imageResults = await Promise.all(imagePromises);
    const imageMap = imageResults.reduce((acc, cur) => {
      acc[cur.productId] = cur.downloadUrl;
      return acc;
    }, {});

    // Update the appropriate image state based on category
    if (category === "cpu") setCpuImage(imageMap);
    if (category === "gpu") setGpuImage(imageMap);
    if (category === "main") setMainImage(imageMap);
    if (category === "ram") setRamImage(imageMap);
    if (category === "ssd") setSsdImage(imageMap);
    if (category === "power") setPowerImage(imageMap);
  };

  // Fetch data when the component mounts
  useEffect(() => {
    totalList();
  }, []);

  // Swiper configuration for each category
  const renderSwiper = (category, items, imageMap) => (
    <Swiper
      slidesPerView={6}
      spaceBetween={30}
      pagination={{ type: "fraction" }}
      navigation={true}
      modules={[Pagination, Navigation]}
      className="cpuSwiper"
    >
      {items.length > 0 ? (
        items.map((a) => (
          <SwiperSlide key={a.product_id} className="product-slide">
            <div className="product-image">
              {imageMap[a.product_id] ? (
                <img src={imageMap[a.product_id]} alt={a.name} />
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

  return (
    <>
      <Button3>상품 추가</Button3>

      {/* Render each category swiper */}
      {renderSwiper("cpu", cpu, cpuImage)}
      {renderSwiper("gpu", gpu, gpuImage)}
      {renderSwiper("main", main, mainImage)}
      {renderSwiper("ram", ram, ramImage)}
      {renderSwiper("ssd", ssd, ssdImage)}
      {renderSwiper("power", power, powerImage)}
    </>
  );
}
