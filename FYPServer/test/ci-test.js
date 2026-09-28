/**
 * CI/CD Smoke & Integration Test Suite
 */
const mongoose = require('mongoose');
const { cleanNoSql, sanitizeXss, toSafeString } = require('../helper/securityShield');

async function runTests() {
  console.log('🧪 Starting CI/CD Smoke & Quality Tests...');

  // 1. NoSQL Injection 防禦模組測試
  console.log('▶ [Test 1] NoSQL Injection Sanitizer Verification');
  const attackObj = {
    $gt: '',
    $ne: null,
    validField: 'safe text',
    nested: {
      $regex: '.*',
      normal: 'ok'
    }
  };
  const sanitized = cleanNoSql(attackObj);
  if (sanitized.$gt !== undefined || sanitized.$ne !== undefined) {
    throw new Error('❌ Test Failed: Root operator $gt/$ne was not removed!');
  }
  if (sanitized.nested.$regex !== undefined) {
    throw new Error('❌ Test Failed: Nested operator $regex was not removed!');
  }
  if (sanitized.validField !== 'safe text' || sanitized.nested.normal !== 'ok') {
    throw new Error('❌ Test Failed: Legitimate fields were improperly altered!');
  }
  console.log('  ✅ NoSQL Sanitizer passed all assertions.');

  // 2. XSS 防禦模組測試
  console.log('▶ [Test 2] XSS Sanitizer Verification');
  const rawXss = '<script>alert("xss")</script><img src=x onerror=alert(1)>';
  const cleanXss = sanitizeXss(rawXss);
  if (cleanXss.includes('<script>') || cleanXss.includes('onerror=')) {
    throw new Error('❌ Test Failed: Malicious script or event handler was not escaped/stripped!');
  }
  console.log('  ✅ XSS Sanitizer passed all assertions.');

  // 3. 型別安全校驗測試
  console.log('▶ [Test 3] Type Safety Sanitizer Verification');
  if (toSafeString({ malicious: true }) !== '') {
    throw new Error('❌ Test Failed: Object was not rejected by toSafeString!');
  }
  if (toSafeString('  admin  ') !== 'admin') {
    throw new Error('❌ Test Failed: String was not properly trimmed!');
  }
  console.log('  ✅ Type Safety passed all assertions.');

  // 4. 信箱驗證服務模組測試
  console.log('▶ [Test 4] Email Verification & OTP Generator Test');
  const { generateOtp, renderEmailTemplate } = require('../helper/emailService');
  const testOtp = generateOtp(6);
  if (!testOtp || testOtp.length !== 6 || isNaN(Number(testOtp))) {
    throw new Error('❌ Test Failed: Invalid OTP generated!');
  }
  const emailHtml = renderEmailTemplate(testOtp, 'signup');
  if (!emailHtml.includes(testOtp)) {
    throw new Error('❌ Test Failed: OTP missing in rendered email HTML template!');
  }
  console.log(`  ✅ OTP generation & template rendering passed (Generated: ${testOtp}).`);

  // 5. 資料庫連線測試 (若提供 MONGODB_URI)
  const mongoUri = process.env.MONGODB_URI;
  if (mongoUri) {
    console.log(`▶ [Test 5] Database Connectivity to ${mongoUri.replace(/\/\/.*@/, '//***@')}`);
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 5000 });
    console.log('  ✅ MongoDB connection succeeded.');
    await mongoose.disconnect();
  } else {
    console.log('▶ [Test 5] Skipped (No MONGODB_URI provided in this environment).');
  }

  console.log('🎉 All CI/CD Smoke Tests Passed Successfully!\n');
}

runTests()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('\n❌ CI/CD Test Failure:', err);
    process.exit(1);
  });
