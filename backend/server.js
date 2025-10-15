// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sgMail from "@sendgrid/mail";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" })); // allow large images

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// API endpoint to send email
app.post("/api/send-email", async (req, res) => {
  const { title, description, location, photo } = req.body;

  const msg = {
    to: process.env.FROM_EMAIL, // admin email
    from: process.env.FROM_EMAIL, // verified sender
    subject: `New Issue Raised: ${title}`,
    html: `
      <h3>New Issue Raised</h3>
      <p><strong>Title:</strong> ${title}</p>
      <p><strong>Description:</strong> ${description}</p>
      <p><strong>Location:</strong> ${location}</p>
      ${photo ? `<p><strong>Photo:</strong></p><img src="cid:issuephoto" style="max-width:400px;"/>` : ""}
      <p><a href="http://localhost:3000/track">View Issue in CivicEye</a></p>
    `,
    attachments: photo
      ? [
          {
            content: photo.split(",")[1], // remove base64 header
            filename: "issue.png",
            type: "image/png",
            disposition: "inline",
            content_id: "issuephoto",
          },
        ]
      : [],
  };

  try {
    await sgMail.send(msg);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Email failed" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
