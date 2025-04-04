const express = require("express");
const router = express.Router();
const { ingest, search, getDocument } = require("./controller.js");
const multer = require("multer");
const path = require("path");


// const upload = multer({
//     dest: "uploads/",
//     fileFilter: function (req, file, cb) {
//       const fileExt = path.extname(file.originalname).toLowerCase();
//       if (fileExt === ".txt") {
//         cb(null, true); 
//       } else {
//         cb(new Error("Only .txt files are allowed!"));
//       }
//     },
//     limits: {
//       fileSize: 5 * 1024 * 1024, //max file size = 5MB
//     },
//   });
const storage = multer.memoryStorage();
const upload = multer({ storage });
router.post("/ingest",upload.single("file"), ingest);
router.get("/search", search);
router.get("/", (req, res) => res.render("ingest"));
router.get("/document/:id",getDocument)

module.exports=router;
