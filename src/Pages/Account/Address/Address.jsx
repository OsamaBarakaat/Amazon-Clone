import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import "./Address.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { t } from "i18next";

function Address() {
  const [user, setUser] = useState([]);
  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/users/${userInfo?._id}`, {
        headers: {
          "content-type": "application/json",
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDNmNGIyMmQ1OTQ5Mzc3MWMzN2UwOWEiLCJ1c2VyUm9sZSI6ImFkbWluIiwiaWF0IjoxNjgxODY5OTcwfQ.s0Xf_mcpUGvfupHL5wFtenDYrdSxg2qWFHsmDYFZR-U",
        },
      })
      .then((res) => {
        console.log(res.data.data);
        setUser(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <div className="container" id="containerAddressAccount">
        <Row id="RowTitleOrder">
          <div>
            <Link id="LinkitleOrder" to={"/Account"}>
              {t("Your Account")}
            </Link>{" "}
            {">"} <span id="spanTitleOrder"> {t("Your Addresses")}</span>
          </div>
        </Row>

        <Row>
          <h2 id="yourAddressAddressOrder">{t("Your Addresses")}</h2>
        </Row>
        <Row>
          <div className="col-4" style={{ height: "20rem" }}>
            <Link to={"/AddAddress"} id="LinkAccount">
              <div id="addAddressPlusAccount">
                <i class="bi bi-pencil-square" id="addressPlusIcon"></i>
                <h3>
                  <b>{t("Edit Address")}</b>
                </h3>
              </div>
            </Link>
          </div>
          <div className="col-4">
            <Card id="cardOfAddress">
              <Card.Header>
                {t("Default")} :
                <img
                  id="AddressCardImg"
                  src="https://thumbs.dreamstime.com/b/simple-vector-filled-flat-amazon-icon-logo-solid-black-pictogram-isolated-white-background-amazon-logo-159029074.jpg"
                ></img>
              </Card.Header>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <div>
                    <b id="nameOfUserStaticData">{userInfo?.name}</b>
                  </div>
                  <div id="streetOfUserStaticData">
                    {t("street")}:{userInfo?.address?.street}
                  </div>
                  <div id="bulidingOfUserStaticData">
                    {t("city")}:{userInfo?.address?.city}
                  </div>
                  <div id="streetOfUserStaticData">
                    {t("postalCode")}:{userInfo?.address?.postalCode}
                  </div>
                  <div id="PhoneOfUserStaticData">
                    {t("phone")}: {userInfo?.phone}
                  </div>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Link id="EditLinkAccountAddress">{t("Edit")}</Link>
                  <Link id="removeLinkAccountAddress">{t("Remove")}</Link>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </div>
        </Row>
        <Row>
          <h5>
            <b>{t("Related")}</b>
          </h5>
        </Row>
        <Row>
          <Link id="EditLinkAccountAddress" to={"/account"}>
            1-{t("Click Settings")}
          </Link>
          <Link id="EditLinkAccountAddress" to={"/Order"}>
            2-{t("Change address on")}
          </Link>
        </Row>
      </div>
    </>
  );
}

export default Address;
