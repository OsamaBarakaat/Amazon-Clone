import React, { useEffect, useRef } from "react";
import { Accordion, Alert, Button, Card, Col, Row } from "react-bootstrap";
import "./forgetPassword.css";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ForgetPassword = () => {
  const [currentDiv, setCurrentDiv] = useState(1);

  const showDiv1 = () => setCurrentDiv(1);
  const showDiv2 = () => setCurrentDiv(2);
  const showDiv3 = () => setCurrentDiv(3);
  const [emailVal, setEmailVal] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const handleButtonClick1 = () => {
    setIsButtonDisabled(true);
    // make the API call here
    axios
      .post(
        "http://localhost:8000/users/forgot_password",
        {
          email: email.current.value,
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
        setSuccessMessage("chechk the OTP on your email");
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
        setErrMessage(err.response.data.message);
        setTimeout(() => {
          setIsButtonDisabled(false);
        }, 3000);
        setTimeout(() => {
          setErrMessage("");
        }, 3000);
      });
  };
  const handleButtonClick2 = () => {
    setIsButtonDisabled(true);
    // make the API call here
    axios
      .post(
        "http://localhost:8000/users/verify_reset_code",
        {
          email: emailVal,
          restCode: restCode.current.value,
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
        setSuccessMessage("valid OTP next Enter the new Password");
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);

        setIsButtonDisabled(false);
        showDiv3();
        // navigate("/OTP");
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

  const handleButtonClick3 = () => {
    setIsButtonDisabled(true);
    // make the API call here
    axios
      .put(
        "http://localhost:8000/users/reset_password",
        {
          email: emailVal,
          newPassword: newPassword.current.value,
          confirmNewPassword: confirmNewPassword.current.value,
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
        setSuccessMessage("Password updated Succefully");
        setTimeout(() => {
          setSuccessMessage("");
          navigate("/SignIn");
        }, 3000);
        setIsButtonDisabled(false);
      })
      .catch((err) => {
        console.log(err);
        setIsButtonDisabled(true);
        setErrMessage(err.response.data.errors[0].msg);
        // setErrMessage(err.response.data.msg);
        setTimeout(() => {
          setIsButtonDisabled(false);
        }, 3000);
        setTimeout(() => {
          setErrMessage("");
        }, 3000);
      });
  };
  // const handleEnterTheNewPassword = () => {
  //   axios
  //     .put(
  //       "http://localhost:8000/users/reset_password",
  //       {
  //         email: emailVal,
  //         newPassword: newPassword.current.value,
  //         confirmNewPassword: confirmNewPassword.current.value,
  //       },
  //       {
  //         headers: {
  //           "content-type": "application/json",
  //           Authorization: localStorage.getItem("token"),
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       console.log(res.data);
  //       alert("Password updated");

  //       // navigate("/OTP");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  const email = useRef();
  const restCode = useRef();
  const newPassword = useRef();
  const confirmNewPassword = useRef();
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
          </div>{" "}
          <div className="forgetPassword">
            <div id="forgetPassword">
              <Card className="p-3">
                <Card.Title className="text-center mt-4">
                  <h3>
                    <b>{t("Password assistance")}</b>
                  </h3>
                </Card.Title>

                <Card.Body>
                  <p id="CreateAccountSignInTitle text-center">
                    {t("Enter the")} <br /> {t("associated")}
                  </p>
                  {/* {inputs.map((input) => (
                <Input
                  key={input.id}
                  {...input}
                  value={values[input.name]}
                  onChange={(e) => onChange(e)}
                />
              ))} */}
                  <div>
                    <label htmlFor="emailVal">Enter your email</label>
                    <div>
                      <input type="text" className="form-control" ref={email} />
                    </div>
                    <small id="smallErr">{errMessage}</small>
                  </div>
                  <Button
                    class="myButton mb-3"
                    id="CreateAccountContinueButton"
                    variant="warning"
                    disabled={isButtonDisabled}
                    onClick={() => {
                      setEmailVal(email.current.value);
                      handleButtonClick1();
                    }}
                  >
                    {t("Continue")}
                  </Button>
                </Card.Body>
              </Card>
              <h5 className="mt-3">{t("Has your email")}</h5>
              <div className="row">
                <p>
                  {t("If you no longer")} <br />{" "}
                  <a href="">{t("Customer Service")}</a>
                  <br /> {t("help restoring")}
                </p>
              </div>
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
                  {/* {inputs.map((input) => (
                <Input
                  key={input.id}
                  {...input}
                  value={values[input.name]}
                  onChange={(e) => onChange(e)}
                />
              ))} */}
                  <div>
                    <label htmlFor="emailVal">Enter the OTP</label>
                    <div>
                      <input
                        type="text"
                        className="form-control"
                        ref={restCode}
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
                      handleButtonClick2();
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
                    <b>{t("Enter the new password")}</b>
                  </h3>
                </Card.Title>

                <Card.Body>
                  <p id="to reset ur password">
                    {" "}
                    {t("to reset ur password")} <br />
                    {t("enter pas and confPas")} <br />
                    <br />
                    {email?.current?.value} {t("Please enter it below")}.
                  </p>
                  <div>
                    <label htmlFor="emailVal">Enter the new Password</label>
                    <div>
                      <input
                        type="password"
                        className="form-control"
                        ref={newPassword}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="emailVal">confirme your new password</label>
                    <div>
                      <input
                        type="password"
                        className="form-control"
                        ref={confirmNewPassword}
                      />
                    </div>
                  </div>
                  <Button
                    class="myButton mb-3"
                    id="CreateAccountContinueButton"
                    variant="warning"
                    disabled={isButtonDisabled}
                    onClick={handleButtonClick3}
                  >
                    {t("Continue")}
                  </Button>
                  <small id="smallErr">{errMessage}</small>
                  <div className="row text-center">
                    <Link>{t("Remember ur pasword")}</Link>
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
    </>
  );
};
export default ForgetPassword;
