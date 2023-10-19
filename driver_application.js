// driver_application.js

function approveUser(userId) {
  // Assuming you have a unique identifier for each user (userId)
  fetch('/approve', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId }),
  })
    .then(response => response.text())
    .then(data => {
      console.log(data);
      // Update UI or perform additional actions as needed
    })
    .catch(error => console.error('Error:', error));
}

function denyUser(userId) {
  // Assuming you have a unique identifier for each user (userId)
  fetch('/deny', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId }),
  })
    .then(response => response.text())
    .then(data => {
      console.log(data);
      // Update UI or perform additional actions as needed
    })
    .catch(error => console.error('Error:', error));
}


