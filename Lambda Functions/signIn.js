const mysql = require('node_modules/mysql');

/**takes the username and password
 * checks database if valid
 * if valid: create and return token, event type, and status success
 * if invalid: return event type and status failure
**/
function eventSignIn(event, connection){
  var responseType, reason, status;
  const registerPromise = new Promise((resolve, reject) => {
    connection.connect(function(err){
      if(err){
        console.log(err);
      }
      else {
        console.log("Successfully connected");

        const username = event.username;
        const password = event.password;

        const selectQuery = "SELECT Username, Password FROM AccountInfo where Username='"+username+"' AND Password='"+password+"'";
        connection.query(selectQuery, function(err, result, fields){
          if(err) {
            console.log(err);
            responseType = "failure";
            status = "Login authentication failed";
          }

          if (result.length === 1){
            responseType = "success";
            status = "Login authentication successful";
          }

          console.log(status);
          resolve({ responseType, status }); // Resolve the promise with responseType and status
          connection.end(); // Move this inside the query callback to ensure it's called after the query is complete
        });
      }
    });
  });
  return registerPromise;
}

document.getElementById("signIn").addEventListener("click", function() {
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