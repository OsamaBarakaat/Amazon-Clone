import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import AccountCard from "../../Components/AccountCard/AccountCard";
import "./Account.css";
import { useTranslation } from "react-i18next";

const Account = () => {
  const { t, i18n } = useTranslation();
  return (
    <div className="container">
      <Row id="RowTitleAccount">
        <h1>{t("Your Account")}</h1>
      </Row>

      <div className="row row-cols-3 row-cols-md-3 g-12">
        <div className="col">
          <Link to={"/Order"} id="LinkAccount">
            <AccountCard
              imageSrc="https://m.media-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/order._CB660668735_.png"
              title={t("your Orders")}
              description={t(
                "track, return, cancle anr order,download or buy again"
              )}
            />
          </Link>
        </div>
        <div className="col">
          <Link to={"/CreateAccount"} id="LinkAccount">
            <AccountCard
              imageSrc="https://m.media-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/security._CB659600413_.png"
              title={t("Login & Sequrity")}
              description={t(
                "Manage password, email, mobile number, and security settings"
              )}
            />
          </Link>
        </div>
        <div className="col">
          <AccountCard
            imageSrc="https://m.media-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/fshub/fshub_prime._CB433666831_.png"
            title={t("Prime")}
            description={t(
              "Manage your membership, view benefits, and payment settings"
            )}
          />
        </div>
        <div className="col">
          <Link to={"/Address"} id="LinkAccount">
            <AccountCard
              imageSrc="https://m.media-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/fshub/fshub_address_book._CB613924977_.png"
              title={t("your Address")}
              description={t("Edit, remove or set default address")}
            />
          </Link>
        </div>
        <div className="col">
          <AccountCard
            imageSrc="https://m.media-amazon.com/images/G/01/x-locale/cs/contact-us/GiftCard_icon_01._CB660349069_.png"
            title={t("Gift Cards")}
            description={t(
              "View balance or redeem a card, and purchase a new Gift Card"
            )}
          />
        </div>
        <div className="col">
          <AccountCard
            imageSrc="https://m.media-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/fshub/10_archived_orders._CB654640573_.png"
            title={t("Archived Orders")}
            description={t(
              "track, return, cancle anr order,download or buy again"
            )}
          />
        </div>
        <div className="col">
          <AccountCard
            imageSrc="https://m.media-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/payment._CB660668735_.png"
            title={t("your Payment")}
            description={t(
              "View all transactions, manage payment methods and settings"
            )}
          />
        </div>
        <div className="col">
          <Link to={"/profile"} id="LinkAccount">
            <AccountCard
              imageSrc="https://m.media-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/account._CB660668669_.png"
              title={t("your Profile")}
              description={t(
                "Manage, add, or remove user profiles for personalized experiences"
              )}
            />
          </Link>
        </div>
        <div className="col">
          <Link to={"/updatePassword"} id="LinkAccount">
            <AccountCard
              imageSrc="https://m.media-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/digital_devices._CB660668735_.png"
              title={t("Update Password")}
              description={t("update your profile password")}
            />
          </Link>
        </div>
        <div className="col">
          <AccountCard
            imageSrc="https://m.media-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/fshub/9_messages._CB654640573_.jpg"
            title={t("your Messages")}
            description={t(
              "View or respond to messages from Amazon, Sellers and Buyers"
            )}
          />
        </div>
        <div className="col">
          <AccountCard
            imageSrc="https://m.media-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/fshub/11_lists._CB654640573_.png"
            title={t("your Lists")}
            description={t(
              "View, modify, and share your lists, or create new ones"
            )}
          />
        </div>
        <div className="col">
          <AccountCard
            imageSrc="https://m.media-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/contact_us._CB659962323_.png"
            title={t("Customer Service")}
            description={t(
              "Browse self service options, help articles or contact us"
            )}
          />
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Account;
