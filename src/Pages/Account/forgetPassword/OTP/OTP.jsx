import React from "react";
import { Button, Card } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import Input from "../../../../Components/Input/Input";
import Accordion from "react-bootstrap/Accordion";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const OTP = () => {
  const { t, i18n } = useTranslation();
  const { userInfo } = useSelector((state) => state.user);
  const handleSignIn = () => {
    axios
      .put(
        "http://localhost:8000/users/6437dd1c4891d1237c3ad071",
        {
          OTP: values.OTP,
        },
        {
          headers: {
            "content-type": "application/json",
            Authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDM2MmJlNDYzZjA3ZjE3OTYzNmJmZTYiLCJ1c2VyUm9sZSI6ImFkbWluIiwiaWF0IjoxNjgxMzgyMDcyfQ.VRR-r6WGrCS_wTRgN4hmbhw7jYvxGCApDLFrW3GnU0c",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        alert("update Password");
        Navigate("/OTP");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [values, setValues] = useState({
    OTP: "",
  });
  const inputs = [
    {
      id: 1,
      name: "OTP",
      type: "text",
      placeholder: "",
      errorMessage: "It should be a valid OTP!",
      label: "Enter OTP",
      //   patter: `/^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/`,
      required: true,
    },
  ];
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="register">
        <img
          id="CreateAccountContinueImg2"
          src="https://thumbs.dreamstime.com/b/simple-vector-filled-flat-amazon-icon-logo-solid-black-pictogram-isolated-white-background-amazon-logo-159029074.jpg"
        ></img>
      </div>{" "}
      <div className="forgetPassword">
        <div id="forgetPassword">
          <Card className="p-3">
            <Card.Title className="text-center mt-4">
              <h3>
                <b>{t("Verification required")}</b>
              </h3>
            </Card.Title>

            <Card.Body>
              <p id="CreateAccountSignInTitle">
                {t("this verification step")} <br /> {t("One Time Password")}{" "}
                <br />
                {userInfo?.phone} {t("Please enter it below")}.
              </p>
              {inputs.map((input) => (
                <Input
                  key={input.id}
                  {...input}
                  value={values[input.name]}
                  onChange={(e) => onChange(e)}
                />
              ))}
              <a
                href="#"
                class="myButton mb-3"
                id="CreateAccountContinueButton"
                onClick={handleSignIn}
              >
                {t("Continue")}
              </a>
              <div className="row text-center">
                <Link>{t("Resend OTP")}</Link>
              </div>
              <div className="row">
                <Accordion>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>{t("I need more help")}</Accordion.Header>
                    <Accordion.Body>
                      {t("If you've already")}
                      <br /> {t("but haven't received")}
                      <br /> {t("check your Junk")} <br />{" "}
                      {t("If you can't access")}
                      <br /> {t("try resetting that first")} <br />{" "}
                      {t("through your email provider.")}
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
};
export default OTP;
