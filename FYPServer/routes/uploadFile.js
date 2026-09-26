const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Helper = require('../helper/helper');
const asyncHandler = require('express-async-handler')
const multer = require('multer')
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

const uploadDir = path.join(__dirname, '../public/images');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir)
    },
    filename: function (req, file, cb) {
        const fileName = `${uuidv4()}${path.extname(file.originalname)}`
        cb(null, fileName)
    }
})
const imgUpload = multer({
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
            cb(new Error('Please upload an image (jpg, jpeg, png, gif, webp)'))
        }
        cb(null, true)
    },
    storage: storage
})
const singleImgUpload = imgUpload.single('Image');

const imgUploadHandler = (req, res, next) => {
    singleImgUpload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ status: "fail", message: err.message });
        } else if (err) {
            return res.status(400).json({ status: "fail", message: err.message });
        }
        next()
    })
}
router.post('/', imgUploadHandler, asyncHandler(async function (req, res, next) {
    const { file } = req;
    if (!file) {
        return res.status(400).json({ status: "fail", message: "No image file uploaded" });
    }

    res.json({
        status: "success",
        path: `http://${req.get('host')}/images/${file.filename}`,
        filename: file.filename
    });
}));
// router.post('/', async (req, res, next) =>{
//     console.log(req)
//     const { files } = req.body;
//     console.log(files)
// })

// router.post("/image", express.static(path.join(__dirname, "./public")));
module.exports = router;