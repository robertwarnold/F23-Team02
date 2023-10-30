const mysql = require('node_modules/mysql');

/**
 * takes user email and sends link to that email to reset password
 * does not reset password automatically
 * if valid email and successfully sends, return event type and success
 * if no valid, return event type, status failure, and reason
 */
 function eventForgotPassword(event){
  //const username = event.usernname;
  
  //var responseType;
  //var status;
  
}

document.getElementById("forgotPassword").addEventListener("click", function() {
  const event = { 
    "type" : "SignIn", 
    "username" : document.getElementById("username").value,
    "password" : document.getElementById("password").value 
  };

  const connection = mysql.createConnection({
    host     : 'team02-rds.cobd8enwsupz.us-east-1.rds.amazonaws.com',
    user     : 'baath',
    password : 'team02b44th',
    database : 'team02RDS'
  });

  callback(null, eventRegister(event, connection));
});