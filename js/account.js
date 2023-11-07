function signIn(){
    
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    document.getElementById("errMessage").innerHTML = "";
    var apiURL = 'https://u76zsrtgq8.execute-api.us-east-1.amazonaws.com/team02-testing/sign-in'+'?username=' + username + '&password=' + password;
    fetch(apiURL)
    .then(res => {
        return res.json();
    })
    .then(data=>{
        console.log(data);
        if((data.status === "Success") && (data.eventType === "SignIn")){
            switch (data.userType){
                case 'Admin':
                    window.location.href ='./admin/admin_dashboard.html';
                    break;
                case 'Sponsor':
                    window.location.href ='./sponsor/sponsor_dashboard.html';
                    break;
                case 'Driver':
                    window.location.href ='./driver/driver_dashboard.html';
                    break;
            }
        }
        else if((data.status === "Failure") && (data.eventType === "SignIn")){
            document.getElementById("errMessage").innerHTML = data.reason;
        }
        else{
            document.getElementById("errMessage").innerHTML = "Something went horribly wrong!";
        }
    })
    .catch(error=>console.log(error));
}

function validateToken(){
    //get username and token cookie
    username = document.cookie.match();
    token = document.cookie.match();

    fetch('function url goes here',{
        Method: 'POST',
        Headers:{
            'Content-type': 'application/json; charset=UTF-8',
        },
        Body: JSON.stringify({
            'type': 'ValidateToken',
            'username': username,
            'token' :token
        }),
    }).then(res =>{
        return res.json;
    }).then(data=>{
        //debugging purpose
        console.log(data);

        if((data.status === "Success") && (data.eventType === "ValidateToken")){
            //call page specific function to get data
        }
        else if((data.status === "Failure") && (data.eventType === "ValidateToken")){
            //redirect to signin page
            window.location.replace('../signIn.html');
        }
        else{
            console.log(data.eventType);
        }

    })
}