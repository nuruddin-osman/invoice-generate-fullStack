const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Upload = require("../models/upolads.model");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name);
  },
});

const upload = multer({ storage: storage });

// Only image upload  route
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image file uploaded",
      });
    }

    const newUpload = new Upload({
      image: [
        {
          url: `/uploads/${req.file.filename}`,
          alt: req.body.alt || "Product Image",
        },
      ],
    });

    await newUpload.save();

    // Image path send from Frontend
    res.status(201).json({
      success: true,
      imageUrl: `/uploads/${req.file.filename}`,
      message: "Image uploaded successfully",
      uploadId: newUpload._id,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

router.get("/images", async (req, res) => {
  try {
    const images = await Upload.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      images,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching images",
    });
  }
});

module.exports = router;
