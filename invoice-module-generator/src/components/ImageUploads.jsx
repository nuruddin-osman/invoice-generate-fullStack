import React from "react";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/baseUrl";

const ImageUploads = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [imageUrls, setImageUrls] = useState({});
  const [uploadedImages, setUploadedImages] = useState([]);

  // Image upload function
  const handleImageUpload = async (e) => {
    try {
      const formData = new FormData();
      const file = e.target.files[0];
      formData.append("image", file);

      const response = await axios.post(`${BASE_URL}/api/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data) {
        setImageUrl(response.data.imageUrl);
        localStorage.setItem("logoImageId", response.data.uploadId);
        alert("Image uploaded successfully!");

        // Keeping the preview item intact, new item add
        setUploadedImages((prev) => [
          {
            url: response.data.imageUrl,
            id: response.data.uploadId,
            alt: "Uploaded Image",
          },
          ...prev,
        ]);
        window.location.reload();
      } else {
        alert("Image upload failed");
      }
    } catch (error) {
      console.error("Image upload error:", error);
      alert("Image upload error");
    }
  };

  const getImagesDetails = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/images`);
      if (response.data.success) {
        const allImages = response.data.images.flatMap((item) => item.image);
        setUploadedImages(allImages);
      }
    } catch (error) {
      console.error("Error loading images:", error);
    }
  };

  useEffect(() => {
    const savedId = localStorage.getItem("logoImageId");

    if (savedId) {
      const fetchImage = async () => {
        try {
          const response = await axios.get(`${BASE_URL}/api/images/${savedId}`);
          if (response.data.success) {
            setImageUrls(response.data.image?.image[0]);
          }
        } catch (error) {
          console.error("Error fetching saved image:", error);
        }
      };

      fetchImage();
    }
    getImagesDetails();
  }, []);

  return (
    <div className="w-full">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Product Image
      </label>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
        {/* Upload image */}
        <label className="flex flex-col items-center justify-center w-full sm:w-1/2 h-40 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 transition-all duration-300 shadow-sm hover:shadow-md">
          <div className="flex flex-col items-center justify-center p-4 text-center">
            <FaPlus className="w-10 h-10 mb-3 text-gray-400 group-hover:text-gray-600 transition-colors" />
            <p className="mb-1 text-sm text-gray-600 font-medium">
              Click to upload image
            </p>
            <p className="text-xs text-gray-400">
              SVG, PNG, JPG or GIF (max 5MB)
            </p>
          </div>
          <input
            type="file"
            name="image"
            className="hidden"
            onChange={handleImageUpload}
          />
        </label>

        {/* Preview Box */}
        {(imageUrl || imageUrls?.url) && (
          <div className="flex flex-col items-center justify-center w-full sm:w-1/2 bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <img
              src={BASE_URL + (imageUrl || imageUrls?.url)}
              alt="Preview"
              className="w-32 h-24 object-cover rounded-lg border border-gray-300 mb-2"
            />
            <span className="text-green-600 text-sm font-medium">
              Image Uploaded Successfully!
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploads;
