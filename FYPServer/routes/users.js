const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = require('../models/user');
const VerificationCode = require('../models/verificationCode');
const { authRateLimiter, toSafeString, cleanNoSql } = require('../helper/securityShield');
const { generateOtp, sendVerificationEmail } = require('../helper/emailService');

/**
 * POST /users/send-verification-code
 * 發送 6 位數電子信箱驗證碼 (支援 SMTP 真實寄信與開發模式降級)
 */
router.post('/send-verification-code', authRateLimiter, async (req, res) => {
  try {
    const rawEmail = req.body.email;
    const type = req.body.type || 'signup';
    const email = toSafeString(rawEmail, 120).toLowerCase();

    if (!email || !email.includes('@') || !email.includes('.')) {
      return res.status(400).json({ status: "fail", message: "請輸入有效的電子郵件地址" });
    }

    // 若為註冊驗證，檢查信箱是否已存在
    if (type === 'signup') {
      const existing = await User.findOne({ email }).lean().exec();
      if (existing) {
        return res.status(409).json({ status: "fail", message: "此電子信箱已被註冊使用" });
      }
    }

    // 產生 6 位數安全隨機驗證碼
    const code = generateOtp(6);

    // 儲存或更新驗證碼紀錄 (MongoDB TTL 10分鐘自動清理)
    await VerificationCode.findOneAndUpdate(
      { email, type },
      { code, createdAt: new Date() },
      { upsert: true, new: true }
    );

    // 發送驗證信函
    const emailResult = await sendVerificationEmail(email, code, type);

    res.json({
      status: "success",
      message: "驗證碼已成功發送至您的電子信箱，請於 10 分鐘內完成驗證",
      mode: emailResult.mode,
      devCode: emailResult.devCode || undefined
    });
  } catch (err) {
    console.error('[EmailVerification] Send code error:', err.message);
    res.status(500).json({ status: "fail", message: "發送驗證碼失敗，請稍後再試" });
  }
});

/**
 * POST /users/verify-code
 * 驗證輸入之 6 位數信箱驗證碼
 */
router.post('/verify-code', authRateLimiter, async (req, res) => {
  try {
    const email = toSafeString(req.body.email, 120).toLowerCase();
    const code = toSafeString(req.body.code, 10).trim();
    const type = req.body.type || 'signup';

    if (!email || !code) {
      return res.status(400).json({ status: "fail", message: "請輸入電子信箱與驗證碼" });
    }

    const record = await VerificationCode.findOne({ email, code, type }).exec();
    if (!record) {
      return res.status(400).json({ status: "fail", message: "驗證碼不正確或已過期，請重新獲取" });
    }

    res.json({
      status: "success",
      message: "電子信箱驗證成功！"
    });
  } catch (err) {
    console.error('[EmailVerification] Verify error:', err.message);
    res.status(500).json({ status: "fail", message: "驗證過程發生異常" });
  }
});

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
 * 註冊新會員 (附帶信箱驗證碼校驗、暴力註冊頻率限制與資料型別校驗)
 */
router.post('/user', authRateLimiter, async (req, res) => {
  try {
    let target = req.body.user;
    const verificationCode = toSafeString(req.body.verificationCode, 10).trim();

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

    // 若有提供 verificationCode，進行嚴格核對並標註 isVerified
    if (verificationCode) {
      const codeRecord = await VerificationCode.findOne({ email, code: verificationCode, type: 'signup' }).exec();
      if (!codeRecord) {
        return res.status(400).json({ status: "fail", message: "電子信箱驗證碼錯誤或已過期，請重新確認" });
      }
      target.isVerified = true;
      // 成功後銷毀已使用之驗證碼
      await VerificationCode.deleteOne({ _id: codeRecord._id }).catch(() => {});
    } else {
      target.isVerified = false;
    }

    const newUser = new User(target);
    const savedUser = await newUser.save();
    
    // 遮蔽密碼再返回給前端
    const safeUser = savedUser.toObject();
    delete safeUser.password;

    res.json({
      status: "success",
      message: target.isVerified ? "帳號註冊且信箱驗證成功！" : "帳號註冊成功",
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
