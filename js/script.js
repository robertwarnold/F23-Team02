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
        document.getElementById("project-name").innerHTML = data[0].ProductName;
        document.getElementById("team-num").innerHTML = data[0].TeamNum;
        document.getElementById("version").innerHTML = data[0].Version;
        document.getElementById("project-desc").innerHTML = data[0].ProductDesc;
        document.getElementById("release").innerHTML = data[0].ReleaseDate.slice(0,10);
    })
    .catch(error => console.log(error));
}
