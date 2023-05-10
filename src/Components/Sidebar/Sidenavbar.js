import React, { useLayoutEffect } from 'react'
import './Sidenavbar.css'
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { Transition } from 'react-transition-group';
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
function Sidenavbar(props) {
    const [catdata, setCategoryData] = useState([])
    const [openDropDown, setOpenDropDown] = useState(false);
    const [subcategory, setSubCategory] = useState([])
    const [flag, setFalg] = useState(false)

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
            setCategoryData(category)
        }).catch((err) => {
            console.log(err);
        })
    }, [currentLanguageCode]);
    let arrowDirection = "fas fa-chevron-down";
    if (!openDropDown) {
        arrowDirection = "fas fa-chevron-down";
    } else {
        arrowDirection = "fas fa-chevron-up";
    }
    const SubCategory = (id) => {
        console.log(id);
        axios.get(`http://localhost:8000/subCategorys?category=${id}`,
            {
                headers: {
                    'content-type': 'application/json',
                    'lang': currentLanguageCode
                }
            }
        ).then(res => {
            console.log(res.data.data);
            const category = res.data.data;
            setSubCategory(category)
            setFalg(true)
        }).catch((err) => {
            console.log(err);
        })
    }
    const categoryDataPart1 = catdata.slice(0, 4).map((item) => {
        return (
            <>
                <div className="sidenavRow" key={item._id} onClick={() => { SubCategory(item._id) }}>
                    <div>{item.name}</div>
                    {
                        currentLanguage.code === 'en' ? <i className="fas fa-chevron-right mt-2"></i> :
                            < i className="fas fa-chevron-left mt-2"></i>
                    }
                </div >
            </>
        )
    })
    const CategoryDataPart2 = catdata.slice(5, 16).map((item) => {
        return (
            <div className="sidenavRow" onClick={() => { SubCategory(item._id) }}>
                <div>{item.name}</div>
                {
                    currentLanguage.code === 'en' ? <i className="fas fa-chevron-right mt-2"></i> :
                        < i className="fas fa-chevron-left mt-2"></i>
                }
            </div>
        )
    })
    return (
        <div className='sidenav' style={props.state === "entering" ? { animation: "moveSideBar .3s forwards" } : props.state === "entered" ?
            { transform: "translateX(-0px)" } : { animation: "moveSideBar .3s reverse backwards" }}>
            <div className="sidenavHeader">
                <NavLink to='/SignIn' className='text-decoration-none text-white'>
                    <i className="fas fa-user-circle"></i> {t('Hello,Sign In')}
                </NavLink>
            </div>
            {
                flag ? <div className='sideNavContainer'>
                    <div id="mainMenu">
                        <div onClick={() => setFalg(false)}>
                            {
                                currentLanguage.code === 'en' ? <div>
                                    <span style={{ marginLeft: '12px' }} className='titlesidecontentHeader'>{t('MAINMENU')}</span>
                                    < i className="fas fa-chevron-right mt-2" style={{ color: "#8e9090" }}></i>
                                </div> : <div>
                                    <span style={{ marginLeft: '12px' }} className='titlesidecontentHeader'>{t('MAINMENU')}</span>
                                    < i className="fas fa-chevron-left mt-2" style={{ color: "#8e9090" }}></i>
                                </div>
                            }
                            {/* <i class="fas fa-chevron-left" style={{ color: "#8e9090" }}></i> */}

                            <hr />
                        </div>
                    </div>
                    <div className='sidenavContentHeader'>
                        {subcategory.map((item) =>
                            <div className='sidenavRow'>
                                <NavLink to='/' className='text-decoration-none text-black'>
                                    <div>{item.name}</div>
                                </NavLink>
                            </div>
                        )}
                    </div>
                </div> : <div className="sideNavContainer">
                    <div className='sidenavContentHeader'>
                        {/* Part 1 */}
                        <span className='titlesidecontentHeader'> {t('Trending')}</span>
                        <div className="sidenavRow ">
                            <div>{t('BestSeller')}</div>
                        </div>
                        <div className="sidenavRow">
                            <div>{t('Release')}</div>
                        </div>
                        <hr />
                    </div>
                    <div className='sidenavContentHeader'>
                        <span className='titlesidecontentHeader'>{t('ShopByCategory')}</span>
                        <div>
                            {categoryDataPart1}
                            <div>
                                <Transition
                                    mountOnEnter
                                    unmountOnExit
                                    in={openDropDown}
                                    timeout={{ enter: 300, exit: 200 }}>
                                    {state => (
                                        <div className="sidenavContainer" style={state === "entering" ? { animation: "dropDown .3s forwards", height: `${27 * catdata.length}px` }
                                            : state === "entered" ? { transform: "scaleY(1)", opacity: "1", height: `${27 * catdata.length}px` }
                                                : { animation: "dropDown .2s reverse backwards", transition: "height 0.2s" }} >
                                            <hr />
                                            {CategoryDataPart2}
                                        </div>
                                    )}
                                </Transition>
                                <div className="sidenavRowDropdown" onClick={() => setOpenDropDown(prevState => !prevState)}>
                                    {(() => {
                                        if (openDropDown) {
                                            return (
                                                <div>{t('Seeless')}</div>
                                            )
                                        } else {
                                            return (
                                                <div>{t('SeeAll')}</div>
                                            )
                                        }
                                    })()}
                                    <i className={arrowDirection}></i>
                                </div>
                            </div>
                        </div>
                        <hr />
                    </div>
                    <div className='sidenavContentHeader'>
                        <span className='titlesidecontentHeader'> {t('Programs&Features')}</span>
                        <div className="sidenavRow ">
                            <NavLink to='/' className='text-decoration-none text-black'>
                                <div>{t('TodaysDeal')}</div>
                            </NavLink>
                        </div>
                        <hr />
                    </div>
                    <div className='sidenavContentHeader'>
                        <span className='titlesidecontentHeader'> {t('Help&Settings')}</span>

                        <div className="sidenavRow ">
                            <NavLink to='/Account' className='text-decoration-none text-black'>
                                <div>{t('YourAccount')}</div>
                            </NavLink>
                        </div>

                        <div className="sidenavRow ">
                            <NavLink to='/Account' className='text-decoration-none text-black d-flex '>
                                <i className="fas fa-globe fa-lg" style={{ color: '#aab0bb' }}></i>
                                <div style={{ marginLeft: '12px', marginTop: '-1px', marginRight: "6px" }}>
                                    {
                                        languages.filter(i => i.code === currentLanguage.code)
                                            .map(i =>
                                                <li className="dropdown-item" onClick={() => { i18n.changeLanguage(i.code) }} >
                                                    {i.name}
                                                </li>
                                            )
                                    }
                                </div>
                            </NavLink>
                        </div>
                        <div className="sidenavRow ">
                            <NavLink to='/Account' className='text-decoration-none text-black d-flex '>
                                <img src="https://cdn3.iconfinder.com/data/icons/finalflags/256/Egypt-Flag.png" style={{ width: '20px' }} />
                                <div style={{ marginLeft: '12px', marginTop: '-1px', marginRight: "6px" }}>{t('Egypt')}</div>
                            </NavLink>
                        </div>
                        <div className="sidenavRow ">
                            <NavLink to='/SignIn' className='text-decoration-none text-black'>
                                <div>{t('Help')}</div>
                            </NavLink>
                        </div>
                        <div className="sidenavRow ">
                            <NavLink to='/SignIn' className='text-decoration-none text-black'>
                                <div>{t('Signin')}</div>
                            </NavLink>
                        </div>
                        <hr />
                    </div>
                    <div style={{ marginBottom: ' 50px' }}></div>
                </div>
            }
        </div>
    )
}



export default Sidenavbar