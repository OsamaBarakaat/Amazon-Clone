export function imageZoom(imgID, resultID) {

    console.log('dddddddddddddddddd');
    let img, lens, result, cx, cy;

    img = document.getElementById(imgID);
    result = document.getElementById(resultID);

    console.log(img, result);
    lens = document.createElement('DIV');
    lens.setAttribute('class','img-zoom-lens');

    img.parentElement.insertBefore(lens, img);

    cx = result.offsetWidth / lens.offsetWidth;
    cy = result.offsetHeight / lens.offsetHeight;

    // result.style.backgroundImage = 'url('+img.src+')';
    result.style.backgroundSize = (img.width * cx) + "px " + (img.height * cy) + "px";

    lens.addEventListener("mousemove", moveLens);
    img.addEventListener("mousemove", moveLens);

    lens.addEventListener('mouseout',()=>{
        result.style.visibility = 'hidden';
        lens.style.visibility = 'hidden';
    })
    img.addEventListener('mouseout',()=>{
        result.style.visibility = 'hidden';
        lens.style.visibility = 'hidden';
    })

    lens.addEventListener("touchmove", moveLens);
    img.addEventListener("touchmove", moveLens);


    function moveLens(e) {
        console.log('vvvvvvvvvvvvvvvvv');
        let pos, x, y;
        pos = getCursorPos(e);
        x= pos.x - (lens.offsetWidth / 2);
        y= pos.y - (lens.offsetHeight / 2);

        if(x > img.width - lens.offsetWidth){
            x = img.width - lens.offsetWidth;
        }
        if (x<0) {  x=0;  }

        
        if(y > img.height - lens.offsetHeight){
            y = img.height - lens.offsetHeight;
        }
        if (y<0) {  y=0;  }

        result.style.visibility = 'visible';
        lens.style.visibility = 'visible';

        lens.style.left = x + "px";
        lens.style.top = y + "px";
        result.style.backgroundPosition = "-" + (x*cx) + "px -" + (y * cy) + "px";
    }

    function getCursorPos(e) {
        let a, x=0, y=0;
        e = e || window.event;
        a = img.getBoundingClientRect();
        x = e.pageX - a.left;
        y = e.pageY - a.top;
        x = x - window.pageXOffset;
        y = y - window.pageYOffset;
        return{x,y};
    }


}


// imageZoom('img-original','img-zoom');


// useEffect(()=>{
//     if (product) {
//         imageZoom('img-original','img-zoom');            
//     }
//  },[product])


{/* <div id="img-zoom" className="img-zoom-result"></div> */}

export function calcTotalPrice(cartItems) {
    let totalPrice = 0;
    for (let i of cartItems) {
        totalPrice += (i.price * i.quantity);
    }
    return totalPrice;
}


export function calcItemsNum(cartItems) {
    let itemsNum = 0;
    for (let i of cartItems) {
        itemsNum += i.quantity;
    }
    return  itemsNum;
}