import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Carousel from 'react-bootstrap/Carousel';
import './Home.css'
import { NavLink } from 'react-router-dom';
import { Card, Row } from 'react-bootstrap';
import CardData from '../../Components/CardData/CardData';
import SliderCategory from '../../Components/Slider/SliderCategory';
import { useTranslation } from 'react-i18next';
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
function Home() {
    const [category, setCategory] = useState([]);
    // const [product, setProduct] = useState([]);

    const currentLanguageCode = localStorage.getItem('i18nextLng') || 'en'
    const currentLanguage = languages.find((l) => l.code === currentLanguageCode)
    const { t, i18n } = useTranslation();
    useEffect(() => {
        document.body.dir = currentLanguage.dir || 'ltr'
    }, [currentLanguage, t])

    useEffect(() => {
        axios.get('http://localhost:8000/categorys',
            {
                headers: {
                    'content-type': 'application/json',
                    'lang': currentLanguageCode
                }
            }
        ).then(res => {
            const category = res.data.data;
            console.log(category);
            setCategory(category)
        }).catch((err) => {
            console.log(err);
        })
    }, [currentLanguageCode]);


    return (
        <div>
            <div className='home backgroundData' style={{ overflow: 'hidden', clear: 'both' }}>
                {/* Carousel Part Res Done */}
                <div className="home__container row">
                    <Carousel slide={true} className='col-12'>
                        <Carousel.Item interval={1000}>
                            <img
                                className="d-block w-100 home__image"
                                src="https://m.media-amazon.com/images/I/71bcYN6wsrL._SX3000_.jpg"
                                alt="First slide"
                            />
                        </Carousel.Item>
                        <Carousel.Item interval={1000}>
                            <img
                                className="d-block w-100 home__image"
                                src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
                                alt="First slide"
                            />
                        </Carousel.Item>
                        <Carousel.Item interval={1000}>
                            <img
                                className="d-block w-100 home__image"
                                src="https://m.media-amazon.com/images/I/61rqgjwR2gL._SX3000_.jpg"
                                alt="Second slide"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100 home__image"
                                src="https://m.media-amazon.com/images/I/61DUO0NqyyL._SX3000_.jpg"
                                alt="Third slide"
                            />
                        </Carousel.Item>
                        <Carousel.Item><Carousel.Item>
                            <img
                                className="d-block w-100 home__image"
                                src="https://m.media-amazon.com/images/I/71qid7QFWJL._SX3000_.jpg"
                                alt="Third slide"
                            />
                        </Carousel.Item>
                            <img
                                className="d-block w-100 home__image"
                                src="https://m.media-amazon.com/images/I/71PGj+t64KL._SX3000_.jpg"
                                alt="Third slide"
                            />
                        </Carousel.Item>
                        <Carousel.Item interval={1000}>
                            <img
                                className="d-block w-100 home__image"
                                src="https://m.media-amazon.com/images/I/7102I1D+77L._SX3000_.jpg"
                                alt="First slide"
                            />
                        </Carousel.Item>
                    </Carousel>
                </div>
                {/* Category Part 1 Res Done*/}
                <div className="home__row">
                    <Row xs={1} md={2} lg={4} sm={2} className='m-4'>
                        {category.slice(0, 8).map((item) => (
                            <CardData item={item} />
                        ))}
                    </Row>
                </div>
                {/*Slider Part 1*/}
                <div className='container-fluid mb-3'>
                    <div className='row'>
                        <div className='col-12'>
                            <Card className='text-dark'>
                                <Card.Body>
                                    <Card.Title className='card_title' style={currentLanguage.code == 'en' ? { textAlign: 'left' } : { textAlign: 'right' }}>
                                        <span>{t('LargeAppliances')}</span>
                                        <span className='m-3 see_More'>{t('Seemore')}</span>
                                    </Card.Title>
                                    {/* Kitchen essentials Category */}
                                    <SliderCategory categoryID='64233ff9213d64eea40879d3' flag={false} />
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </div>
                {/* Category Part 2 Res Done*/}
                <div>
                    <Row xs={1} md={2} lg={4} sm={2} className='m-4' >
                        {category.slice(8, 12).map((item) => (
                            <CardData item={item} />
                        ))}
                    </Row>
                </div>
                {/*Slider Part 2*/}
                <div className='container-fluid mb-3'>
                    <div className='row'>
                        <div className='col-12'>
                            <div>
                                <Card className='text-dark'>
                                    <Card.Body>
                                        <Card.Title className='card_title'>
                                            {t('Frequentlyrepurchased')}
                                            <span className='m-3 see_More'>{t('Seemore')}</span>
                                        </Card.Title>
                                        {/* Beauty Category */}
                                        <SliderCategory categoryID='642c7a29d5411cb75202c639' flag={false} />
                                    </Card.Body>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
                {/*Slider Part 3 Res Done*/}
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-12'>
                            <div>
                                <Card className='text-dark'>
                                    <Card.Body>
                                        <Card.Title className='card_title'>
                                            {t('FoodProduct')}
                                        </Card.Title>
                                        {/* Food Product */}
                                        <SliderCategory categoryID='642dcc3e2ae53d421296f949' flag={false} />
                                    </Card.Body>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Part SignUp  Res Done*/}
                <div className='row bg-white mt-5'>
                    <hr className='mt-5' />
                    <SliderCategory categoryID='642c7a29d5411cb75202c639' flag={true} />
                    <hr className='mt-5' />
                    <div className='text-center'>
                        <span className='text-footer'>{t('Seepersonalizedrecommendations')}</span>
                        <NavLink to="/SignIn" className="text-decoration-none">
                            <p className='loginbtn m-2 p-1' width='50px'>{t('Signin')}</p>
                        </NavLink>
                        <div>
                            <span className='text-footer'>
                                {t('NewCutomer')}
                                <NavLink to="/SignUp" className='p-2 text-decoration-none see_More'>{t('StartHere')}.</NavLink>
                            </span>
                        </div>
                        <hr className='mt-4' />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Home