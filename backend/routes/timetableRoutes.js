// Express backend
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { log } = require("console");

const router = express.Router();

// Setup storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, "..", "uploads", "timetable");
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, "timetable.pdf");
  },
});

const upload = multer({ storage });

// Upload endpoint
router.post("/upload-timetable", upload.single("timetable"), (req, res) => {
  return res.status(200).json({ message: "PDF uploaded" });
});

// Serve the uploaded PDF
router.get("/", (req, res) => {
  const filePath = path.join(__dirname, "..", "uploads", "timetable", "timetable.pdf");
  if (fs.existsSync(filePath)) {
    return res.status(200).json({ fileName: "timetable/timetable.pdf" }); // match frontend usage
  } else {
    return res.status(404).json({ message: "PDF not found" });
  }
});


module.exports = router;
