import React, { useEffect, useState } from 'react'
import './Footer.css'
import { NavLink } from 'react-router-dom'
import { Button, Row } from 'react-bootstrap'
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
function Footer() {
    const [visible, setVisible] = useState(false)

    const currentLanguageCode = localStorage.getItem('i18nextLng') || 'en'
    const currentLanguage = languages.find((l) => l.code === currentLanguageCode)
    const { t, i18n } = useTranslation();
    useEffect(() => {
        document.body.dir = currentLanguage.dir || 'ltr'
    }, [currentLanguage, t])

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300) {
            setVisible(true)
        }
        else if (scrolled <= 300) {
            setVisible(false)
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    window.addEventListener('scroll', toggleVisible);
    return (
        <div >
            <footer className="text-center text-lg-start sticky-bottom" style={{ zIndex: '50' }}>
                {/* Part SignUp */}
                <NavLink className='text-decoration-none'>
                    <div>
                        <span onClick={scrollToTop} className='btn_top'>{t('Backtotop')}</span>
                    </div>
                </NavLink>

                <div className="container p-4">
                    <div className="row">
                        <Row xs={4} md={4} sm={4}>
                            <div className="col-lg-3 col-md-3 col-xs-6 mb-4 mb-md-0">
                                <div className="text-bold titel">{t('GettoKnowUs')}</div>
                                <ul className="list-unstyled">
                                    <NavLink to='/AboutUs' className="sub_title text-decoration-none "><li>{t('AboutAmazon')}</li> </NavLink>
                                    <NavLink to='/Careers' className="sub_title text-decoration-none"><li> {t('Careers')}</li></NavLink>
                                    <NavLink to='/Amazon_Science' className="sub_title text-decoration-none"><li>  {t('AmazonScience')}</li></NavLink>
                                </ul >
                            </div >
                            <div className="col-lg-3 col-md-3 col-xs-6 mb-4 mb-md-0">
                                <div className="text-bold titel">{t('ShopwithUs')}</div>
                                <ul className="list-unstyled ">
                                    <NavLink to='/Account' className="sub_title text-decoration-none"><li>{t('YourAccount')}</li></NavLink>
                                    <NavLink to='/Order' className="sub_title text-decoration-none"><li>{t('YourOrders')}</li></NavLink>
                                    <NavLink to='/Address' className="sub_title text-decoration-none"><li>{t('Address')}</li></NavLink>
                                    <NavLink to='/List' className="sub_title text-decoration-none"><li>{t('YourLists')}</li></NavLink>
                                </ul >
                            </div >
                            <div className="col-lg-3 col-md-3 col-xs-6 mb-4 mb-md-0">
                                <div className="text-bold titel">{t('MakeMoneywithUs')}</div>
                                <ul className="list-unstyled ">
                                    <NavLink to='/' className="sub_title text-decoration-none"><li>{t('Protectandbuildyourbrand')}</li></NavLink>
                                    <NavLink to='/Address' className="sub_title text-decoration-none"><li>{t('AdvertiseYourProducts')}</li></NavLink>
                                    <NavLink to='/sell' className="sub_title text-decoration-none"><li>{t('SellonAmazon')}</li></NavLink>
                                    <NavLink to='/' className="sub_title text-decoration-none"><li>{t('FulfillmentbyAmazon')} </li></NavLink>
                                </ul >
                            </div >
                            <div className="col-lg-3 col-md-3 col-xs-6 mb-4 mb-md-0">
                                <div className="text-bold titel">{t('LetUsHelpYou')}</div>
                                <ul className="list-unstyled ">
                                    <NavLink to='/Help' className="sub_title text-decoration-none"><li>{t('Help')}</li></NavLink>
                                    <NavLink to='/Delivery' className="sub_title text-decoration-none"><li>{t('Shipping&Delivery')}</li></NavLink>
                                    <NavLink to='/' className="sub_title text-decoration-none"><li> {t('Returns&Replacements')}</li></NavLink>
                                    <NavLink to='/' className="sub_title text-decoration-none"><li>{t('AmazonAppDownload')} </li></NavLink>
                                </ul >
                            </div >
                        </Row>
                    </div >
                </div >
                {/* <hr className='mb-2' /> */}
                <div>
                </div>
                <div class="py-3 mt-3 shadow-lg" style={{ backgroundColor: '#131a22', fontSize: '12px' }}>
                    <div class="container">
                        <div class="text-center ">
                            <ul className='list-unstyled ul_footer'>
                                <NavLink to="/" className="text-white text-decoration-none">
                                    <li>{t('ConditionsofUse')}</li>
                                </NavLink>
                                <NavLink to="/" className="text-white text-decoration-none">
                                    <li>{t('PrivacyNotice')}</li>
                                </NavLink>
                                <NavLink to="/" className="text-white text-decoration-none">
                                    <li class="nav_last">{t('Interest-BasedAds')}</li>
                                </NavLink>
                            </ul>
                            <span>{t('itsaffiliates')}</span>
                        </div>
                    </div>
                </div>
            </footer >
        </div >
    )
}
export default Footer
