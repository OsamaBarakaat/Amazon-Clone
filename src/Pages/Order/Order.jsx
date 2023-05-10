import React, { useEffect, useRef, useState } from "react";
import { Col, Form, Nav, Row, Tab, Tabs } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Order.css";
import ReactSearchBox from "react-search-box";
import OrderCard from "../../Components/OrderCard copy/OrderCard";
import axios from "axios";
import { useSelector } from "react-redux";
import { t } from "i18next";
import Pagination from "react-bootstrap/Pagination";
import { useTranslation } from "react-i18next";
const Order = () => {
  const { userInfo } = useSelector((state) => state.user);
  const { t, i18n } = useTranslation();
  const [numOfPage, setNumOfPage] = useState(0);
  const limit = 4;
  const searchVal = useRef();
  var data = [
    {
      key: "toys",
      value: "toys and dolls",
    },
    {
      key: "makup",
      value: "makeup",
    },
    {
      key: "toys",
      value: "toys and dolls",
    },
    {
      key: "toys",
      value: "toys and dolls",
    },
    {
      key: "Clothes",
      value: "men clothes",
    },
    {
      key: "Clothes",
      value: "women clothes",
    },
    {
      key: "baby",
      value: "baby clothes",
    },
    {
      key: "Clothes",
      value: "all clothes",
    },
  ];
  const [order, setOrder] = useState([]);

  var [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  useEffect(() => {
    axios
      .get(
        `http://localhost:8000/orders?user=6416d0c1792b554cdcf54953&page=${page}&limit=${limit}`,
        {
          headers: {
            "content-type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setOrder(res.data.data);
        setNumOfPage(res.data.paginationResult.numberOfPages);
        console.log(numOfPage);
        setCount(res.data.documentsCounts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [page]);
  const handleSearch = () => {
    axios
      .get(
        `http://localhost:8000/orders?user=6416d0c1792b554cdcf54953&[keyword]=${searchVal?.current?.value}`,
        {
          headers: {
            "content-type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setOrder(res.data.data);
        setNumOfPage(res.data.paginationResult.numberOfPages);
        console.log(numOfPage);
        setCount(res.data.documentsCounts);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleNext = () => {
    setPage(page + 1);
  };
  const handlePrev = () => {
    setPage(page - 1);
  };
  return (
    <>
      <div className="container">
        <Row id="RowTitleOrder">
          <div>
            <Link id="LinkitleOrder" to={"/Account"}>
              {t("Your Account")}
            </Link>
            {"  >  "}
            <span id="spanTitleOrder"> {t("Orders")}</span>
          </div>
        </Row>
        <Row className="mt-4">
          <Col>
            <h3>{t("Your Orders")}</h3>
          </Col>
          <Col xs={5}></Col>
          <Col>
            <div id="searchAndButton">
              <div id="searchTest">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search All Orders"
                  ref={searchVal}
                />
              </div>
              <div>
                <a
                  class="myButton3 buttonserachOrder"
                  onClick={() => handleSearch()}
                >
                  {t("Search Orders")}
                </a>
              </div>
            </div>
          </Col>
        </Row>

        <Row>
          <Row>
            <Tabs
              defaultActiveKey="Orders"
              id="fill-tab-example"
              className="mb-3"
              fill
            >
              <Tab eventKey="Orders" title={t("Your Orders")}>
                <Row>
                  <Col xs={2}>
                    <p>
                      <h6>
                        <b>
                          {count} {t("orders")}{" "}
                        </b>
                        {t("placed in")}
                      </h6>{" "}
                    </p>
                  </Col>
                  <Col xs={2}>
                    <Form.Select size="sm" className="FormSelectOrder">
                      <option>{t("Past")}</option>
                      <option>2023</option>
                      <option>2022</option>
                      <option>2021</option>
                      <option>2020</option>
                      <option>2019</option>
                      <option>{t("Archived Orders")}</option>
                    </Form.Select>
                  </Col>
                  <Col xs={6}></Col>
                </Row>
                <Row>
                  <div>
                    <Row xs={1} md={1} sm={1}>
                      {order.slice(0, 8).map((item) => (
                        <OrderCard item={item} />
                      ))}
                    </Row>
                  </div>
                  <div className="pag">
                    <div>
                      <Pagination>
                        <Pagination.First />
                        <Pagination.Prev
                          onClick={handlePrev}
                          disabled={page <= 1}
                        />
                        <Pagination.Item>{page}</Pagination.Item>
                        <Pagination.Next
                          onClick={handleNext}
                          disabled={page >= numOfPage}
                        />

                        <Pagination.Last />
                      </Pagination>
                    </div>
                  </div>
                </Row>
              </Tab>
            </Tabs>
          </Row>
        </Row>
      </div>
    </>
  );
};
export default Order;
