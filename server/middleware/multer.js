const multer = require("multer");

const storage = multer.memoryStorage(); // ⬅️ Important!
const upload = multer({ storage });

module.exports = upload;
