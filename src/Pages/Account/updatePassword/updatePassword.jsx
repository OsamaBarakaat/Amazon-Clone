import React, { useState } from "react";
import { Alert, Button, Card, Col, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./updatePassword.css";
import Input from "../../../Components/Input/Input";
import axios from "axios";
import { useTranslation } from "react-i18next";
const UpdatePasword = () => {
  const [values, setValues] = useState({
    password: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [err, setErr] = useState(null);
  const { t, i18n } = useTranslation();
  const [errMessage, setErrMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const navigate = useNavigate();
  const handleUpatePassword = () => {
    setIsButtonDisabled(true);
    axios
      .put(
        "http://localhost:8000/users/change_password",
        {
          password: values.password,
          newPassword: values.newPassword,
          confirmNewPassword: values.confirmNewPassword,
        },
        {
          headers: {
            "content-type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setSuccessMessage("Your Password is updated Succefully");
        setTimeout(() => {
          setSuccessMessage("");
          navigate("/");
        }, 3000);

        setIsButtonDisabled(false);
      })
      .catch((err) => {
        console.log(err);
        setIsButtonDisabled(true);
        setErrMessage(err.response.data.error);
        setTimeout(() => {
          setIsButtonDisabled(false);
        }, 3000);
        setTimeout(() => {
          setErrMessage("");
        }, 8000);
      });
  };
  const inputs = [
    {
      id: 1,
      name: "password",
      type: `password`,
      placeholder: "enter current password",
      errorMessage: "password must match your current password",
      label: "Current Password",
      required: true,
    },
    {
      id: 2,
      name: "newPassword",
      type: "password",
      placeholder: "Enter new password",
      label: "New Password",
      errorMessage:
        "Password must be 8-20 characters and include at least 1 UpperCase letter, 1lowerCase letter, 1 number and 1 special character!",
      pattern: `^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$`,
      required: true,
    },
    {
      id: 3,
      name: "confirmNewPassword",
      type: "password",
      label: "Reenter new Password",
      placeholder: "re-enter your new password",
      errorMessage: "Passwords dosen't match!",
      pattern: values.newPassword,
      required: true,
    },
  ];
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <>
      {successMessage && (
        <Row>
          <Col md={{ span: 3, offset: 8 }}>
            <Alert key="success" variant="success">
              {successMessage}
            </Alert>
          </Col>
        </Row>
      )}
      {/* <Alert key="danger" variant="danger">
        {err}
      </Alert> */}
      <div className="container" id="containerAddressAccount">
        <Row id="RowTitleOrder">
          <div>
            <Link id="LinkitleOrder" to={"/Account"}>
              {t("Your Account")}
            </Link>{" "}
            {">"}
            <Link id="LinkitleOrder" to={"/signin"}>
              {t("Login & security")}
            </Link>{" "}
            {">"}
            <span id="spanTitleOrder">{t("Change Password")}</span>
          </div>
        </Row>
        <Row>
          <h2>{t("Change Password")}</h2>
        </Row>
        <Card id="cardUpdatePassword">
          <Card.Title>
            <p>{t("Use the form below")}</p>
          </Card.Title>
          <Card.Body>
            {inputs.map((input) => (
              <Input
                key={input.id}
                {...input}
                value={values[input.name]}
                onChange={(e) => onChange(e)}
              />
            ))}
            <small id="smallErr">{errMessage}</small>
            {/* <button onClick={togglePassword}>Show Password</button> */}
            <div id="opsn">
              <Button
                variant="warning"
                id="buttonUpdatePassword"
                disabled={isButtonDisabled}
                onClick={handleUpatePassword}
              >
                {t("Save changes")}
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};
export default UpdatePasword;
