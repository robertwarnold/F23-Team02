const mysql = require('node_modules/mysql');

/**
 * takes sign up information
 * queries database to see if information is not already in use
 * if information is valid, add to database, return success and event type
 * if invalid, return event type, status failure, and reason
 */
 async function eventSignUp (event, connection) {
  var responseType, reason, status
  const registerPromise = new Promise((resolve, reject) => {
    //console.log(connection);
    connection.connect(function(err){
      if(err){
       console.log(err);
      }
      console.log("successfully connected");
      const username = event.username;
      const firstname = event.firstname;
      const lastname = event.lastname;
      const email = event.email;
      const address = event.address;
      const phonenum = event.phonenum;
      const password = event.password;
      const querystatement = "SELECT Email,Username FROM AccountInfo where Email='"+email+"' OR Username='"+username+"'";
      connection.query(querystatement, function(err, result, fields){
        if(err){
          console.log(err);
        }
        else {
          if (result.length === 0) {
            responseType = "success"
            status = "Registration suceessful";
            reason = "Valid username & password";
          }
          else {
            responseType = "failure";
            status = "Registration failed";
            reason = "Username or email is already in use";
          }
        }
        resolve({ responseType, status, reason });
        console.log(status);
        console.log(reason);
      });
      
      const insertQuery = "INSERT into AccountInfo(Email, FirstName, LastName, Phone, Address, Username, Password) VALUE ('"+email+"','"+firstname+"','"+lastname+"','"+phonenum+"','"+address+"', '"+username+"','"+password+"')";
      connection.query(insertQuery, function(err, result, fields){
        if(err) {
          console.log(err);
          responseType = "failure";
          status = "Registration failed";
        }
        else {
          responseType = "success"
          status = "Registration successful";
        }
        console.log(status);
      });
      connection.end();
    });
  })
  return registerPromise;
}

document.getElementById("signUp").addEventListener("click", function() {
  const event = {
    "type": "Register",
    "firstname": document.getElementById("fName").value,
    "lastname": document.getElementById("lName").value,
    "username": document.getElementById("username").value,
    "email": document.getElementById("email").value,
    "phonenum": document.getElementById("phone").value,
    "password": document.getElementById("password").value
  };

  const connection = mysql.createConnection({
    host     : 'team02-rds.cobd8enwsupz.us-east-1.rds.amazonaws.com',
    user     : 'baath',
    password : 'team02b44th',
    database : 'team02RDS'
  });

  callback(null, eventSignUp(event, connection));
});