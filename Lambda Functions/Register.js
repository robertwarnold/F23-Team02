const mysql = require('node_modules/mysql');




/**takes the username and password
 * checks database if valid
 * if valid: create and return token, event type, and status success
 * if invalid: return event type and status failure
**/
function eventSignIn(event, connection){
  const username = event.username;
  const password = event.password;
  
  var responseType;
  var status;
  //if success
  //return token appropriate info
  //if fail
  //
  
}

/**
 * takes sign up information
 * queries database to see if information is not already in use
 * if information is valid, add to database, return success and event type
 * if invalid, return event type, status failure, and reason
 */
async function eventRegister (event, connection) {
  const registerPromise = new Promise((resolve, reject) => {
  console.log("here");
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
  const phonenum = event.phonenum;
  const password = event.password;
  const querystatement = "SELECT Email,Username FROM AccountInfo where Email='"+email+"' OR Username='"+username+"'";
  connection.query(querystatement, function(err, result, fields){
    if(err){
      console.log(err);
    }
    console.log(result);
  });
  
  var responseType;
  var status;
  console.log
  resolve("resolvle");
  //if success
    //Add to database
  //if fail
    //Dont add, give reason
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
  const username = event.usernname;
  
  var responseType;
  var status;
  
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
      response = eventSignIn(event, connection);
      break;
      
    case 'Register':
      console.log("Register case");
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