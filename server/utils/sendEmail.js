import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail", // or your preferred service
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

export const sendContactEmail = async ({ name, email, message }) => {
  const mailOptions = {
    from: email,
    to: process.env.CONTACT_RECEIVER_EMAIL, // where admin receives the mail
    subject: "New Contact Form Message",
    html: `
      <h3>New Message from Travel Blog Contact Form</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
      <p>This is automatic system generated Email from Deepanshu</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};
