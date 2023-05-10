import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/swiper-bundle.css";
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import './Slider.css';
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";

const languages = [
    {
        code: 'en',
        name: 'English',
        country_code: 'us',
    },
    {
        code: 'ar',
        name: 'العربية',
        dir: 'rtl',
        country_code: 'eg',
    },
]
const SliderCategory = ({ categoryID, flag }) => {
    // console.log(categoryID, " ", flag);
    const [product, setProduct] = useState([]);
    const navigate = useNavigate();

    const currentLanguageCode = localStorage.getItem('i18nextLng') || 'en'
    const currentLanguage = languages.find((l) => l.code === currentLanguageCode)
    const { t, i18n } = useTranslation();
    useEffect(() => {
        document.body.dir = currentLanguage.dir || 'ltr'
    }, [currentLanguage, t])

    useEffect(() => {
        axios.get(`http://localhost:8000/products?categoryID=${categoryID}`,
            {
                headers: {
                    'content-type': 'application/json',
                    'lang': currentLanguageCode
                }
            }
        ).then(res => {
            const category = res.data.data;
            console.log(category);
            setProduct(category)
        }).catch((err) => {
            console.log(err);
        })
    }, [currentLanguageCode]);

    const CheckSlider = product.map((item) => (
        (flag === false && < SwiperSlide key={item.id} >
            <span className='a-list-item-slider'>
                <NavLink to={`/product/${item._id}`}>
                    <img className='img-responsive' src={item.images} />
                </NavLink>
            </span>
        </SwiperSlide >) ||
        (flag === true && < SwiperSlide key={item.id} style={{}}>
            {/* <h5 class="card-title">Card title</h5> */}
            <div className='container'>
                <div className='p-4'>
                    <div className="card">
                        <div className='row' id='footer__part'>
                            <div className='col-12'>
                                <div className='image__footer'>
                                    <img src={item.images} className="d-flex mx-auto justify-content-center img-responsive" alt="..." />
                                </div>
                                <div class="card-body">
                                    {/* <NavLink to='/product' className='mb-1 text-decoration-none '> */}
                                        <p onClick={()=>{navigate(`/product/${item._id}`)}} className="card-text title_Details_Data" style={{ marginBottom: '11px' }}>{item.name}</p>
                                    {/* </NavLink> */}
                                    <div>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="ratings" >
                                                <i className="fa fa-star rating-color"></i>
                                                <i className="fa fa-star rating-color" ></i>
                                                <i className="fa fa-star rating-color" ></i>
                                                <i className="fa fa-star rating-color" ></i>
                                                <i className="fa fa-star"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='d-flex'>
                                        <p>{item.rating}</p>
                                        <span className='' style={{
                                            fontSize: '11px', paddingRight: '2px', top: '-0.3em'
                                        }}>EGP</span>
                                        <p className="card-text fw-bold">{item.price}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SwiperSlide >
        )
    ));
    return (
        <div>
            <>
                {
                    currentLanguage.code === 'en' ? <>
                        <Swiper
                            modules={[Navigation]}
                            spaceBetween={50}
                            slidesPerView={1}
                            navigation
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
                            {CheckSlider}
                        </Swiper >
                    </>
                        : <>
                            <Swiper
                                dir="rtl"
                                modules={[Navigation]}
                                spaceBetween={50}
                                slidesPerView={1}
                                navigation
                                className="mySwiper"
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
                                {CheckSlider}
                            </Swiper>
                        </>
                }
            </>
        </div>
    );
}
export default SliderCategory