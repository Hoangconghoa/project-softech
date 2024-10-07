import express from "express";
import multer from "multer";
const router = express.Router();
import buildSlug from "../../helpers/slugHepers";
import fs from "fs";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = "public/uploads";
    fs.mkdirSync(uploadPath, { recursive: true }); // Ensure the directory exists
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    console.log("file", file);
    const originName = file.originalname;
    const parts = originName.split(".");
    const fileName = parts[0]; // "logo"
    const fileExtension = parts[1]; // "png"

    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, buildSlug(fileName) + "-" + uniqueSuffix + "." + fileExtension);
  },
});

const upload = multer({ storage: storage });
const uploadSingle = upload.single("file");
const uploadHandle = upload.single("profile");

router.post("/single", (req, res, next) => {
  uploadSingle(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json({
        statusCode: 500,
        message: err.message,
        typeError: "MulterError",
      });
    } else if (err) {
      return res.status(500).json({
        statusCode: 500,
        message: err.message,
        typeError: "UnKnownError",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        statusCode: 400,
        message: "No file uploaded",
      });
    }

    const filePath = path.join("public/uploads", req.file.filename);
    console.log(filePath);

    // Check if file actually exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        console.error("File does not exist:", filePath);
        return res.status(500).json({
          statusCode: 500,
          message: "File not found after upload",
          typeError: "FileNotFound",
        });
      }

      res.status(200).json({
        statusCode: 200,
        message: "success",
        data: {
          link: `uploads/${req.file?.filename}`,
        },
      });
    });
  });
});

router.post("/handle-error", (req, res, next) => {
  uploadHandle(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json({
        statusCode: 500,
        message: err.message,
        typeError: "MulterError",
      });
    } else if (err) {
      return res.status(500).json({
        statusCode: 500,
        message: err.message,
        typeError: "UnKnownError",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        statusCode: 400,
        message: "No file uploaded",
      });
    }

    const filePath = path.join("public/uploads", req.file.filename);
    console.log(filePath);

    // Check if file actually exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        console.error("File does not exist:", filePath);
        return res.status(500).json({
          statusCode: 500,
          message: "File not found after upload",
          typeError: "FileNotFound",
        });
      }

      res.status(200).json({
        statusCode: 200,
        message: "success",
        data: {
          link: `uploads/${req.file?.filename}`,
        },
      });
    });
  });
});

export default router;
