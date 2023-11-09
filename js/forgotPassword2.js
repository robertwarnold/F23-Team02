const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
app.use(bodyParser.json());

// Configure the SMTP transporter
const transporter = nodemailer.createTransport({
    host: 'email-smtp.us-east-1.amazonaws.com', // Replace with the SES SMTP endpoint for your region
    port: 587,
    secure: false, // Use TLS
    auth: {
        user: 'AKIAT77CFA37ZISZSW5V', // Replace with your SMTP username
        pass: 'BPPPxJ2K4oRFTdB5WtXtDxitnPuXFgEG+2yh/+HvWc8t', // Replace with your SMTP password
    },
});

// Endpoint for sending a password reset email
app.post('/send-reset-email', async (req, res) => {
    const { recipientEmail, resetLink } = req.body;

    const mailOptions = {
        from: 'jltran@g.clemson.edu', // Replace with your verified sender email address
        to: recipientEmail,
        subject: 'Password Reset Link',
        text: `Click the following link to reset your password: ${resetLink}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Password reset email sent successfully');
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});