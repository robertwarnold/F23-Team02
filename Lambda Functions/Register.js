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
            responseType = "Success";
            status = "Login authentication successful";
          }

          console.log(responseType);
          console.log(status);
          resolve({ responseType, status }); // Resolve the promise with responseType and status
          connection.end(); // Move this inside the query callback to ensure it's called after the query is complete
        });
      }
    });
  });
  return registerPromise;
}


/**
 * takes sign up information
 * queries database to see if information is not already in use
 * if information is valid, add to database, return success and event type
 * if invalid, return event type, status failure, and reason
 */
async function eventRegister (event, connection) {
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
            status = "Registration suceess";
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
          responseType = "Success"
          status = "Registration successful";
        }
      });
    connection.end();
    });
  }
)
return registerPromise;
}
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

/**
 * takes user token and username 
 * checks database to ensure they are valid
 * if valid, return status success, event type, 
 * if not valid, return status failure, event type
 */
function eventValidateToken(event){
  
}

exports.handler = async (event, context, callback) => {
  // TODO implement
  const connection = mysql.createConnection({
            host     : 'team02-rds.cobd8enwsupz.us-east-1.rds.amazonaws.com',
            user     : 'baath',
            password : 'team02b44th',
            database : 'team02RDS'
      });
  let response = 'undefined';
  console.log(event.type);
  switch (event.type){
    case 'SignIn':
      callback(null, eventSignIn(event, connection));
      break;
      
    case 'Register':
      callback(null, eventRegister(event, connection));
      break;
      
    case 'ForgotPassword':
      eventForgotPassword(event);
      break;
      
    case 'ValidateToken':
      eventValidateToken(event);
      break;
    default:
    
  }
  
};