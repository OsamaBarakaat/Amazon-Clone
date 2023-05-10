import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/swiper-bundle.css";
import { NavLink } from 'react-router-dom';
// import { Navigation } from 'swiper';


const Slider = (Data) => {
    console.log(Data.slides.length);

    var products = Data.slides.splice(4, Data.slides.length);
    return (
        <Swiper
            // dir="rtl"
            modules={[Navigation]}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            direction="vertical"
            pagination={{ clickable: true }}
            breakpoints={
                {
                    576: {
                        slidesPerView: 3,
                    },
                    // when window width is >= 768px
                    768: {
                        slidesPerView: 4,
                    },
                    // when window width is >= 1024px
                    1024: {
                        spaceBetween: 10,
                        slidesPerView: 4,
                    },
                    1280: {
                        slidesPerGroup: 2,
                        slidesPerView: 5,
                    },
                }
            }
        >
            {products.map((item) => (
                < SwiperSlide key={item.id} >
                    <NavLink to="/">
                        <img style={{ width: '15rem', height: "10rem" }} src={item.images} />
                    </NavLink>
                </SwiperSlide>
            ))
            }
        </Swiper>
    );
}
export default Slider