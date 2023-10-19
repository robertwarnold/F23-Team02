function lambdaTest(){
    fetch('https://u76zsrtgq8.execute-api.us-east-1.amazonaws.com/team02-testing')
    .then(res => {
        return res.json();
    })
    .then(data => {
        console.log(data);
        document.getElementById("test").innerHTML = data.message;
    })
    .catch(error => console.log(error));
    console.log(document.cookie);
}
