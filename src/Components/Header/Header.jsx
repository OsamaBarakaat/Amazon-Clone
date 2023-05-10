import React, { useEffect, useState } from "react";
import "./Header.css";
import { useSelector } from "react-redux";
// import { ImSearch } from 'react-icons/im'
import { AiOutlineMenu } from "react-icons/ai";
import { NavLink, Link } from "react-router-dom";
import { Button, Col, Dropdown, Row } from "react-bootstrap";
import NavDropdown from "react-bootstrap/NavDropdown";
import axios from "axios";
import Sidenavbar from "../Sidebar/Sidenavbar";
import { Transition } from "react-transition-group";
import OverlayAll from "../overlayAll";
import { useTranslation } from "react-i18next";
import { calcItemsNum } from "../../Utils/utils";

const languages = [
  {
    code: "en",
    name: "English",
    country_code: "us",
  },
  {
    code: "ar",
    name: "العربية",
    dir: "rtl",
    country_code: "eg",
  },
];
const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const [dropCategory, setDropCategory] = useState("All");
  const [category, setCategory] = useState([]);
  const [navOpen, setNavOpen] = useState(false);
  const [inputdata, setInputData] = useState("");
  const [searchDataResult, setSearchDataResult] = useState([]);

  const { userInfo } = useSelector((state) => state.user);
  const currentLanguageCode = localStorage.getItem("i18nextLng") || "en";
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode);
  const { t, i18n } = useTranslation();
  useEffect(() => {
    document.body.dir = currentLanguage.dir || "ltr";
  }, [currentLanguage, t]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/categorys")
      .then((res) => {
        console.log(res.data.data);
        setCategory(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const SelectedCategory = (selectedItem) => {
    console.log(selectedItem);
    setDropCategory(selectedItem);
  };
  // Search Part
  const FetchDataSearch = (value) => {
    axios
      .get("http://localhost:8000/products")
      .then((res) => {
        const ReturnedData = res.data.data.filter((product) => {
          return (
            product &&
            product.name &&
            product.name.toLowerCase().includes(value)
          );
        });
        setSearchDataResult(ReturnedData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleChange = (value) => {
    console.log(value);
    setInputData(value);
    FetchDataSearch(value);
  };
  const overlaySearchBar = () => {
    console.log(navOpen);
    setNavOpen(true);
    console.log(navOpen);
    // document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
  };
  const handleLogOut = () => {
    localStorage.removeItem("token");
  };
  return (
    <div>
      <header className="container-fluid p-0" style={{ background: "#232f3e" }}>
        <div id="nav-bar ">
          <div id="nav-belt">
            <div className="nav-left">
              <div id="nav-logo">
                <Link to="/" id="header__logo">
                  <img
                    id="logo_image"
                    className="header__option"
                    src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
                  />
                </Link>
              </div>
            </div>
            <div className="nav-fill">
              <div id="nav-search">
                <div id="nav-search-bar-form">
                  <div className="nav-fill">
                    <div id="DivHeaderSearchBar">
                      <input
                        id="header__searchInput"
                        type="text"
                        placeholder={t("searchAmazon")}
                        onClick={overlaySearchBar}
                        onChange={(e) => {
                          handleChange(e.target.value);
                        }}
                      />
                    </div>
                    <div id="SearchResultList" style={{ zIndex: "60" }}>
                      {searchDataResult.map((result) => {
                        return (
                          <div
                            className="d-flex"
                            onClick={() => {
                              console.log(result.name);
                            }}
                          >
                            <NavLink
                              to={`/product/${result._id}`}
                              className="text-decoration-none searchListResult"
                            >
                              <div key={result._id} className="">
                                <span>{result.name}</span>
                              </div>
                            </NavLink>
                            {/* <i class="fas fa-times fa-ms searchList_icon" style={{ color: '#b9acac' }}></i> */}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div id="nav-right">
                    <svg
                      className="pe-auto"
                      id="header__searchIcon"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-search"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="nav-right">
              <div>
                <Dropdown>
                  <Dropdown.Toggle
                    variant="rimary"
                    id="dropdown-basic"
                    className="text-white"
                    style={{ margin: "0px", padding: "6px" }}
                  >
                    <span
                      className={`flag-icon flag-icon-${currentLanguage.country_code} mx-2`}
                    ></span>
                    {currentLanguageCode}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {languages
                      .filter((i) => i.code !== currentLanguage.code)
                      .map((i) => (
                        <Dropdown.Item>
                          {/* {window.location.reload()} */}
                          <li
                            className="dropdown-item"
                            onClick={() => {
                              i18n.changeLanguage(i.code);
                              window.location.reload();
                            }}
                          >
                            <span
                              className={`flag-icon flag-icon-${i.country_code} mx-2`}
                            ></span>
                            {i.name}
                          </li>
                        </Dropdown.Item>
                      ))}
                  </Dropdown.Menu>
                </Dropdown>
              </div>

              <NavLink
                className="hideDatainResp text-white mt-1 text-decoration-none"
                to="/Signin"
              >
                <div className="header__option">
                  <span className="header__optionLineOne h5">
                    {userInfo ? userInfo.name : t("HelloGuest")}
                  </span>
                  <NavDropdown title={t("SingIn")} id="navbarScrollingDropdown">
                    <div id="navbarScrollingDropdownHeader">
                      <div className="row">
                        <Row>
                          <Col></Col>
                          <Col>
                            <Link to="/SignIn">
                              <a href="#" class="myButton">
                                {t("SingIn")}
                              </a>
                            </Link>
                          </Col>
                          <Col></Col>
                        </Row>
                        <div className="row" id="headerNewCustomer">
                          <span id="headerNewCustomerSpan">
                            {t("NewCutomer")}{" "}
                            <Link to="/CreateAccount">{t("StartHere")}</Link>
                          </span>
                          <div className="text-center mt-3 text-danger">
                            <span onClick={handleLogOut}>LogOut</span>
                          </div>
                        </div>
                      </div>
                      <hr id="hrSignIn" />
                      <Row>
                        <Col id="ColNav" className="ColNav1">
                          <h4> {t("YourLists")}</h4>
                          <div>
                            <a href="#">{t("CreateList")}</a>
                          </div>
                        </Col>
                        <Col xs={2}>
                          <div class="vl"></div>
                        </Col>
                        <Col id="ColNav">
                          <h4> {t("YourAccount")}</h4>
                          <Link to="/Account">
                            <a href="#">{t("YourAccount")}</a>
                          </Link>
                          <div>
                            <Link to="/Order">{t("Orders")}</Link>
                          </div>
                          <div>
                            <a href="#">{t("Recomindations")}</a>
                          </div>
                          <div>
                            <a href="#">{t("Address")}</a>
                          </div>
                          <div>
                            <a href="#">{t("Watchlist")}</a>
                          </div>
                          <div>
                            <a href="#">{t("Subscribe&saveItems")}</a>
                          </div>
                          <div>
                            <a href="#">{t("PrimeMemberShips")}</a>
                          </div>
                          <div>
                            <a href="#">{t("SellerAccount")}</a>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </NavDropdown>
                </div>
              </NavLink>

              <NavLink
                className="hideRes280data text-white mt-1 text-decoration-none"
                to="/Order"
              >
                <div className="header__option">
                  <span className="header__optionLineOne">{t("Returns")}</span>
                  <span className="header__optionLineTwo">{t("Orders")}</span>
                </div>
              </NavLink>

              <NavLink
                className="text-white mt-1 text-decoration-none nav-a nav-a-2 nav-progressive-attribute"
                aria-label="0 items in cart"
                id="nav-cart"
                to="/Cart"
              >
                <div id="header__optionBasket">
                  <div id="nav-cart-count-container">
                    <span className="nav-cart-icon nav-sprite">
                      <span id="stext-warning">{calcItemsNum(cartItems)}</span>
                    </span>
                  </div>
                  <div
                    id="nav-cart-text-container"
                    className="nav-progressive-attribute"
                    style={{ marginTop: "-2.5rem;" }}
                  >
                    <span aria-hidden="true" className="text-md font-bold">
                      {t("Cart")}
                    </span>
                  </div>
                </div>
              </NavLink>
            </div>
          </div>
          <div className="p-1 nav_bar text-white">
            <div className="left d-flex">
              <div className="p-1 cart-data d-flex justify-content-center">
                <OverlayAll />
              </div>
              {/* <NavLink className='hideDatainResp text-white mt-1 text-decoration-none' to="/">
                                <span className='p-1 px-2 cart-data'>{t('TodaysDeal')}</span>
                            </NavLink> */}
              <NavLink
                className="hideDatainResp text-white mt-1 text-decoration-none"
                to="/"
              >
                <span className="p-1 px-2 cart-data">
                  {t("CustomerService")}
                </span>
              </NavLink>
              <NavLink className="text-white mt-1 text-decoration-none" to="/">
                <span className="p-1 px-2 cart-data">{t("Registery")}</span>
              </NavLink>
              <NavLink className="text-white mt-1 text-decoration-none" to="/">
                <span className="p-1 px-2 cart-data">{t("GiftCards")}</span>
              </NavLink>
              {/* <NavLink className='text-white mt-1 text-decoration-none' to="/">
                                <span className='p-1 px-2 cart-data'>{t('Sell')}</span>
                            </NavLink> */}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
