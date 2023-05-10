import React, { useRef, useState } from "react";
import { Alert, Button, Col, Form, Row, Toast } from "react-bootstrap";
import Input from "../../Components/Input/Input";
import "./SignIn.css";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SignIn = () => {
  const { t, i18n } = useTranslation();
  const emailRef = useRef(null);
  const passRef = useRef(null);
  const [errMessage, setErrMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = () => {
    setIsButtonDisabled(true);
    axios
      .post(
        "http://localhost:8000/users/login",
        {
          email: values.email,
          password: values.password,
        },
        {
          headers: {
            "content-type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
        var token = response.data.token;
        localStorage.setItem("token", token);
        setSuccessMessage("signed in succefully");
        setTimeout(() => {
          setSuccessMessage("");
          navigate("/");
        }, 3000);
        setIsButtonDisabled(false);
      })
      .catch((err) => {
        console.log(err);
        setIsButtonDisabled(true);
        setErrMessage(err.response.data.message);
        setTimeout(() => {
          setIsButtonDisabled(false);
        }, 3000);
        setTimeout(() => {
          setErrMessage("");
        }, 3000);
      });
  };

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const inputs = [
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "",
      errorMessage: "It should be a valid email address!",
      label: "Email or mobile phone number",
      patter: `/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/`,
      required: true,
      ref: { emailRef },
    },
    {
      id: 4,
      name: "password",
      type: "password",
      placeholder: "Enter Password",
      errorMessage: "Password must be 8-20 character!",
      label: `Password `,
      pattern: `{8,}$`,
      // ^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).
      required: true,
      ref: { passRef },
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { values };
    console.log(userData);
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const [show, setShow] = useState(false);
  return (
    <div class="text-center">
      {successMessage && (
        <Row>
          <Col md={{ span: 3, offset: 8 }}>
            <Alert key="success" variant="success">
              {successMessage}
            </Alert>
          </Col>
        </Row>
      )}
      <div className="register">
        <img
          id="CreateAccountContinueImg2"
          src="https://thumbs.dreamstime.com/b/simple-vector-filled-flat-amazon-icon-logo-solid-black-pictogram-isolated-white-background-amazon-logo-159029074.jpg"
        ></img>
      </div>{" "}
      <div className="row ">
        <div className="SignIn">
          <div id="SignIn">
            <form onSubmit={handleSubmit}>
              <h3 id="CreateAccountSignInTitle">{t("SignIn")}</h3>
              {inputs.map((input) => (
                <Input
                  key={input.id}
                  {...input}
                  value={values[input.name]}
                  onChange={(e) => onChange(e)}
                  ref={input.ref}
                />
              ))}
              <small id="smallErr">{errMessage}</small>
              <Button
                class="myButton mb-3"
                id="CreateAccountContinueButton"
                variant="warning"
                onClick={handleSignIn}
                disabled={isButtonDisabled}
              >
                {t("SignIn")}
              </Button>
              <Col xs={6} id="Toast">
                <Toast
                  onClose={() => setShow(false)}
                  show={show}
                  delay={30000}
                  autohide
                >
                  <Toast.Header>
                    <img
                      src="holder.js/20x20?text=%20"
                      className="rounded me-2"
                      alt=""
                    />
                    <strong className="m-auto" id="ToastTitle">
                      {t("Checkbox")}
                    </strong>
                  </Toast.Header>
                  <Toast.Body>
                    {t("Choosing")}
                    <br />
                    {t("To keep your account secure")}
                  </Toast.Body>
                </Toast>
              </Col>
              <div className="row" id="CreateAccountContinueCheeck">
                <p>
                  <Form.Check
                    required
                    label={t("Agree to terms and conditions")}
                    feedback="You must agree before submitting."
                    feedbackType="invalid"
                  />{" "}
                  {t("Keep me Signed in,")}{" "}
                  <a href="#" onClick={() => setShow(true)}>
                    {t("Details")}
                  </a>
                </p>
              </div>
              <div className="row">
                <div class="separator">{t("or")}</div>
              </div>
              <div className="row">
                <Link to={"/forgetPassword"}>{t("Forget Password")}</Link>
              </div>
              <div className="row d-flex justify-content-center">
                <Link to={"/forgetPassword"}>
                  <a href="#" class="myButton2 text-center">
                    {t("get an OTP on your phone")}
                  </a>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
