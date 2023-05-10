import { render } from "@testing-library/react";
import React, { useState, useEffect, useRef } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";
import "./AddAddress.css";
import "react-phone-number-input/style.css";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

function AddAddress() {
  const { t, i18n } = useTranslation();
  const { userInfo } = useSelector((state) => state.user);
  const FocusInput = () => {
    // useEffect(() => {
    axios
      .put(
        `http://localhost:8000/users/${userInfo?._id}`,
        {
          name: name?.current.value,
          phone: phone?.current.value,
          address: {
            city: city?.current.value,
            street: street?.current.value,
            buliding: postalCode?.current.value,
            postalCode: postalCode?.current.value,
          },
        },
        {
          headers: {
            "content-type": "application/json",
            Authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDNmNGIyMmQ1OTQ5Mzc3MWMzN2UwOWEiLCJ1c2VyUm9sZSI6ImFkbWluIiwiaWF0IjoxNjgxODY5OTcwfQ.s0Xf_mcpUGvfupHL5wFtenDYrdSxg2qWFHsmDYFZR-U",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    // }, []);
  };
  const name = useRef();
  const phone = useRef();
  const city = useRef();
  const street = useRef();
  const postalCode = useRef();
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [radioValue, setRadioValue] = useState("");
  let outputValue = null;
  if (radioValue === "option1") {
    outputValue = <div></div>;
  } else if (radioValue === "option2") {
    outputValue = (
      <div>
        <p>{t("Is your office open on weekends?")}</p>
        <Row>
          <Col>
            {" "}
            <input
              type="checkbox"
              name="checkBox1"
              id=""
              className="form-check-input"
            />
            <label className="form-check-label" for="checkBox1">
              {t("Friday")}
            </label>
          </Col>
          <Col>
            {" "}
            <input
              type="checkbox"
              name="checkBox2"
              id=""
              className="form-check-input"
            />
            <label className="form-check-label" for="checkBox2">
              {t("Saturday")}
            </label>
          </Col>
        </Row>
      </div>
    );
  } else {
    outputValue = <p></p>;
  }

  return (
    <>
      <div className="container">
        <div className="AddAddress">
          <div id="AddAddressInternal">
            <Row>
              <div>
                <Link id="LinkitleOrder" to={"/Account"}>
                  {t("Your Account")}
                </Link>{" "}
                {">"}
                <Link id="LinkitleOrder" to={"/Address"}>
                  {t("Your Adresses")}
                </Link>{" "}
                {">"}
                <span id="spanTitleOrder"> {t("Edit Address")}</span>
              </div>
            </Row>
            <Row id="AddnewAddressTitle">
              <h3>
                <b>{t("Edit a new address")}</b>
              </h3>
            </Row>
            <Row>
              <Link id="findAmazonPickup">
                <i id="geoAlt" class="bi bi-geo-alt-fill"></i>
                <span>{t("Or find an Amazon pickup")}</span>
              </Link>
            </Row>
            <Row className="mt-3">
              <h6>
                <b>{t("Country/Region")}</b>
              </h6>
            </Row>
            <Row>
              <div>
                <CountryDropdown
                  className="form-select"
                  value={country}
                  onChange={(val) => setCountry(val)}
                />
              </div>
            </Row>
            <Row className="mt-3">
              <h6>
                <b>{t("Full name")}</b>
              </h6>
            </Row>
            <Row>
              <input
                type="text"
                className="form-control"
                ref={name}
                value={userInfo.name}
              />
            </Row>
            <Row className="mt-3">
              <h6>
                <b>{t("phone")}</b>
              </h6>
            </Row>
            <Row>
              {/* <PhoneInput
                className="form-control"
                placeholder="e.g. 1XXXXXXXXX"
                // value={phoneValue}
                ref={phone}
                onChange={setPhoneValue}
              /> */}
              <input
                type="number"
                className="form-control"
                placeholder="e.g. 1XXXXXXXXX"
                ref={phone}
                value={userInfo.phone}
              />
              <small>
                <b>{t("May be used to assist delivery")}</b>
              </small>
            </Row>
            <Row className="mt-3">
              <h6>
                <b>{t("street")}</b>
              </h6>
            </Row>
            <Row>
              <input
                type="text"
                ref={street}
                className="form-control"
                placeholder="e.g. Talaat Harb street"
              />
            </Row>
            <Row className="mt-3">
              <h6>
                <b>{t("postalCode")}</b>
              </h6>
            </Row>
            <Row>
              <input
                type="text"
                ref={postalCode}
                className="form-control"
                placeholder="postalCode number"
              />
            </Row>
            <Row className="mt-3">
              <h6>
                <b>{t("City/Area")}</b>
              </h6>
            </Row>
            <Row>
              <input
                className="form-select mt-2"
                // country={country}
                // value={region}
                ref={city}
                onChange={(val) => setRegion(val)}
              />
              <small>{t("Can't find you city/area")}</small>
            </Row>
            <Row className="mt-3">
              <h6>
                <b>{t("Nearest Landmark")}</b>
              </h6>
            </Row>
            <Row>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Cairo festival city"
              />
            </Row>
            <Row className="mt-3">
              <h4>{t("Add delivery instructions")}</h4>
            </Row>
            <Row className="mt-3">
              <h6>
                <b>{t("Address Type")}</b>
              </h6>
            </Row>
            <Row className="mt-3">
              <Col>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault"
                    value="option1"
                    checked={radioValue === "option1"}
                    onChange={(e) => setRadioValue(e.target.value)}
                  />
                  <label className="form-check-label" for="flexRadioDefault">
                    {t("Home (7am-9pm, all days)")}
                  </label>
                </div>
              </Col>
              <Col>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault2"
                    id="flexRadioDefault2"
                    value="option2"
                    checked={radioValue === "option2"}
                    onChange={(e) => setRadioValue(e.target.value)}
                  />
                  <label className="form-check-label" for="flexRadioDefault2">
                    {t("Office (delivery from Sun-Thu)")}
                  </label>
                </div>
                <div>
                  <div>{outputValue}</div>
                </div>
              </Col>
            </Row>
            <Row className="mt-5">
              <a
                href="#"
                class="myButton"
                id="CreateAccountContinueButton"
                onClick={FocusInput}
              >
                {t("EDit Address")}
              </a>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddAddress;
