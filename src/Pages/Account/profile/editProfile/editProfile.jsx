import React, { useEffect, useRef, useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./editProfile.css";
import { useSelector } from "react-redux";
import axios from "axios";
import { useTranslation } from "react-i18next";
function EditProfile() {
  const { t, i18n } = useTranslation();
  const { userInfo } = useSelector((state) => state.user);
  const [user, setUser] = useState([]);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const newName = useRef();
  const handleSubmit = () => {
    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDNmNGIyMmQ1OTQ5Mzc3MWMzN2UwOWEiLCJ1c2VyUm9sZSI6ImFkbWluIiwiaWF0IjoxNjgxODY5OTcwfQ.s0Xf_mcpUGvfupHL5wFtenDYrdSxg2qWFHsmDYFZR-U
    axios
      .put(
        `http://localhost:8000/users/${userInfo?._id}`,
        {
          name: newName.current.value,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDNmNGIyMmQ1OTQ5Mzc3MWMzN2UwOWEiLCJ1c2VyUm9sZSI6ImFkbWluIiwiaWF0IjoxNjgxODY5OTcwfQ.s0Xf_mcpUGvfupHL5wFtenDYrdSxg2qWFHsmDYFZR-U",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        alert("user name updated succefully");
        window.location.reload();
      })
      .catch((err) => {
        var t = localStorage.getItem("token");
        console.log(t);
        console.log(err);
      });
  };
  const [showPhone, setShowPhone] = useState(false);
  const handleShowPhone = () => setShowPhone(true);
  const handleClosePhone = () => setShowPhone(false);
  const handleSubmitPhone = () => {
    axios
      .put(
        `http://localhost:8000/users/${userInfo?._id}`,
        {
          phone: newPhone.current.value,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDNmNGIyMmQ1OTQ5Mzc3MWMzN2UwOWEiLCJ1c2VyUm9sZSI6ImFkbWluIiwiaWF0IjoxNjgxODY5OTcwfQ.s0Xf_mcpUGvfupHL5wFtenDYrdSxg2qWFHsmDYFZR-U",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        alert("phone updated succefully");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const newPhone = useRef();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/users/${userInfo?._id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setUser(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return (
    <div className="container">
      <Row id="RowTitleEditProfile">
        <div>
          <Link id="LinkitleOrder" to={"/Account"}>
            <b>{t("Your Account")}</b>
          </Link>{" "}
          {">"}{" "}
          <span>
            {" "}
            <b>{t("Manage your Profiles")}</b>
          </span>
        </div>
      </Row>
      <div className="container">
        <div className="manageProfile">
          <div id="manageProfile">
            <div className="row">
              <h3>
                <b>{t("Manage your Profiles")}</b>
              </h3>
            </div>
            <div className="row" id="rowNameManageProfile">
              <h4 className="mt-5">
                <b>{userInfo?.name}</b>{" "}
                <i class="bi bi-pencil-fill" onClick={handleShow}></i>
              </h4>
              <p>{t("Account holder")}</p>
            </div>
            <Modal show={show} onHide={handleClose} className="text-center">
              <Modal.Header closeButton id="modalTitle">
                <Modal.Title>
                  <h5>{t("Edit your name")}</h5>
                </Modal.Title>
              </Modal.Header>
              <ModalBody className="modalBody">
                <div className="row">
                  <p>{t("Changes made")}</p>
                </div>
                <div className="row">
                  <input
                    type="text"
                    ref={newName}
                    className="form-control"
                    placeholder={userInfo?.name}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <div className="row">
                  <div className="col-9"></div>
                  <div className="col">
                    <Button
                      className="btn btn-warning"
                      onClick={() => {
                        handleSubmit();
                      }}
                    >
                      {t("Save Changes")}
                    </Button>
                  </div>
                </div>
              </ModalFooter>
            </Modal>
            <div className="row" id="cardOnManageProfile">
              <div className="row">
                {" "}
                <h5>
                  <b>{t("Contact Details")}</b>
                </h5>
              </div>
              <div className="row">
                <p>{t("Receive important")}</p>
              </div>
              <div className="row">
                <div className="col-10">
                  <b>{t("Mobile number")}</b>
                </div>
                <div className="col">
                  <i class="bi bi-pencil-fill" onClick={handleShowPhone}></i>
                </div>
              </div>
              <div className="row">
                <p>+2 0-{userInfo?.phone}</p>
              </div>
            </div>
            <Modal
              show={showPhone}
              onHide={handleClosePhone}
              className="text-center"
            >
              <Modal.Header closeButton id="modalTitle">
                <Modal.Title>
                  <h5>{t("Edit your Phone")}</h5>
                </Modal.Title>
              </Modal.Header>
              <ModalBody className="modalBody">
                <div className="row">
                  <p>{t("Changes made")}</p>
                </div>
                <div className="row">
                  <input
                    type="number"
                    ref={newPhone}
                    className="form-control"
                    placeholder={userInfo?.phone}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <div className="row">
                  <div className="col-9"></div>
                  <div className="col">
                    <Button
                      className="btn btn-warning"
                      onClick={() => {
                        handleSubmitPhone();
                      }}
                    >
                      {t("Save Changes")}
                    </Button>
                  </div>
                </div>
              </ModalFooter>
            </Modal>
            <div className="row" id="cardOnManageProfile">
              <div className="row">
                {" "}
                <h5>
                  <b>{t("Settings")}</b>
                </h5>
              </div>
              <div className="row">
                <p>{t("programs require a PIN")}</p>
              </div>
              <div className="row">
                <div className="col-10">
                  <b>PIN</b>
                </div>
                <div className="col">
                  <i class="bi bi-pencil-fill"></i>
                </div>
              </div>
              <div className="row">
                <p>{t("No set")}</p>
              </div>
            </div>
            <div className="row" id="cardOnManageProfile">
              <div className="row">
                {" "}
                <h5>
                  <b>{t("Enrolled Programs")}</b>
                </h5>
              </div>
              <div className="row">
                <p>{t("This profile is enrolled")}</p>
              </div>
              <div className="row">
                <div className="row title">
                  <div className="col-10">{t("Prime Videos")}</div>
                  <div className="col">
                    <b>
                      <i class="bi bi-chevron-right"></i>
                    </b>
                  </div>
                </div>
                <hr />
              </div>
              {/* <hr /> */}
              <div className="row">
                <div className="row title">
                  <div className="col-10">{t("Shopping")}</div>
                  <div className="col">
                    <b>
                      <i class="bi bi-chevron-right"></i>
                    </b>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EditProfile;
