export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://invoice-generate-fullstack.onrender.com"
    : "http://localhost:5000";
