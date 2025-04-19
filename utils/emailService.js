const nodemailer = require("nodemailer");

// Set up the email transporter using a service (like Gmail, SendGrid, etc.)
const transporter = nodemailer.createTransport({
  service: "gmail", // Use any email service provider
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASSWORD, // Your email password or app password
  },
});

// Function to send an email
const sendEmail = async (to, subject, text, html) => {
  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender address
    to, // Recipient(s)
    subject, // Subject line
    text, // Plain text body
    html, // HTML body (optional)
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Error sending email");
  }
};

module.exports = {
  sendEmail,
};
