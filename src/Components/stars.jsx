import React from 'react';

function Stars(props) {
    const {rating, color} = props;
    const starsNum = rating? parseInt(rating) : 5;
    const starsHalf = rating%starsNum;
    const stars = Array(starsNum);

    for (let i = 0; i < starsNum; i++) {
        stars.push(<i className="bi bi-star-fill" key={i} style={{color}}></i>)        
    }

    if (starsHalf) {
        stars.push(<i className="bi bi-star-half" key={starsNum+1} style={{color}}></i>)
    }

    // console.log(starsNum,starsHalf);

    return (
        <>
            {stars}
        </>
    );
}

export default Stars;