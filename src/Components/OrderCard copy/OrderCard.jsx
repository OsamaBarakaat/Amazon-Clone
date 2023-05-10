import React from "react";
import "./OrderCard.css";
import axios from "axios";
import Table from "react-bootstrap/Table";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Col, Row } from "react-bootstrap";
function OrderCard({ item }) {
  const { userInfo } = useSelector((state) => state.user);
  const { t, i18n } = useTranslation();
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8000/orders/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        alert("order deleted succefully");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr className="text-center">
            {/* <th>#</th> */}
            <th>{t("Ship to")}</th>
            <th>{t("Order status")}</th>
            <th>{t("Shipping Info")}</th>
            <th>{t("Total Price")}</th>
            <th>{t("payment status")}</th>
            <th>{t("Action")}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {/* <td>1</td> */}
            <td>{item.name}</td>
            <td>{item.orderStatus}</td>
            <td>
              {t("address")}:{item.shippingInfo.address} <br />
              {t("city")}:{item.shippingInfo.city} <br />
              {t("phone")}:{item.shippingInfo.phoneNo} <br />
            </td>
            <td>{item.totalPrice}</td>
            <td>{item.isPaid ? "paid" : "not paid"}</td>
            <td>
              <Row>
                <Col>
                  <button
                    className="btn btn-outline-danger"
                    disabled={
                      item.orderStatus === "shipped" ||
                      item.orderStatus === "delivered" ||
                      item.isPaid == true
                    }
                    onClick={() => handleDelete(item._id)}
                  >
                    {" "}
                    {t("cancel")}
                  </button>
                </Col>
              </Row>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

export default OrderCard;
