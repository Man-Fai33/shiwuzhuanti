const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = require('../models/user');
const { authRateLimiter, toSafeString, cleanNoSql } = require('../helper/securityShield');

/**
 * GET /users/user
 * 取得用戶清單 (嚴格排除密碼欄位 - Prevent Sensitive Data Exposure)
 */
router.get('/user', async (req, res) => {
  try {
    const users = await User.find({}, '-password').lean().exec();
    res.json({ status: "success", users });
  } catch (err) {
    console.error('[Security] Error fetching users:', err.message);
    res.status(500).json({ status: "fail", message: "無法載入使用者清單" });
  }
});

/**
 * POST /users/user
 * 註冊新會員 (附帶暴力註冊頻率限制與資料型別校驗)
 */
router.post('/user', authRateLimiter, async (req, res) => {
  try {
    let target = req.body.user;
    if (!target || typeof target !== 'object') {
      return res.status(400).json({ status: "fail", message: "無效的註冊資料" });
    }

    target = cleanNoSql(target);
    const email = toSafeString(target.email, 120).toLowerCase();
    const password = typeof target.password === 'string' ? target.password.trim() : '';

    if (!email || !email.includes('@')) {
      return res.status(400).json({ status: "fail", message: "請輸入有效的電子信箱格式" });
    }

    if (!password || password.length < 4) {
      return res.status(400).json({ status: "fail", message: "密碼長度至少需 4 個字元以上" });
    }

    target.email = email;
    target.password = password;

    // 檢查信箱是否已被註冊
    const existingUser = await User.findOne({ email }).lean().exec();
    if (existingUser) {
      return res.status(409).json({ status: "fail", message: "此電子信箱已被註冊使用" });
    }

    const newUser = new User(target);
    const savedUser = await newUser.save();
    
    // 遮蔽密碼再返回給前端
    const safeUser = savedUser.toObject();
    delete safeUser.password;

    res.json({
      status: "success",
      message: "帳號註冊成功",
      user: safeUser
    });
  } catch (err) {
    console.error('[Security] User registration failed:', err.message);
    res.status(500).json({ status: "fail", message: "註冊失敗，請確認資料完整性後再試" });
  }
});

/**
 * POST /users/user/emailPass
 * 會員登入驗證 (強型別驗證 + 阻絕 NoSQL 運算符注入 + 暴力登入次數限制)
 */
router.post('/user/emailPass', authRateLimiter, async (req, res) => {
  try {
    const rawEmail = req.body.email;
    const rawPassword = req.body.password;

    // 嚴格確保為純文字字串型別，徹底瓦解 { "$ne": null } 等注入攻擊
    const targetEmail = toSafeString(rawEmail, 120).toLowerCase();
    const targetPassword = typeof rawPassword === 'string' ? rawPassword.trim() : '';

    if (!targetEmail || !targetPassword) {
      return res.status(400).json({
        status: "fail",
        message: "請輸入電子信箱與密碼"
      });
    }

    const user = await User.findOne({
      email: targetEmail,
      password: targetPassword
    }).exec();

    if (!user) {
      return res.status(401).json({
        status: "fail",
        message: "帳號或密碼錯誤，請重新確認"
      });
    }

    // 遮蔽返回的物件密碼欄位
    const safeUser = user.toObject();
    delete safeUser.password;

    res.json({
      status: "success",
      message: "登入成功",
      user: safeUser
    });
  } catch (err) {
    console.error('[Security] Login authentication error:', err.message);
    res.status(500).json({
      status: "fail",
      message: "系統認證服務異常，請稍後再試"
    });
  }
});

/**
 * PUT /users/user
 * 更新使用者資訊
 */
router.put('/user', async (req, res) => {
  try {
    let target = req.body.user;
    if (!target || typeof target !== 'object') {
      return res.status(400).json({ status: "fail", message: "無效的更新資料" });
    }

    target = cleanNoSql(target);
    const targetid = target._id;
    if (!targetid || !mongoose.Types.ObjectId.isValid(targetid)) {
      return res.status(400).json({ status: "fail", message: "無效的使用者識別碼 (ID)" });
    }

    delete target._id; // 防止 _id 變更

    const updatedUser = await User.findByIdAndUpdate(targetid, target, {
      new: true,
      select: '-password'
    }).lean().exec();

    if (!updatedUser) {
      return res.status(404).json({ status: "fail", message: "找不到該使用者" });
    }

    res.json({ status: "success", user: updatedUser });
  } catch (err) {
    console.error('[Security] User update error:', err.message);
    res.status(500).json({ status: "fail", message: "更新使用者資訊失敗" });
  }
});

/**
 * DELETE /users/user/:id
 * 刪除使用者
 */
router.delete('/user/:id', async (req, res) => {
  try {
    const id = req.params.id;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ status: "fail", message: "無效的使用者 ID" });
    }

    const result = await User.findByIdAndDelete(id).select('-password').lean().exec();
    if (!result) {
      return res.status(404).json({ status: "fail", message: "找不到欲刪除的使用者" });
    }

    res.json({ status: "success", user: result });
  } catch (err) {
    console.error('[Security] User deletion error:', err.message);
    res.status(500).json({ status: "fail", message: "刪除失敗" });
  }
});

module.exports = router;
