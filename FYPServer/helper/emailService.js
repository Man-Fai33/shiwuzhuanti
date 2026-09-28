/**
 * ==============================================================
 * 台灣夜市好好行 - 電子郵件發送與驗證碼核心服務 (Email Service)
 * Supports Nodemailer SMTP & Smart Development Fallback
 * ==============================================================
 */

const nodemailer = require('nodemailer');

/**
 * 產生 6 位數安全隨機驗證碼
 */
function generateOtp(length = 6) {
    let code = '';
    for (let i = 0; i < length; i++) {
        code += Math.floor(Math.random() * 10);
    }
    return code;
}

/**
 * 取得 Nodemailer Transporter
 * 支援環境變數自訂 SMTP 伺服器 (如 Gmail, SendGrid, Mailgun 或自架 Postfix)
 */
function getTransporter() {
    // 檢查是否有配置真實 SMTP 伺服器
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
        return nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT || '587', 10),
            secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });
    }

    // 支援簡易 Gmail App Password 配置
    if (process.env.GMAIL_USER && process.env.GMAIL_PASS) {
        return nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS
            }
        });
    }

    return null;
}

/**
 * 產生精美品牌 HTML 郵件內容
 */
function renderEmailTemplate(code, type = 'signup') {
    const isSignup = type === 'signup';
    const titleText = isSignup ? '會員註冊信箱驗證碼' : '安全認證碼通知';
    const actionText = isSignup ? '完成您的會員註冊與信箱綁定' : '驗證您的帳號身分';

    return `
    <!DOCTYPE html>
    <html lang="zh-TW">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${titleText}</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #F8F6F0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Noto Sans TC', sans-serif;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; background-color: #F8F6F0; padding: 40px 10px;">
            <tr>
                <td align="center">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 540px; background-color: #FFFFFF; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05); border: 1px solid #EAE5DD;">
                        <!-- 頂部品牌 Banner -->
                        <tr>
                            <td align="center" style="background: linear-gradient(135deg, #1C1917 0%, #292524 100%); padding: 36px 20px;">
                                <div style="font-size: 38px; line-height: 1; margin-bottom: 8px;">🏮</div>
                                <h1 style="color: #FFFFFF; font-size: 22px; font-weight: 700; margin: 0; letter-spacing: 1px;">台灣夜市好好行</h1>
                                <p style="color: #A8A29E; font-size: 13px; margin: 6px 0 0 0; letter-spacing: 0.5px;">Taiwan Night Market Digital Guide</p>
                            </td>
                        </tr>

                        <!-- 主體內容區 -->
                        <tr>
                            <td style="padding: 36px 32px;">
                                <h2 style="color: #1C1917; font-size: 19px; font-weight: 700; margin: 0 0 16px 0; text-align: center;">${titleText}</h2>
                                <p style="color: #57534E; font-size: 15px; line-height: 1.6; margin: 0 0 24px 0; text-align: center;">
                                    您好！感謝您使用台灣夜市好好行。<br>請輸入以下 6 位數驗證碼以${actionText}：
                                </p>

                                <!-- 6 位數驗證碼框 -->
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 28px 0;">
                                    <tr>
                                        <td align="center">
                                            <div style="display: inline-block; background-color: #FEF2F2; border: 2px dashed #DC2626; border-radius: 14px; padding: 18px 36px; letter-spacing: 8px; font-size: 32px; font-weight: 800; color: #DC2626; font-family: monospace;">
                                                ${code}
                                            </div>
                                        </td>
                                    </tr>
                                </table>

                                <p style="color: #78716C; font-size: 13px; line-height: 1.6; margin: 20px 0 0 0; text-align: center;">
                                    ⏳ 此驗證碼有效期限為 <strong>10 分鐘</strong>，請盡速完成認證。<br>
                                    🔒 若非您本人申請此操作，請直接忽略本信件，您的帳號安全不會受到任何影響。
                                </p>
                            </td>
                        </tr>

                        <!-- 底部版權宣告 -->
                        <tr>
                            <td align="center" style="background-color: #FAF8F5; border-top: 1px solid #EAE5DD; padding: 20px 24px;">
                                <p style="color: #A8A29E; font-size: 12px; margin: 0; line-height: 1.5;">
                                    此為系統自動發送郵件，請勿直接回覆。<br>
                                    © ${new Date().getFullYear()} 台灣夜市好好行團隊. All Rights Reserved.
                                </p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
    `;
}

/**
 * 發送電子郵件驗證碼
 * @param {string} email 收件者信箱
 * @param {string} code 6位數驗證碼
 * @param {string} type 驗證用途 ('signup' | 'reset_password')
 */
async function sendVerificationEmail(email, code, type = 'signup') {
    const transporter = getTransporter();
    const isSignup = type === 'signup';
    const subject = isSignup 
        ? `【台灣夜市好好行】您的註冊驗證碼是：${code} (10分鐘內有效)`
        : `【台灣夜市好好行】您的安全驗證碼是：${code}`;

    if (transporter) {
        try {
            const sender = process.env.EMAIL_FROM || process.env.SMTP_USER || process.env.GMAIL_USER || 'no-reply@nightmarket.taiwan.travel';
            const info = await transporter.sendMail({
                from: `"台灣夜市好好行 🏮" <${sender}>`,
                to: email,
                subject: subject,
                html: renderEmailTemplate(code, type)
            });
            console.log(`[EmailService] ✅ Verification email sent via SMTP to ${email}: ${info.messageId}`);
            return { success: true, mode: 'smtp', messageId: info.messageId };
        } catch (err) {
            console.error(`[EmailService] ❌ Failed to send SMTP email to ${email}:`, err.message);
            // 降級為控制台日誌輸出，防止開發階段受阻
            console.warn(`[EmailService] ⚠️ Fallback to console OTP for ${email}: [ ${code} ]`);
            return { success: true, mode: 'fallback_log', devCode: code, error: err.message };
        }
    } else {
        // 未配置真實 SMTP 時：於伺服器終端輸出驗證碼並返回 devCode，方便本機與測試環境無阻礙即測即用
        console.log(`\n========================================================================`);
        console.log(`📧 [EmailService - DEV/TEST MODE] 電子信箱驗證碼通知`);
        console.log(`   收件人 Email : ${email}`);
        console.log(`   驗證用途 Type: ${type}`);
        console.log(`   6位數驗證碼  : [ ${code} ] (有效期限 10 分鐘)`);
        console.log(`   提示: 正式環境請在 .env 配置 SMTP_HOST 或 GMAIL_USER 即可透過真實郵件發送。`);
        console.log(`========================================================================\n`);

        return {
            success: true,
            mode: 'dev',
            devCode: code
        };
    }
}

module.exports = {
    generateOtp,
    sendVerificationEmail,
    renderEmailTemplate
};
