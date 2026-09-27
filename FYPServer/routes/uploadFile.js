const express = require('express');
const router = express.Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const { uploadRateLimiter } = require('../helper/securityShield');

const uploadDir = path.join(__dirname, '../public/images');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// 允許之合法圖片 MIME 類型與副檔名對應表
const ALLOWED_MIME_TYPES = {
    'image/jpeg': '.jpg',
    'image/pjpeg': '.jpg',
    'image/png': '.png',
    'image/gif': '.gif',
    'image/webp': '.webp'
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        // 從受信任的 MIME 類型反查標準副檔名，杜絕雙重副檔名或虛假後綴 (e.g., shell.php.jpg)
        const safeExt = ALLOWED_MIME_TYPES[file.mimetype] || path.extname(file.originalname).toLowerCase();
        const cleanName = `${uuidv4()}${safeExt}`;
        cb(null, cleanName);
    }
});

const imgUpload = multer({
    limits: {
        fileSize: 8 * 1024 * 1024, // 限制 8MB
        files: 1
    },
    fileFilter(req, file, cb) {
        // 1. 校驗 MIME 類型
        if (!ALLOWED_MIME_TYPES[file.mimetype]) {
            return cb(new Error('不支援的檔案格式，僅允許上傳 JPG, PNG, GIF, WEBP 圖片。'));
        }

        // 2. 校驗副檔名
        const ext = path.extname(file.originalname).toLowerCase();
        if (!['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext)) {
            return cb(new Error('檔案副檔名無效。'));
        }

        // 3. 杜絕路徑穿越與危險字元
        if (file.originalname.includes('..') || file.originalname.includes('/') || file.originalname.includes('\\')) {
            return cb(new Error('檔案名稱包含非法路徑字符。'));
        }

        // 4. 杜絕偽裝雙副檔名 (例如 .php.jpg)
        const parts = file.originalname.split('.');
        if (parts.length > 2) {
            const forbiddenPreExt = ['php', 'jsp', 'asp', 'aspx', 'exe', 'sh', 'bat', 'cmd', 'cgi', 'pl', 'py', 'js', 'html', 'htm'];
            for (let i = 1; i < parts.length - 1; i++) {
                if (forbiddenPreExt.includes(parts[i].toLowerCase())) {
                    return cb(new Error('偵測到危險之複合副檔名，已拒絕上傳。'));
                }
            }
        }

        cb(null, true);
    },
    storage: storage
});

const singleImgUpload = imgUpload.single('Image');

const imgUploadHandler = (req, res, next) => {
    singleImgUpload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).json({ status: "fail", message: "檔案容量超過上限 (最大 8MB)" });
            }
            return res.status(400).json({ status: "fail", message: err.message });
        } else if (err) {
            return res.status(400).json({ status: "fail", message: err.message });
        }
        next();
    });
};

router.post('/', uploadRateLimiter, imgUploadHandler, async (req, res) => {
    const { file } = req;
    if (!file) {
        return res.status(400).json({ status: "fail", message: "請選擇要上傳的圖片檔案" });
    }

    res.json({
        status: "success",
        path: `http://${req.get('host')}/images/${file.filename}`,
        filename: file.filename
    });
});

module.exports = router;