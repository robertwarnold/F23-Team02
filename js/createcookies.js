//accessible in aws as the lambda function "Team02-CreateCookies"
const { Buffer } = require('buffer');

exports.handler = async (event) => {
    // Simulated user data
    const userData = {
        firstName: "John",
        lastName: "Doe",
        userName: "johndoe123",
    };

    // Generate a userId based on first and last names
    const userId = userData.firstName.charAt(0).toLowerCase() + userData.lastName.slice(0, 5).toLowerCase();

    // Prepare the data to be stored in cookies
    const cookieData = {
        userId: userId,
        firstName: userData.firstName,
        lastName: userData.lastName,
        userName: userData.userName,
    };

    // Encode the data into a JSON string
    const cookieValue = JSON.stringify(cookieData);

    // Create an authentication token (e.g., a JWT) that includes the user's information
    const token = createToken(cookieData);

    // Create an HTTP response that sets the cookies and sends the token
    const response = {
        statusCode: 200,
        headers: {
            "Set-Cookie": [
                `userId=${userId}; Path=/; Max-Age=3600`,
                `token=${token}; Path=/; Max-Age=3600`,
            ],
            "Content-Type": "text/plain",
        },
        body: "Cookies set and token generated!",
    };

    return response;
};

// Function to create an authentication token (e.g., JWT)
function createToken(data) {
    // In a real application, you should generate a secure JWT token.
    // For simplicity, this example encodes the data into a base64-encoded JSON string.
    return Buffer.from(JSON.stringify(data)).toString("base64");
}
