const jwt = require("jsonwebtoken");
const dotenv = require('dotenv')
dotenv.config()
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZjEyMzljYjQwNTQ1M2ZkOGNmZjIxYSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc0Mzg2OTIwOCwiZXhwIjoxNzQzOTU1NjA4fQ.senOILqZJiNm9uCPTcgZvlP4WSblZDt7OO8jrVK3NaE";

try {
  const decoded = jwt.verify(token, "supersecretkey");
  console.log("Decoded token:", decoded);
} catch (err) {
  console.error("Token verification failed:", err.message);
}