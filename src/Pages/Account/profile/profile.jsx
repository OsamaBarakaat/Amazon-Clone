import React, { useEffect, useState } from "react";
import "./profile.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
function Profile() {
  const { userInfo } = useSelector((state) => state.user);
  const [user, setUser] = useState([]);
  // const routToEditProfile
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const handleNavigationToEditProfile = () => {
    navigate("/editProfile");
    // navigate(-1) // will backword one page
  };
  useEffect(() => {
    axios
      .get(`http://localhost:8000/users/${userInfo?._id}`, {
        headers: {
          "content-type": "application/json",
          Authorization: localStorage.getItem("token"),
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
      <div className="container">
        <div className="profile">
          <div id="profile">
            <div className="row">
              <div className="row">
                <h2>
                  <b>{t("manage")}</b>
                </h2>
              </div>
              <div className="row">
                <p>{t("Amazon Programs")}</p>
              </div>
              <hr />
            </div>
            <div className="row">
              {/* onClick={routToEditProfile} */}
              <div
                className="row title"
                onClick={handleNavigationToEditProfile}
              >
                <div className="col-10">{userInfo?.name}</div>
                <div className="col">
                  <b>
                    <i class="bi bi-chevron-right"></i>
                  </b>
                </div>
              </div>
              <div className="row">
                <div id="smallActive">{t("Active Profile")}</div>
              </div>
              <hr className="mt-3" />
            </div>
            <div className="row">
              <p>{t("adult profile")}</p>
              <hr />
            </div>
            <div className="row">
              <div className="row title">
                <div className="col-10">{t("kids")}</div>
                <div className="col">
                  <b>
                    <i class="bi bi-chevron-right"></i>
                  </b>
                </div>
              </div>
              <hr className="mt-3" />
            </div>
            <div className="row" id="marginRowProfile">
              <p>
                {t("Looking for")}{" "}
                <Link id="profileLink">{t("Amazon Public Profile")}</Link>?
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
