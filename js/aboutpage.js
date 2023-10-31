"use strict";

window.onload = function (){
    getAboutPage();
}

function getAboutPage(){
    fetch ('https://u76zsrtgq8.execute-api.us-east-1.amazonaws.com/team02-testing').then(res => {
        return res.json();
    })
    .then(data => {
        console.log(data);
        document.getElementById("project-name").innerHTML = data.ProductName;
        document.getElementById("team-num").innerHTML = data.TeamNum;
        document.getElementById("version").innerHTML = data.Version;
        document.getElementById("project-desc").innerHTML = data.ProductDesc;
        document.getElementById("release").innerHTML = data.ReleaseDate.slice(0,10);
    })
    .catch(error => console.log(error));
}

