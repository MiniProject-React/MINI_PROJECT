import React from "react";
// Import Swiper React components
import { Swiper as SwiperComponent, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "../../css/styles.css";

// import required modules
import { Pagination } from "swiper/modules";

const pagination = {
  clickable: true,
  renderBullet: (index, className) => {
    return '<span class="' + className + '">' + (index + 1) + "</span>";
  },
};

const SwiperExample = () => {
  return (
    <SwiperComponent
      pagination={pagination}
      modules={[Pagination]}
      className="mySwiper"
    >
      <SwiperSlide>Slide 1</SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
      <SwiperSlide>Slide 3</SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide>
      <SwiperSlide>Slide 5</SwiperSlide>
      <SwiperSlide>Slide 6</SwiperSlide>
      <SwiperSlide>Slide 7</SwiperSlide>
      <SwiperSlide>Slide 8</SwiperSlide>
      <SwiperSlide>Slide 9</SwiperSlide>
    </SwiperComponent>
  );
};

export default SwiperExample;
