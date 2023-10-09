// registration.js
function registerUser() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const role = document.getElementById('role').value;

    const poolData = {
        UserPoolId: 'us-east-1_db0YqmgDq',
        ClientId: '6e4rn9da6dl0uir1s0o9judpnd'
    };

    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    const attributeList = [
        new AmazonCognitoIdentity.CognitoUserAttribute({ Name: 'given_name', Value: firstName }),
        new AmazonCognitoIdentity.CognitoUserAttribute({ Name: 'family_name', Value: lastName }),
        new AmazonCognitoIdentity.CognitoUserAttribute({ Name: 'email', Value: email }),
        new AmazonCognitoIdentity.CognitoUserAttribute({ Name: 'phone_number', Value: phone }),
        new AmazonCognitoIdentity.CognitoUserAttribute({ Name: 'custom:role', Value: role }),
    ];

    userPool.signUp(email, 'password', attributeList, null, function (err, result) {
        if (err) {
            alert(err.message || JSON.stringify(err));
            return;
        }
        const cognitoUser = result.user;
        console.log('user registered as', cognitoUser.getUsername());
    });
}

