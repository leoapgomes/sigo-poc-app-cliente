const loading = function(visibility){
    if(visibility){
        document.getElementById('div-loading').style.visibility = "visible";
        document.getElementById('div-block').style.visibility = "visible";
    } else {
        document.getElementById('div-loading').style.visibility = "hidden";
        document.getElementById('div-block').style.visibility = "hidden";
    }
}

export default loading;