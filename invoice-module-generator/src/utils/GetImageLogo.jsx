import React, { useEffect, useState } from "react";
import axios from "axios";

const GetImageLogo = (id) => {
  const [uploadedImages, setUploadedImages] = useState(null);

  const BASE_URL =
    import.meta.env.VITE_API_URL ||
    `https://invoice-generate-fullstack.onrender.com`;

  useEffect(() => {
    const savedId = localStorage.getItem("logoImageId");

    if (savedId) {
      const fetchImage = async () => {
        try {
          const response = await axios.get(`${BASE_URL}/api/images/${savedId}`);
          if (response.data.success) {
            setUploadedImages(response.data.image.image[0]);
          }
        } catch (error) {
          console.error("Error fetching saved image:", error);
        }
      };

      fetchImage();
    }
  }, []);
  return (
    <div>
      <img
        src={BASE_URL + uploadedImages?.url}
        alt={uploadedImages?.alt}
        className="w-8 h-8 object-cover rounded-sm border border-gray-300"
      />
    </div>
  );
};

export default GetImageLogo;
