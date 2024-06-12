import nodemailer from 'nodemailer';

// Create a Nodemailer transporter using your email service
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

export const sendMail = async (email, body, subject, username) => {
    username = username || "Anonymous"
    const mailOptions = {
        from: `${username} <${process.env.NODEMAILER_USER}>`,
        to: email,
        subject: subject,
        text: body,
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return ('Error sending email: ', error);
        } else {
            return ('email sent: ' + info.response);
        }
    });
}
