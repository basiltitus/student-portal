import React from 'react'
import LoadingGif from "./loading.gif"
import "./LoadingScreen.css"
function LoadingScreen(){
    return (
            <div id="loadingDiv">
                <img className="loadingImg" src={LoadingGif} />
                <h3 className="loadingText">Please wait while we gather some Info ...</h3>
            </div>
    );
}

export default LoadingScreen;