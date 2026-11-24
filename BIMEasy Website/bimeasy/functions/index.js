const { onRequest } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const crypto = require("crypto");
const Razorpay = require("razorpay");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

admin.initializeApp();

const JWT_SECRET = process.env.ADMIN_JWT_SECRET || "bimeasy-super-admin-secret-key-2024";

/**
 * Verify admin JWT token from Authorization header.
 * Returns decoded payload or null.
 */
function verifyAdminToken(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) return null;
  try {
    return jwt.verify(authHeader.split(" ")[1], JWT_SECRET);
  } catch {
    return null;
  }
}

const RAZORPAY_WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET || "YOUR_TEST_SECRET";

// ============================================
// GoDaddy Workspace Email SMTP Transporter
// ============================================
const transporter = nodemailer.createTransport({
  host: "smtpout.secureserver.net",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER || process.env.GMAIL_USER || "info@bimeasy.in",
    pass: process.env.EMAIL_PASSWORD || process.env.GMAIL_APP_PASSWORD || "YOUR_PASSWORD",
  },
  tls: {
    ciphers: "SSLv3"
  }
});

/**
 * Sends the welcome/onboarding email to a new BIMEasy customer.
 */
async function sendWelcomeEmail({ to, customerName, tempPassword, seats, passwordResetLink }) {
  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#f4f6f9;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f9;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #1a365d 0%, #2c5282 50%, #3182ce 100%); padding:40px 40px 30px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <h1 style="color:#ffffff;font-size:28px;margin:0;font-weight:700;letter-spacing:-0.5px;">
                      🏗️ BIMEasy
                    </h1>
                    <p style="color:rgba(255,255,255,0.85);font-size:14px;margin:8px 0 0;">
                      Revit Productivity Suite
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Welcome Message -->
          <tr>
            <td style="padding:36px 40px 0;">
              <h2 style="color:#1a365d;font-size:22px;margin:0 0 8px;font-weight:700;">
                Welcome aboard, ${customerName || "there"}! 🎉
              </h2>
              <p style="color:#4a5568;font-size:15px;line-height:1.7;margin:0;">
                Thank you for purchasing <strong>BIMEasy</strong>. Your license has been activated and your account is ready to use.
              </p>
            </td>
          </tr>

          <!-- License Details -->
          <tr>
            <td style="padding:28px 40px 0;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#ebf4ff;border-radius:12px;border:1px solid #bee3f8;">
                <tr>
                  <td style="padding:24px;">
                    <p style="color:#2c5282;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:1px;margin:0 0 16px;">
                      📋 Your License Details
                    </p>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="color:#4a5568;font-size:14px;padding:6px 0;border-bottom:1px solid #bee3f8;" width="40%"><strong>User ID (Email)</strong></td>
                        <td style="color:#1a365d;font-size:14px;padding:6px 0;border-bottom:1px solid #bee3f8;font-weight:600;">${to}</td>
                      </tr>
                      <tr>
                        <td style="color:#4a5568;font-size:14px;padding:6px 0;border-bottom:1px solid #bee3f8;"><strong>Temporary Password</strong></td>
                        <td style="font-family:monospace;font-size:16px;color:#e53e3e;padding:6px 0;border-bottom:1px solid #bee3f8;font-weight:700;letter-spacing:2px;">${tempPassword}</td>
                      </tr>
                      <tr>
                        <td style="color:#4a5568;font-size:14px;padding:6px 0;"><strong>Seats Purchased</strong></td>
                        <td style="color:#1a365d;font-size:14px;padding:6px 0;font-weight:600;">${seats} seat(s)</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Getting Started Steps -->
          <tr>
            <td style="padding:28px 40px 0;">
              <h3 style="color:#1a365d;font-size:16px;margin:0 0 16px;font-weight:700;">
                🚀 Getting Started
              </h3>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:10px 0;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="background-color:#3182ce;color:#fff;font-size:13px;font-weight:700;width:28px;height:28px;border-radius:50%;text-align:center;line-height:28px;" width="28">1</td>
                        <td style="padding-left:14px;color:#4a5568;font-size:14px;line-height:1.6;">
                          <strong>Download BIMEasy</strong> from <a href="https://bimeasy.in" style="color:#3182ce;text-decoration:none;">bimeasy.in</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="background-color:#3182ce;color:#fff;font-size:13px;font-weight:700;width:28px;height:28px;border-radius:50%;text-align:center;line-height:28px;" width="28">2</td>
                        <td style="padding-left:14px;color:#4a5568;font-size:14px;line-height:1.6;">
                          <strong>Open Revit</strong> → Click <strong>"Manage License"</strong> in the BIMEasy ribbon tab
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="background-color:#3182ce;color:#fff;font-size:13px;font-weight:700;width:28px;height:28px;border-radius:50%;text-align:center;line-height:28px;" width="28">3</td>
                        <td style="padding-left:14px;color:#4a5568;font-size:14px;line-height:1.6;">
                          <strong>Login</strong> with your email and the temporary password above
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="background-color:#3182ce;color:#fff;font-size:13px;font-weight:700;width:28px;height:28px;border-radius:50%;text-align:center;line-height:28px;" width="28">4</td>
                        <td style="padding-left:14px;color:#4a5568;font-size:14px;line-height:1.6;">
                          <strong>Change your password</strong> when prompted on first login
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Action Buttons -->
          <tr>
            <td style="padding:28px 40px 0;" align="center">
              <a href="https://bimeasy.in/BIMEasy_Setup_V1.0.exe" style="display:inline-block;background:linear-gradient(135deg,#3182ce,#2c5282);color:#ffffff;text-decoration:none;font-size:15px;font-weight:700;padding:14px 36px;border-radius:10px;letter-spacing:0.5px;margin-bottom:16px;">
                Download Plugin ↓
              </a>
              <br>
              <a href="${passwordResetLink}" style="display:inline-block;background:#edf2f7;color:#4a5568;text-decoration:none;font-size:14px;font-weight:600;padding:12px 28px;border-radius:8px;letter-spacing:0.5px;">
                Set Your Password Now →
              </a>
              <p style="color:#a0aec0;font-size:12px;margin:16px 0 0;">
                Or use the temporary password above to login via the Revit plugin
              </p>
            </td>
          </tr>

          <!-- Important Note -->
          <tr>
            <td style="padding:28px 40px 0;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#fefcbf;border-radius:10px;border:1px solid #ecc94b;">
                <tr>
                  <td style="padding:16px 20px;">
                    <p style="color:#744210;font-size:13px;margin:0;line-height:1.6;">
                      ⚠️ <strong>Important:</strong> This email ID (<strong>${to}</strong>) is your User ID for the BIMEasy plugin. Please keep it safe. Your license is locked to the first ${seats} machine(s) that login with this account.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:36px 40px;border-top:1px solid #e2e8f0;margin-top:28px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <p style="color:#a0aec0;font-size:12px;margin:0;line-height:1.7;">
                      Need help? Reply to this email or visit 
                      <a href="https://bimeasy.in" style="color:#3182ce;text-decoration:none;">bimeasy.in</a>
                    </p>
                    <p style="color:#cbd5e0;font-size:11px;margin:8px 0 0;">
                      © ${new Date().getFullYear()} BIMEasy · Revit Productivity Suite
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const mailOptions = {
    from: '"BIMEasy" <info@bimeasy.in>',
    to: to,
    subject: "🎉 Welcome to BIMEasy — Your License is Ready!",
    html: htmlBody,
  };

  await transporter.sendMail(mailOptions);
  console.log(`✅ Welcome email sent to ${to}`);
}

/**
 * Sends the download link email to a new download lead.
 */
async function sendDownloadEmail({ to, customerName }) {
  const downloadLink = "https://bimeasy.in/BIMEasy_Setup_V1.0.exe";

  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#f4f6f9;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f9;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #1a365d 0%, #2c5282 50%, #3182ce 100%); padding:40px 40px 30px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <h1 style="color:#ffffff;font-size:28px;margin:0;font-weight:700;letter-spacing:-0.5px;">
                      🏗️ BIMEasy
                    </h1>
                    <p style="color:rgba(255,255,255,0.85);font-size:14px;margin:8px 0 0;">
                      Revit Productivity Suite
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Welcome Message -->
          <tr>
            <td style="padding:36px 40px 0;">
              <h2 style="color:#1a365d;font-size:22px;margin:0 0 8px;font-weight:700;">
                Hi ${customerName || "there"}! 👋
              </h2>
              <p style="color:#4a5568;font-size:15px;line-height:1.7;margin:0;">
                Thank you for your interest in <strong>BIMEasy</strong>. Your download link is ready! Follow the steps below to get started with your <strong>14-day free trial</strong>.
              </p>
            </td>
          </tr>

          <!-- Getting Started Steps -->
          <tr>
            <td style="padding:28px 40px 0;">
              <h3 style="color:#1a365d;font-size:16px;margin:0 0 16px;font-weight:700;">
                🚀 Getting Started
              </h3>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:10px 0;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="background-color:#3182ce;color:#fff;font-size:13px;font-weight:700;width:28px;height:28px;border-radius:50%;text-align:center;line-height:28px;" width="28">1</td>
                        <td style="padding-left:14px;color:#4a5568;font-size:14px;line-height:1.6;">
                          <strong>Download BIMEasy</strong> from the button below
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="background-color:#3182ce;color:#fff;font-size:13px;font-weight:700;width:28px;height:28px;border-radius:50%;text-align:center;line-height:28px;" width="28">2</td>
                        <td style="padding-left:14px;color:#4a5568;font-size:14px;line-height:1.6;">
                          <strong>Install the Plugin</strong> on your computer
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="background-color:#3182ce;color:#fff;font-size:13px;font-weight:700;width:28px;height:28px;border-radius:50%;text-align:center;line-height:28px;" width="28">3</td>
                        <td style="padding-left:14px;color:#4a5568;font-size:14px;line-height:1.6;">
                          <strong>Open Revit</strong> → Click <strong>"Manage License"</strong> in the BIMEasy ribbon tab
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="background-color:#3182ce;color:#fff;font-size:13px;font-weight:700;width:28px;height:28px;border-radius:50%;text-align:center;line-height:28px;" width="28">4</td>
                        <td style="padding-left:14px;color:#4a5568;font-size:14px;line-height:1.6;">
                          Click on <strong>Start 14 Days Free Trial</strong>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Download Button -->
          <tr>
            <td style="padding:28px 40px 0;" align="center">
              <a href="${downloadLink}" style="display:inline-block;background:linear-gradient(135deg,#3182ce,#2c5282);color:#ffffff;text-decoration:none;font-size:15px;font-weight:700;padding:14px 36px;border-radius:10px;letter-spacing:0.5px;">
                Download Plugin →
              </a>
            </td>
          </tr>

          <!-- Important Note -->
          <tr>
            <td style="padding:28px 40px 0;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#ebf4ff;border-radius:10px;border:1px solid #bee3f8;">
                <tr>
                  <td style="padding:16px 20px;">
                    <p style="color:#2c5282;font-size:13px;margin:0;line-height:1.6;">
                      💡 <strong>Note:</strong> This download link gives you access to a <strong>14-day free trial</strong>. No login required during the trial period. After the trial, you can purchase a license from <a href="https://bimeasy.in/pricing" style="color:#3182ce;text-decoration:none;">bimeasy.in/pricing</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:36px 40px;border-top:1px solid #e2e8f0;margin-top:28px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <p style="color:#a0aec0;font-size:12px;margin:0;line-height:1.7;">
                      Need help? Reply to this email or visit 
                      <a href="https://bimeasy.in" style="color:#3182ce;text-decoration:none;">bimeasy.in</a>
                    </p>
                    <p style="color:#cbd5e0;font-size:11px;margin:8px 0 0;">
                      © ${new Date().getFullYear()} BIMEasy · Revit Productivity Suite
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const mailOptions = {
    from: '"BIMEasy" <info@bimeasy.in>',
    to: to,
    subject: "🏗️ Your BIMEasy Download Link is Ready!",
    html: htmlBody,
  };

  await transporter.sendMail(mailOptions);
  console.log(`✅ Download email sent to ${to}`);
}

/**
 * Sends a forgot password email.
 */
async function sendForgotPasswordEmail({ to, customerName, passwordResetLink }) {
  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#f4f6f9;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f9;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #1a365d 0%, #2c5282 50%, #3182ce 100%); padding:40px 40px 30px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <h1 style="color:#ffffff;font-size:28px;margin:0;font-weight:700;letter-spacing:-0.5px;">
                      🏗️ BIMEasy
                    </h1>
                    <p style="color:rgba(255,255,255,0.85);font-size:14px;margin:8px 0 0;">
                      Password Reset Request
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Welcome Message -->
          <tr>
            <td style="padding:36px 40px 0;">
              <h2 style="color:#1a365d;font-size:22px;margin:0 0 8px;font-weight:700;">
                Hi ${customerName || "there"},
              </h2>
              <p style="color:#4a5568;font-size:15px;line-height:1.7;margin:0;">
                We received a request to reset the password for your BIMEasy account associated with <strong>${to}</strong>. 
                Click the button below to choose a new password.
              </p>
            </td>
          </tr>

          <!-- Reset Button -->
          <tr>
            <td style="padding:36px 40px 0;" align="center">
              <a href="${passwordResetLink}" style="display:inline-block;background:linear-gradient(135deg,#3182ce,#2c5282);color:#ffffff;text-decoration:none;font-size:15px;font-weight:700;padding:14px 36px;border-radius:10px;letter-spacing:0.5px;">
                Reset Password →
              </a>
              <p style="color:#a0aec0;font-size:12px;margin:16px 0 0;">
                If you didn't request a password reset, you can safely ignore this email.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:36px 40px;border-top:1px solid #e2e8f0;margin-top:28px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <p style="color:#a0aec0;font-size:12px;margin:0;line-height:1.7;">
                      Need help? Reply to this email or visit 
                      <a href="https://bimeasy.in" style="color:#3182ce;text-decoration:none;">bimeasy.in</a>
                    </p>
                    <p style="color:#cbd5e0;font-size:11px;margin:8px 0 0;">
                      © ${new Date().getFullYear()} BIMEasy · Revit Productivity Suite
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const mailOptions = {
    from: '"BIMEasy" <info@bimeasy.in>',
    to: to,
    subject: "🔐 Reset your BIMEasy password",
    html: htmlBody,
  };

  await transporter.sendMail(mailOptions);
  console.log(`✅ Forgot password email sent to ${to}`);
}

// ============================================
// TRIGGER FORGOT PASSWORD EMAIL
// ============================================
exports.triggerForgotPasswordEmail = onRequest(
  { cors: true, region: "us-central1" },
  async (req, res) => {
    if (req.method !== "POST" && req.method !== "OPTIONS") return res.status(405).send("Method Not Allowed");

    try {
      const { email } = req.body;
      if (!email) return res.status(400).json({ error: "Missing email" });

      let passwordResetLink;
      let customerName = "there";
      try {
        const userRecord = await admin.auth().getUserByEmail(email);
        customerName = userRecord.displayName || "there";
        passwordResetLink = await admin.auth().generatePasswordResetLink(email);
      } catch (err) {
        if (err.code === "auth/user-not-found") {
          return res.status(404).json({ error: "User not found" });
        }
        throw err;
      }

      await sendForgotPasswordEmail({
        to: email,
        customerName: customerName,
        passwordResetLink: passwordResetLink
      });

      return res.status(200).json({ success: true });
    } catch (error) {
      console.error("Forgot password error:", error);
      return res.status(500).json({ error: error.message });
    }
  }
);

// ============================================
// WEBHOOK: Razorpay payment.captured handler
// User provisioning happens HERE — after confirmed payment
// ============================================
exports.razorpayWebhook = onRequest(
  { cors: true, region: "us-central1" },
  async (req, res) => {
    try {
      // 1. Verify Signature
      const signature = req.headers["x-razorpay-signature"];
      const bodyString = req.rawBody.toString();

      const expectedSignature = crypto
        .createHmac("sha256", RAZORPAY_WEBHOOK_SECRET)
        .update(bodyString)
        .digest("hex");

      if (expectedSignature !== signature) {
        console.warn("Invalid Razorpay webhook signature.");
        return res.status(400).send("Invalid signature");
      }

      const payload = req.body.payload;

      if (req.body.event === "payment.captured" || req.body.event === "order.paid") {
        const paymentEntity = payload.payment.entity;

        // 2. Extract Data
        const email = paymentEntity.email || paymentEntity.notes?.email;
        const quantity = parseInt(paymentEntity.notes?.quantity || "1", 10);
        const yearsStr = paymentEntity.notes?.years || "1";
        const yearsNum = parseInt(yearsStr, 10) || 1;
        const customerName = paymentEntity.notes?.name || "";
        const phone = paymentEntity.notes?.phone || "";
        const company = paymentEntity.notes?.company || "";
        const role = paymentEntity.notes?.role || "";
        const country = paymentEntity.notes?.country || "";

        if (!email) {
          throw new Error("No email associated with payment.");
        }

        console.log(`Processing volume license for ${email} with ${quantity} seat(s) for ${yearsNum} year(s).`);

        await provisionUserAccount({
          email, quantity, yearsNum, customerName, phone, company, role, country
        });

        return res.status(200).send("Webhook processed successfully");
      }

      // Ignore other events
      return res.status(200).send("Event ignored");

    } catch (error) {
      console.error("Error processing Razorpay webhook:", error);
      return res.status(500).send("Internal Server Error");
    }
  }
);

// ============================================
// Core User Provisioning Logic
// ============================================
async function provisionUserAccount({ email, quantity, yearsNum, customerName, phone, company, role, country }) {
  let userRecord;
  let tempPassword = "";
  let passwordResetLink;

  // Provision User
  try {
    userRecord = await admin.auth().getUserByEmail(email);
    console.log("User already exists, processing upgrade/addition...");
    passwordResetLink = await admin.auth().generatePasswordResetLink(email);
  } catch (error) {
    if (error.code === "auth/user-not-found") {
      tempPassword = crypto.randomBytes(4).toString('hex');
      userRecord = await admin.auth().createUser({
        email: email,
        password: tempPassword,
        displayName: customerName,
        emailVerified: false,
      });
      console.log(`Created new Firebase Auth user: ${userRecord.uid}`);
      passwordResetLink = await admin.auth().generatePasswordResetLink(email);
    } else {
      throw error;
    }
  }

  const uid = userRecord.uid;

  // Provision License (Firestore)
  const db = admin.firestore();
  const licenseRef = db.collection("licenses").doc(uid);

  let expiresAt = admin.firestore.Timestamp.fromDate(new Date(Date.now() + yearsNum * 365 * 24 * 60 * 60 * 1000));

  await licenseRef.set({
    email: email,
    maxSeats: quantity,
    isActive: true,
    expiresAt: expiresAt
  }, { merge: true });

  const docSnap = await licenseRef.get();
  if (!docSnap.data().registeredMachines) {
    await licenseRef.update({ registeredMachines: [] });
  }

  // Save user profile
  await db.collection('userProfiles').doc(uid).set({
    forcePasswordReset: true,
    fullName: customerName,
    phone: phone,
    company: company,
    role: role,
    country: country,
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  }, { merge: true });

  // Send Welcome Email
  try {
    await sendWelcomeEmail({
      to: email,
      customerName: customerName,
      tempPassword: tempPassword || "(Use your existing password)",
      seats: quantity,
      passwordResetLink: passwordResetLink || "https://bimeasy.in"
    });
  } catch (emailError) {
    console.error("⚠️ Failed to send welcome email:", emailError.message);
  }
}

// ============================================
// ORDER CREATION: Called from frontend checkout
// Only creates a Razorpay order — NO Firebase Auth calls here
// User provisioning happens in the webhook after payment
// ============================================
exports.createRazorpayOrder = onRequest(
  { cors: true, region: "us-central1" },
  async (req, res) => {
    if (req.method !== "POST") {
      return res.status(405).send("Method Not Allowed");
    }

    try {
      const { email, name, phone, seats, years, coupon, company, role, country } = req.body;

      if (!email || !seats) {
        return res.status(400).json({ error: "Missing required fields: email or seats" });
      }

      // Create Razorpay Order — user provisioning will happen via webhook after payment
      const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
      });

      // Price: ₹3,999 per seat per year. 
      const baseAmountPerSeat = 3999;
      const yearsNum = parseInt(years, 10) || 1;
      let totalAmountInRupees = baseAmountPerSeat * parseInt(seats, 10) * yearsNum;

      // Basic Coupon Logic 
      let discountFactor = 1.0;
      if (coupon && typeof coupon === "string") {
        const c = coupon.trim().toUpperCase();
        if (c === "SVBIM100") discountFactor = 0.00; // 100% discount
        else if (c === "SVBIM75") discountFactor = 0.25; // 75% discount
        else if (c === "SVBIM50") discountFactor = 0.50; // 50% discount
      }
      
      const discountedAmountInRupees = Math.round(totalAmountInRupees * discountFactor);
      const totalAmountPaise = discountedAmountInRupees * 100; // Razorpay expects amount in paise

      // If the discount is 100%, we bypass Razorpay and provision immediately
      if (totalAmountPaise === 0) {
        console.log(`100% discount applied for ${email}. Bypassing Razorpay and provisioning immediately.`);
        await provisionUserAccount({
          email, 
          quantity: parseInt(seats, 10), 
          yearsNum, 
          customerName: name, 
          phone, 
          company: company || "", 
          role: role || "", 
          country: country || ""
        });
        return res.status(200).json({ free: true });
      }

      const orderOptions = {
        amount: totalAmountPaise,
        currency: "INR",
        receipt: `rcpt_${Date.now()}`,
        notes: {
          email: email,
          name: name,
          phone: phone,
          quantity: String(seats),
          years: String(yearsNum),
          coupon: coupon || "",
          company: company || "",
          role: role || "",
          country: country || ""
        }
      };

      const order = await razorpay.orders.create(orderOptions);

      // Return order to frontend
      return res.status(200).json({
        id: order.id,
        amount: order.amount,
        currency: order.currency
      });

    } catch (error) {
      console.error("Error creating order:", error);
      return res.status(500).json({ error: error.message });
    }
  }
);

// ============================================
// SAVE DOWNLOAD LEAD: Called from download page
// Saves lead + sends download link email
// ============================================
exports.saveDownloadLead = onRequest(
  { cors: true, region: "us-central1" },
  async (req, res) => {
    if (req.method !== "POST") {
      return res.status(405).send("Method Not Allowed");
    }

    try {
      const { name, phone, email, role, country, agreed } = req.body;

      if (!email || !name) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const db = admin.firestore();
      
      await db.collection('downloadLeads').add({
        name,
        phone,
        email,
        role,
        country,
        agreed,
        timestamp: admin.firestore.FieldValue.serverTimestamp()
      });

      // Send download link email
      try {
        await sendDownloadEmail({ to: email, customerName: name });
        console.log(`✅ Download email sent to ${email}`);
      } catch (emailError) {
        console.error("⚠️ Failed to send download email:", emailError.message);
      }

      return res.status(200).json({ success: true });
    } catch (error) {
      console.error("Error saving lead:", error);
      return res.status(500).json({ error: error.message });
    }
  }
);

// ============================================
// SUPER ADMIN: Login
// ============================================
exports.adminLogin = onRequest(
  { cors: true, region: "us-central1" },
  async (req, res) => {
    if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

    try {
      const { userId, password } = req.body;
      if (!userId || !password) {
        return res.status(400).json({ error: "Missing userId or password" });
      }

      const db = admin.firestore();
      const snap = await db.collection("superAdminCredentials").where("userId", "==", userId).limit(1).get();
      
      if (snap.empty) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const adminDoc = snap.docs[0];
      const data = adminDoc.data();
      const valid = await bcrypt.compare(password, data.passwordHash);
      
      if (!valid) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const token = jwt.sign(
        { uid: adminDoc.id, userId: data.userId, name: data.name || "Admin" },
        JWT_SECRET,
        { expiresIn: "24h" }
      );

      return res.status(200).json({ 
        token, 
        name: data.name || "Admin",
        role: data.role || "System Oversight"
      });

    } catch (error) {
      console.error("Admin login error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
);

// ============================================
// SUPER ADMIN: Get Summary / Dashboard Metrics
// ============================================
exports.adminGetSummary = onRequest(
  { cors: true, region: "us-central1" },
  async (req, res) => {
    const decoded = verifyAdminToken(req);
    if (!decoded) return res.status(401).json({ error: "Unauthorized" });

    try {
      const db = admin.firestore();

      // Total download leads
      const downloadsSnap = await db.collection("downloadLeads").get();
      const totalDownloads = downloadsSnap.size;

      // Total purchased users (licenses)
      const licensesSnap = await db.collection("licenses").get();
      const totalLicenses = licensesSnap.size;
      let activeLicenses = 0;
      let totalSeats = 0;
      licensesSnap.forEach(doc => {
        const d = doc.data();
        if (d.isActive) activeLicenses++;
        totalSeats += (d.maxSeats || 0);
      });

      // Total user profiles
      const profilesSnap = await db.collection("userProfiles").get();
      const totalProfiles = profilesSnap.size;

      // Total free trials
      const trialsSnap = await db.collection("trials").get();
      const totalTrials = trialsSnap.size;
      let activeTrials = 0;
      let expiredTrials = 0;
      const now = new Date();
      trialsSnap.forEach(doc => {
        const d = doc.data();
        const expiry = d.trialExpiry ? d.trialExpiry.toDate() : null;
        if (expiry && expiry > now) activeTrials++;
        else expiredTrials++;
      });

      // Recent downloads (last 10)
      const recentDownloads = [];
      const rdSnap = await db.collection("downloadLeads").orderBy("timestamp", "desc").limit(10).get();
      rdSnap.forEach(doc => {
        recentDownloads.push({ id: doc.id, ...doc.data() });
      });

      // Recent purchases (last 10)
      const recentPurchases = [];
      const rpSnap = await db.collection("userProfiles").orderBy("createdAt", "desc").limit(10).get();
      rpSnap.forEach(doc => {
        recentPurchases.push({ id: doc.id, ...doc.data() });
      });

      // Recent free trials (last 10)
      const recentTrials = [];
      const rtSnap = await db.collection("trials").orderBy("trialStart", "desc").limit(10).get();
      rtSnap.forEach(doc => {
        const d = doc.data();
        recentTrials.push({
          id: doc.id,
          email: d.email || "",
          userName: d.userName || "",
          trialStart: d.trialStart ? d.trialStart.toDate().toISOString() : null,
          trialExpiry: d.trialExpiry ? d.trialExpiry.toDate().toISOString() : null
        });
      });

      return res.status(200).json({
        totalDownloads,
        totalLicenses,
        activeLicenses,
        totalSeats,
        totalProfiles,
        totalTrials,
        activeTrials,
        expiredTrials,
        recentDownloads,
        recentPurchases,
        recentTrials
      });

    } catch (error) {
      console.error("Admin summary error:", error);
      return res.status(500).json({ error: error.message });
    }
  }
);

// ============================================
// SUPER ADMIN: Get Download Leads (paginated)
// ============================================
exports.adminGetDownloads = onRequest(
  { cors: true, region: "us-central1" },
  async (req, res) => {
    const decoded = verifyAdminToken(req);
    if (!decoded) return res.status(401).json({ error: "Unauthorized" });

    try {
      const db = admin.firestore();
      const snap = await db.collection("downloadLeads").orderBy("timestamp", "desc").get();
      const leads = [];
      snap.forEach(doc => {
        const d = doc.data();
        leads.push({
          id: doc.id,
          name: d.name || "",
          email: d.email || "",
          phone: d.phone || "",
          role: d.role || "",
          country: d.country || "",
          timestamp: d.timestamp ? d.timestamp.toDate().toISOString() : null
        });
      });

      return res.status(200).json({ leads, total: leads.length });
    } catch (error) {
      console.error("Admin downloads error:", error);
      return res.status(500).json({ error: error.message });
    }
  }
);

// ============================================
// SUPER ADMIN: Get Free Trials
// ============================================
exports.adminGetFreeTrials = onRequest(
  { cors: true, region: "us-central1" },
  async (req, res) => {
    const decoded = verifyAdminToken(req);
    if (!decoded) return res.status(401).json({ error: "Unauthorized" });

    try {
      const db = admin.firestore();
      const snap = await db.collection("trials").orderBy("trialStart", "desc").get();
      const trials = [];
      const now = new Date();

      snap.forEach(doc => {
        const d = doc.data();
        const start = d.trialStart ? d.trialStart.toDate() : null;
        const expiry = d.trialExpiry ? d.trialExpiry.toDate() : null;
        const isActive = expiry ? expiry > now : false;
        let daysRemaining = 0;
        if (isActive && expiry) {
          daysRemaining = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        }

        trials.push({
          id: doc.id,
          email: d.email || "",
          phone: d.phone || "",
          userName: d.userName || "",
          machineName: d.machineName || "",
          trialStart: start ? start.toISOString() : null,
          trialExpiry: expiry ? expiry.toISOString() : null,
          isActive,
          daysRemaining
        });
      });

      const totalTrials = trials.length;
      const activeTrials = trials.filter(t => t.isActive).length;
      const expiredTrials = totalTrials - activeTrials;

      return res.status(200).json({ trials, totalTrials, activeTrials, expiredTrials });
    } catch (error) {
      console.error("Admin free trials error:", error);
      return res.status(500).json({ error: error.message });
    }
  }
);

// ============================================
// SUPER ADMIN: Get Purchased Users
// ============================================
exports.adminGetPurchasedUsers = onRequest(
  { cors: true, region: "us-central1" },
  async (req, res) => {
    const decoded = verifyAdminToken(req);
    if (!decoded) return res.status(401).json({ error: "Unauthorized" });

    try {
      const db = admin.firestore();
      
      // Get all licenses
      const licensesSnap = await db.collection("licenses").get();
      const users = [];

      for (const licDoc of licensesSnap.docs) {
        const lic = licDoc.data();
        
        // Get matching user profile
        let profile = {};
        try {
          const profSnap = await db.collection("userProfiles").doc(licDoc.id).get();
          if (profSnap.exists) profile = profSnap.data();
        } catch (e) { /* no profile */ }

        users.push({
          uid: licDoc.id,
          email: lic.email || "",
          maxSeats: lic.maxSeats || 0,
          isActive: lic.isActive || false,
          expiresAt: lic.expiresAt ? lic.expiresAt.toDate().toISOString() : null,
          registeredMachines: lic.registeredMachines || [],
          fullName: profile.fullName || "",
          phone: profile.phone || "",
          company: profile.company || "",
          role: profile.role || "",
          country: profile.country || "",
          createdAt: profile.createdAt ? profile.createdAt.toDate().toISOString() : null
        });
      }

      return res.status(200).json({ users, total: users.length });
    } catch (error) {
      console.error("Admin purchased users error:", error);
      return res.status(500).json({ error: error.message });
    }
  }
);

// ============================================
// SUPER ADMIN: Seed initial admin account
// Call this once to create the first admin, then disable or remove
// ============================================
exports.adminSeedAdmin = onRequest(
  { cors: true, region: "us-central1" },
  async (req, res) => {
    if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

    try {
      const { userId, password, name, role, masterKey } = req.body;

      // Simple protection: require a master key to seed
      if (masterKey !== "BIMEASY_SEED_2024") {
        return res.status(403).json({ error: "Forbidden" });
      }

      if (!userId || !password) {
        return res.status(400).json({ error: "Missing userId or password" });
      }

      const db = admin.firestore();
      const hash = await bcrypt.hash(password, 12);

      await db.collection("superAdminCredentials").add({
        userId: userId,
        passwordHash: hash,
        name: name || "Admin",
        role: role || "System Oversight",
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      });

      return res.status(200).json({ success: true, message: `Admin ${userId} created successfully` });
    } catch (error) {
      console.error("Seed admin error:", error);
      return res.status(500).json({ error: error.message });
    }
  }
);

// ============================================
// PUBLIC: Save Support Request
// ============================================
exports.saveSupportRequest = onRequest(
  { cors: true, region: "us-central1" },
  async (req, res) => {
    if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

    try {
      const { name, email, phone, explanation, category } = req.body;

      if (!name || !email || !explanation) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const db = admin.firestore();
      await db.collection("supportRequests").add({
        name,
        email,
        phone: phone || "",
        explanation,
        category: category || "General",
        status: "New",
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      });

      return res.status(200).json({ success: true, message: "Support request submitted successfully" });
    } catch (error) {
      console.error("Save support request error:", error);
      return res.status(500).json({ error: error.message });
    }
  }
);

// ============================================
// SUPER ADMIN: Get Support Requests
// ============================================
exports.adminGetSupportRequests = onRequest(
  { cors: true, region: "us-central1" },
  async (req, res) => {
    if (req.method !== "GET") return res.status(405).send("Method Not Allowed");

    // Authenticate Admin
    const decoded = verifyAdminToken(req);
    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    try {
      const db = admin.firestore();
      const snapshot = await db.collection("supportRequests")
        .orderBy("createdAt", "desc")
        .get();

      const requests = [];
      snapshot.forEach(doc => {
        requests.push({ id: doc.id, ...doc.data() });
      });

      return res.status(200).json({ success: true, requests });
    } catch (error) {
      console.error("Fetch support requests error:", error);
      return res.status(500).json({ error: error.message });
    }
  }
);
