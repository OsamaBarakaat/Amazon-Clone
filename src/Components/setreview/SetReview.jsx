import React from 'react';
import './SetReview.css'
import { useState, useRef } from "react";
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const SetReview = (props) => {
    const {product, reviews, setReviews, id} = props;
    const [rating, setrating] = useState(0);
    const [hoverStar, setHoverStar] = useState(undefined);
    const inputRef = useRef(null);

    const { t, i18n } = useTranslation();


    function handleSubmit() {
      // inputRef.current.value = 'New value';
      const comment =inputRef.current.value;
      // console.log(rating,comment);
      const token = localStorage.getItem("token");

      let meth , url;

      if (id) {
        url = `http://localhost:8000/reviews/${id}`;
        axios.put(url, {
          rating,
          comment
      },{
        headers: {
          'content-type': 'application/json',
          'authorization':token
        }
      })
      .then((response) => {
        console.log(response);
        let newRev = response.data.data;
        let arr = reviews.map(r=>{
          if (r._id === id) {
            return newRev;
          }
          return r;
        }) 
        setReviews(arr);
      });
      }
      else{
        url = 'http://localhost:8000/reviews';
        axios.post(url, {
          rating,
          comment,
          product,
          user:'6416d0c1792b554cdcf54953'
      },{
        headers: {
          'content-type': 'application/json',
          'authorization':token
        }
      })
      .then((response) => {
        console.log(response);
        setReviews([response.data.data, ...reviews]);
      });
      }

     

    inputRef.current.value = '';
      setrating(0)
    }

    return (
        <div className="review-content">
          <h2>{t('proDt.addYourCom')}</h2>
          <div>
            <span className='h4 d-block text-info'>{t('proDt.setRatings')}</span>
            {Array(5)
              .fill()
              .map((_, index) =>
                 (
                    <i
                        key={index}
                        className={rating >= index + 1 || hoverStar >= index + 1 ?
                          "starBtn bi bi-star-fill"
                          :"starBtn bi bi-star"
                        }
                        onMouseOver={() => !rating && setHoverStar(index + 1)}
                        onMouseLeave={() => setHoverStar(undefined)}
                        onClick={() => setrating(index + 1)}
                    />
                  )
              )}
          </div>
          <textarea 
          placeholder={`${t('proDt.setComment')} ...`}
          style={{height:'300px'}}
          ref={inputRef}
          />
          
          <button 
            className={` ${!rating && "disabled"} btn btn-warning`}
            onClick = {handleSubmit}
          >
            {id?'Edit your Comment':t('submit')}
          </button>
        </div>
    );
};

export default SetReview;