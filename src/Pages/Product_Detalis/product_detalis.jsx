import React, { useState, useEffect} from 'react';
import {useParams} from 'react-router-dom'
import axios from 'axios';
import './product_detalis.css';
import Stars from '../../Components/stars';
import SetReview from '../../Components/setreview/SetReview';
import Quantity from '../../Components/quantity';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../Store/Actions/cartActions';
import { useTranslation } from 'react-i18next';

import { imageZoom } from '../../Utils/utils';
import SliderCategory from '../../Components/Slider/SliderCategory';

function ProductDetalis(props) {
    const { cartItems } = useSelector(state => state.cart);
    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [imgIndx, setImgIndx] = useState(0);
    const { t, i18n } = useTranslation();
    const user = useSelector(state => state.user);
    const [num, setNum] = useState(1);
    const dispatch = useDispatch()
    const [UserReviewId, setUserReviewId] = useState(null);
    // use this url to show the page
    // http://localhost:3000/product/64496ddd53405830e95f49a2
    const {productId} = useParams() //'6417574b7505b8e0d7cc74e8';
    const currentLanguageCode = localStorage.getItem('i18nextLng') || 'en'

    console.log('id',productId);
    useEffect(() => { 
        console.log(UserReviewId,'iiiiiiiiiiiiiiii');
        axios.get(`http://localhost:8000/products/${productId}`,
        {
            headers: {
              'content-type': 'application/json',
              'lang':currentLanguageCode
            }
          }
        )
        .then(res =>{
            const prod = res.data.data;
            console.log(prod);
            setProduct(prod);
        })

        axios.get(`http://localhost:8000/products/${productId}/reviews`)
        .then(res =>{
            const result = res.data.data;
            console.log(result,"kkkkkkkkkkkkk");
            setReviews(result);
        })
     },[productId,currentLanguageCode]);


     useEffect(()=>{
        if (product) {
            imageZoom('img-original','img-zoom');            
        }
    },[product])
        

     useEffect(()=>{setUserReviewId(getUserReview());},[reviews])

     const getUserReview = ()=>{
        for (let i = 0; i < reviews.length; i++) {
            if (user.userInfo?._id===reviews[i].user._id) {
                return reviews[i]._id;
            }
        }
        return null;
     }


     const hoverHandler = (indx) => {
        setImgIndx(indx);
    };

    const addToCartHandler = () => {
        const prd={
            productId,
            name:product.name,
            image:product.images[0],
            quantity:num,
            color:product.color,
            instock:product.instock,
            price:product.price
        }
        let exprd = cartItems.find(i=>i.productId === prd.productId);
        if (exprd) {
            prd.quantity += exprd.quantity
        }
        dispatch(addToCart(prd));
        if (user.userInfo) {
            const token = localStorage.getItem("token");
            axios.post('http://localhost:8000/carts/',prd,{
                headers: {
                  'content-type': 'application/json',
                  'authorization':token
                }
              })
        }
    };

    const delReview = ()=>{
    const token = localStorage.getItem("token");
        axios.delete(`http://localhost:8000/reviews/${UserReviewId}`,
        {
            headers: {
              'content-type': 'application/json',
              'authorization':token
            }
          });
        setReviews(reviews.filter(r=>r._id!==UserReviewId))
    }

        return (
            <div className='p-3'>
            <div className='row product_detalis mb-5 pt-4'>
                <div className="col-md-4" id='product_imgs'>
                    <div className="left">
                        <div className="left_1">
                            {product?.images.map((image, i) => (
                                <div
                                    className={i === imgIndx ? 'img_wrap Active' : 'img_wrap'}
                                    key={i}
                                    onMouseOver={() => hoverHandler(i)}
                                >
                                    <img src={image} alt="" />
                                </div>
                            ))}
                        </div>
                        <div className="left_2">
                            <img src={product?.images[imgIndx]} alt="" id="img-original"/>
                        
                        </div>
                    </div>
                </div>
                <div className="col-md-5 pro_info">
                <div
                 id="img-zoom"
                 className="img-zoom-result shadow-lg"
                 style={{backgroundImage:`url(${product?.images[imgIndx]})`}}
                 >
                 </div>
                    <h1>{product?.name}</h1>
                    <span className='text-info d-block'>{t('brand')}: {product?.brand}</span>
                    <span>{t('proDt.rate')}: <span className='text-info'>{t('everyOne')}</span></span>
                     <div>
                        <Stars rating={product?.rating} color="orange"/> 
                        <span className='ms-1 text-info'> {t('proDt.ratings')} </span>
                     </div>
                     <hr />
                     <span className='h3'>${product?.price}</span>
                     <div>
                         <span style={{color:'#333'}}>{t('color')}:</span>
                         <span className='h3'>{product?.color}</span>
                     </div>
                    <hr />
                    <h3> {t('proDt.aboutThisItem')} </h3>
                    <p>{product?.description}</p>
                </div>
                <div className="col-md-2 addToCart">
                    <span className='h3 d-block my-2'>${product?.price}</span>
                    <span className='side_data'>$70.00 {t('Shipping')} </span>
                    <span className='side_data'>{t('proDt.deposit')}</span>
                    <span className='side_data'>{t('proDt.deliveryAT')}</span>

                    <span className='d-block my-3'>
                        <i className="bi bi-geo-alt"></i>
                        <span className='text-info'>{t('proDt.deliveryTO')}</span>
                    </span>

                    <span className='h3 text-success side_data'>{t('inStock')}</span>

                    <Quantity 
                    num={num}
                    handleClick={(i)=>{setNum(i)}}
                    qty={product?.instock}
                    />

                    <button 
                    className='btn btn-warning w-100 my-3'
                    onClick={addToCartHandler}
                    >
                        
                        {t("proDt.addToCart")}
                    </button>

                    <div>
                         <span style={{color:'#666'}}>{t('proDt.shipsFrom')}:</span>
                         <span style={{fontWeight:'bolder'}}> Amazon</span>
                     </div>

                     <div>
                         <span style={{color:'#666'}}>{t('proDt.solidBy')}:</span>
                         <span style={{fontWeight:'bolder'}}> Amazon</span>
                     </div>
                </div>
            </div>
            
            <hr />
            <h3 className='PT-5'>Related Products</h3>
            {product && <SliderCategory categoryID={product.categoryID} flag={true} />}
            <div className="reviews row my-5 pt-3">
                <div className='col-md-4'>
                    <hr />
                    <SetReview 
                    product={productId}
                    reviews={reviews}
                    setReviews={setReviews}
                    id={UserReviewId}
                    />
                </div>

                <div className='col-md-6'>
                    <hr />
                    <h2 className='p-1'>{t('proDt.custReviews')}</h2>
                    {
                        reviews?
                        reviews.map( (rev,i) =>(
                            <div key={i} className='my-5'>
                                <div className='user-data'>
                                    <img src={rev.user.image} alt="" />
                                    <span className='h5 ms-1'>{rev.user.name}</span>
                                </div>

                                <Stars rating={rev.rating} color="orange"/> 

                                <p>{rev.comment}</p>
                                <i 
                                className="bi bi-trash text-danger"
                                onClick={delReview}
                                >
                                </i>
                            </div>
                        ))
                        :<p>There is no reviews for this product</p>
                    }
                </div>
            </div>
            </div>
           
        );
    }

export default ProductDetalis;