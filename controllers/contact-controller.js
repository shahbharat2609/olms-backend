import Contact from "../models/contact-model.js";

const contactForm = async (req, res) => {
  try {
    const post = req.body;
    console.log("✅ response ✅", post);
    await Contact.create(post);
    return res.status(200).json({ msg: "Message sent successfully" });
  } catch (error) {
    return res.status(500).json({ msg: "Message not delivered" });
  }
};

export default contactForm;
