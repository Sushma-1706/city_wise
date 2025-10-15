import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";
dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

(async () => {
  try {
    await sgMail.send({
      to: process.env.FROM_EMAIL, // your email to receive test
      from: process.env.FROM_EMAIL, // verified sender
      subject: "Test Email from CivicEye",
      html: "<h1>Hello!</h1><p>This is a test email.</p>",
    });
    console.log("Test email sent!");
  } catch (err) {
    console.error(err.response?.body || err);
  }
})();
