const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Configure the SMTP transport using Nodemailer
const smtpTransport = nodemailer.createTransport({
    host: 'email-smtp.us-east-1.amazonaws.com', // Amazon SES SMTP server for us-east-1 region
    port: 465,
    secure: true,
    auth: {
        user: 'AKIAT77CFA37ZISZSW5V', // Replace with your SMTP username
        pass: 'BPPPxJ2K4oRFTdB5WtXtDxitnPuXFgEG+2yh/+HvWc8t', // Replace with your SMTP password
    },
});

// Define an endpoint for sending forgot password emails
app.post('/send-forgot-password-email', (req, res) => {
    const { email } = req.body;

    const mailOptions = {
        from: 'jltran@g.clemson.edu', // Replace with your sender email
        to: email,
        subject: 'Password Reset Link',
        text: 'Click the link to reset your password: ',
    };

    // Send the email using Nodemailer and SMTP
    smtpTransport.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ message: 'Error sending email' });
        } else {
            console.log('Email sent:', info.response);
            res.status(200).json({ message: 'Email sent successfully' });
        }
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});