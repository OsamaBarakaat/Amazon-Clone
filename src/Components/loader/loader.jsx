import React from 'react';
import './loader.css'
function Loader(props) {
    return (
        <div className='loader_container'>
            <div id="loading">
                loading...
                <span id='load-s'></span>
            </div>
        </div>
    );
}

export default Loader;