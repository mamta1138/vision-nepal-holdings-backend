const Gallery = require("../models/gallery_model");
const galleryValidation = require("../helper/gallery_validator");
const multer = require("multer");
const { storage } = require("../../../config/cloudinary");
const upload = multer({ storage });

const createGallery = async (req, res) => {
  try {
    const { error, value } = galleryValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const images = req.files?.map(file => file.path);

    if (!images || images.length === 0) {
      return res.status(400).json({ message: "At least one image is required." });
    }

    const newGallery = new Gallery({
      ...value,
      image: images,  
    });

    await newGallery.save();

    return res.status(201).json({
      message: "Gallery created successfully",
      gallery: newGallery,
    });
  } catch (err) {
    console.error("Create Gallery Error:", err);
    return res.status(500).json({
      message: "Server error while creating gallery",
    });
  }
};

module.exports = { createGallery, upload };
