import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Transition } from 'react-transition-group';
import Sidenavbar from './Sidebar/Sidenavbar';
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
const OverlayAll = () => {
    const [navOpen, setNavOpen] = useState(false)

    const currentLanguageCode = localStorage.getItem('i18nextLng') || 'en'
    const currentLanguage = languages.find((l) => l.code === currentLanguageCode)
    const { t } = useTranslation();
    useEffect(() => {
        document.body.dir = currentLanguage.dir || 'ltr'
    }, [currentLanguage, t])


    const openNav = () => { setNavOpen(true); }

    const closeNav = () => { setNavOpen(false); }
    useLayoutEffect(() => {
        if (navOpen) {
            document.body.style.overflow = "hidden";
            document.body.style.height = "100%";
        }
        else {
            document.body.style.overflow = "auto";
            document.body.style.height = "auto";
        }
    }, [navOpen]);
    return (
        <div>
            <div className="hamburger-btn" onClick={openNav} style={{ cursor: 'pointer' }}>
                &#9776; {t('All')}
            </div >
            <Transition
                in={navOpen}
                timeout={300}
                mountOnEnter
                unmountOnExit>
                {state => {
                    console.log("state:", state);
                    return (
                        <>
                            <Sidenavbar state={state} />
                            <div className="All_overlay" style={state === "entering" ? { animation: "show .7s forwards" }
                                : state === "entered" ? { opacity: "1" } : { animation: "show .7s backwards reverse" }}
                                onClick={closeNav}>
                            </div>
                            <div className="All_closeBtn" style={state === "entering" ? { animation: "show .8s forwards" }
                                : state === "entered" ? { opacity: "1" } : { animation: "show .8s backwards reverse" }}
                                onClick={closeNav}>&times;</div>
                        </>
                    )
                }}
            </Transition>
        </div>
    )

}
export default OverlayAll