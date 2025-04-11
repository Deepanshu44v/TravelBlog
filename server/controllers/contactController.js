const Contact = require("../models/Contact.js");
const { sendContactEmail }  = require("../utils/sendEmail.js");

const submitContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const newContact = await Contact.create({ name, email, message });
    
    await sendContactEmail({ name, email, message });

    res.status(200).json({ message: "Contact message sent successfully!" });
  } catch (error) {
    console.error("Contact form error:", error);
    res.status(500).json({ error: "Failed to send contact message." });
  }
};
module.exports = {
  submitContactForm,
};
