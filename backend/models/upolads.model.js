const mongoose = require("mongoose");

const uploadSchema = new mongoose.Schema(
  {
    image: [
      {
        url: {
          type: String,
          required: true,
        },
        alt: {
          type: String,
          default: "",
        },
      },
    ],
    createdBy: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Upload = mongoose.model("Upload", uploadSchema);

module.exports = Upload;
