import { useEffect, useState } from "react";
import { NavLink, useSearchParams } from "react-router-dom";
import { Rate } from "antd";
import Stars from "../../Components/stars";

import "./product.css";

function Product() {

  const [searchParams] = useSearchParams();
  console.log(searchParams.get("catId"));

  let catId = searchParams.get("catId");
  let subCatId = searchParams.get("subCatId");

  const [sort, setSort] = useState(null);
  const [subCat, setSubCat] = useState(subCatId);
  const [rate, setRate] = useState(0);
  const [price, setPrice] = useState(0);
  const [priceM, setPriceM] = useState(1000000);
  const [discount, setDiscount] = useState(null);
  const [stock, setStock] = useState(0);
  const [subCats, setSubCats] = useState([]);
  const [product, setProduct] = useState([]);

let rateFilter=(rateVal)=>{
  setRate(rateVal);
  console.log(rate);}

  let priceFilter=(val)=>{
    setPrice(val);
  }

 


 // http://localhost:8000/products?categoryID=64233ff9213d64eea40879d3&subCategoryID=64257abda2b34947c00d20a4
//  &subCategoryID=${subCatId}



  useEffect(() => {
    if(subCatId){
      fetch(`http://localhost:8000/Products?categoryID=${catId}&subCategoryID=${subCatId}&instock[gte]=${stock}&price[gte]=${price}&price[lte]=${priceM}&ratings[gte]=${rate}`)
      .then((res) => res.json())
      .then((json) => {
        // console.log(json);
        setProduct(json.data);
      });

    }
    else{
      fetch(`http://localhost:8000/Products?categoryID=${catId}&instock[gte]=${stock}&price[gte]=${price}&price[lte]=${priceM}&ratings[gte]=${rate}`)
      .then((res) => res.json())
      .then((json) => {
        console.log(json.data);
        setProduct(json.data);
      });

    }
    
  }, [stock,price,priceM,rate]);
  
  // let [t1, setT1] = useState(true);
  // let t2 = true;
  // let t3 = false;
  // let fun = () => {
  //   setT1(!t1);
  //   console.log("t1" + t1);
  // };
  return (
    <>
      <div className="container-fluid">
        <div className="row mt-5">
          <div className="col-2 cat-container">
            
            <ul>
              <li className="fw-bold" onClick={()=>{setStock(0)}}>All Products</li>
              <li onClick={()=>{setStock(1)}}>Available</li>
            </ul>

            <h4>Price</h4>
            <ul>
              <li className="fw-bold">All</li>
              <li>Min <input type="text"  onChange={(e)=>{setPrice(e.target.value?e.target.value:0)}}/></li>
              <li>Max <input type="text"  onChange={(e)=>{setPriceM(e.target.value?e.target.value:1000000)}}/></li>
            </ul>
           
            <h4>Rating</h4>
           <ul style={{color:"orange"}}>
            <li onClick={()=>{setRate(5)}}>
            <Rate defaultValue={5}
            allowHalf
            allowClear={false}
            disabled
            />
            </li>
            <li onClick={()=>{setRate(4)}}>
            <Rate defaultValue={4}
            allowHalf
            allowClear={false}
            disabled
            />
            </li>
            <li onClick={()=>{setRate(3)}}>
            <Rate defaultValue={3}
            allowHalf
            allowClear={false}
            disabled
            />
            </li>
            <li onClick={()=>{setRate(2)}}>
            <Rate defaultValue={2}
            allowHalf
            allowClear={false}
            disabled
            />
            </li>
            <li onClick={()=>{setRate(1)}}>
            <Rate defaultValue={1}
            allowHalf
            allowClear={false}
            disabled
            />
            </li>
           </ul>
           
           
          

          </div>
          <div className="col-9 m-auto">
            <div className="row">
              {product?.map((e, i) => {
                return (
                  <div className="col-6 col-md-4 p-5" key={i}>
                    <div className="my-1 mx-1 w-100">
                      <div id="imgWrap">
                        <img
                          src={e.images && e.images[0]}
                          className="card-img-top"
                          alt="..."
                          id="productImg"
                        />
                      </div>
                      <div className="card-body">
                        <NavLink to={`../product/${e._id}`} className={"text-decoration-none"}>
                        <p className="h6 mt-3 text-dark"> <i>{e.name}</i></p>
                        </NavLink>
                        <Stars rating={e?.ratings} color="orange"/>                     
                        <br/>
                        
                        <span className="deal fw-bold">{e.price}$</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {/* <div className="row">
          <div className="col-12">
            <div className="mx-auto justify-content-center d-flex align-items-center mt-5 pag">
              <nav aria-label="...">
                <ul className="pagination">
                  <li className="page-item disabled">
                    <a className="page-link fw-bold">Previous</a>
                  </li>
                  <li className="page-item fw-bold">
                    <a className="page-link" href="#">
                      1
                    </a>
                  </li>
                  <li className="page-item active " aria-current="page">
                    <a className="page-link fw-bold" href="#">
                      2
                    </a>
                  </li>
                  <li className="page-item fw-bold">
                    <a className="page-link" href="#">
                      3
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link fw-bold" href="#">
                      Next
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
}

export default Product;
