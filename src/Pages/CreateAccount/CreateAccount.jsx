import React, { useState } from "react";
import { Accordion, Alert, Button, Card, Col, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../Components/Input/Input";
import "./CreateAccount.css";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useRef } from "react";
const CreateAccount = () => {
  const [currentDiv, setCurrentDiv] = useState(1);

  const showDiv1 = () => setCurrentDiv(1);
  const showDiv2 = () => setCurrentDiv(2);
  const showDiv3 = () => setCurrentDiv(3);
  const [emailVal, setEmailVal] = useState("");
  const { t, i18n } = useTranslation();
  const name = useRef();
  const email = useRef();
  const phone = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const verifyEmailCode = useRef();
  const [errMessage, setErrMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const navigate = useNavigate();
  const createAccount2 = () => {
    setIsButtonDisabled(true);
    // make the API call here
    axios
      .post(
        `http://localhost:8000/users/register`,
        {
          name: name.current.value,
          email: email.current.value,
          phone: phone.current.value,
          password: password.current.value,
          confirmPassword: confirmPassword.current.value,
        },
        {
          headers: {
            "content-type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setSuccessMessage("please check your email to verify your new email");
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);

        setIsButtonDisabled(false);
        showDiv2();
        // navigate("/OTP");
      })
      .catch((err) => {
        console.log(err);
        setIsButtonDisabled(true);
        setErrMessage(err.response.data.errors[0].msg);
        setTimeout(() => {
          setIsButtonDisabled(false);
        }, 3000);
        setTimeout(() => {
          setErrMessage("");
        }, 3000);
      });
  };
  const handleVerifyEmail = () => {
    setIsButtonDisabled(true);
    // make the API call here
    axios
      .post(
        "http://localhost:8000/users/verify_email",
        {
          email: emailVal,
          verifyEmailCode: verifyEmailCode?.current?.value,
        },
        {
          headers: {
            "content-type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setSuccessMessage("Email is verified succefully please signIn again");
        setTimeout(() => {
          setSuccessMessage("");
        }, 7000);

        setIsButtonDisabled(false);
        showDiv3();
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

  return (
    <>
      {currentDiv === 1 && (
        <div>
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
          </div>

          <div className="register text-left">
            <div id="CreateAccount">
              <form>
                <h3 id="CreateAccountContinueTitle">{t("Create account")}</h3>
                <div>
                  <label htmlFor="name" id="lableCreateAcc">
                    {t("Enter your name")}
                  </label>
                  <div>
                    <input
                      type="text"
                      className="form-control"
                      ref={name}
                      id="name"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" id="lableCreateAcc">
                    {t("Enter your email")}
                  </label>
                  <div>
                    <input
                      type="text"
                      className="form-control"
                      ref={email}
                      id="email"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" id="lableCreateAcc">
                    {t("Enter your phone")}
                  </label>
                  <div>
                    <input
                      type="text"
                      className="form-control"
                      ref={phone}
                      id="phone"
                    />
                    <small id="delevery">it may help the delevery guy*</small>
                  </div>
                </div>
                <div>
                  <label htmlFor="password" id="lableCreateAcc">
                    {t("Enter your password")}
                  </label>
                  <div>
                    <input
                      id="password"
                      type="password"
                      className="form-control"
                      ref={password}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="confirmPassword" id="lableCreateAcc">
                    {t("reEnter your password")}
                  </label>
                  <div>
                    <input
                      id="confirmPassword"
                      type="password"
                      className="form-control"
                      ref={confirmPassword}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  class="myButton mb-3"
                  id="CreateAccountContinueButton"
                  variant="warning"
                  disabled={isButtonDisabled}
                  onClick={() => {
                    createAccount2();
                    setEmailVal(email?.current?.value);
                  }}
                >
                  {t("Continue")}
                </Button>
                <small id="smallErr">{errMessage}</small>
                <div className="row" id="CreateAccountContinueTerms">
                  <p>
                    <br />
                    <a href="#" id="CreateAccountContinueA">
                      {t("Amazon's Conditions")}
                    </a>{" "}
                    {t("of Use and")}{" "}
                    <a href="#" id="CreateAccountContinueA">
                      {t("Privacy Notice.")}
                    </a>
                  </p>
                </div>
                <hr id="CreateAccountContinueHr" />
                <div className="row" id="CreateAccountContinueTerms">
                  <p>
                    {t("Already have an account")}{" "}
                    <Link to="/SignIn">{t("SignIn")}</Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {currentDiv === 2 && (
        <div>
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
                    {t("this verification step")} <br />{" "}
                    {t("One Time Password")} <br />
                    {email?.current?.value} {t("Please enter it below")}.
                  </p>

                  <div>
                    <label htmlFor="emailVal">Enter the OTP</label>
                    <div>
                      <input
                        type="text"
                        className="form-control"
                        ref={verifyEmailCode}
                      />
                      <small id="smallErr">{errMessage}</small>
                    </div>
                  </div>
                  <Button
                    class="myButton mb-3"
                    id="CreateAccountContinueButton"
                    variant="warning"
                    disabled={isButtonDisabled}
                    onClick={() => {
                      handleVerifyEmail();
                    }}
                  >
                    {t("Continue")}
                  </Button>
                  <div className="row text-center">
                    <Link>{t("Resend OTP")}</Link>
                  </div>
                  <div className="row">
                    <Accordion>
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>
                          {t("I need more help")}
                        </Accordion.Header>
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
        </div>
      )}
      {currentDiv === 3 && (
        <div>
          <div className="register">
            <img
              id="CreateAccountContinueImg2"
              src="https://thumbs.dreamstime.com/b/simple-vector-filled-flat-amazon-icon-logo-solid-black-pictogram-isolated-white-background-amazon-logo-159029074.jpg"
            ></img>
          </div>{" "}
          <div className="row text-center ">
            <div className="col"></div>
            <div className="col">
              <div className="alert alert-success" role="alert">
                <h4 className="alert-heading">Well done!</h4>
                <p>Your Email is verified succefully</p>
                <hr />
                <p className="mb-0">
                  Now Please sighIn again from
                  <Link to={"/SignIn"}> Here</Link>
                </p>
              </div>
            </div>
            <div className="col"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateAccount;
