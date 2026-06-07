import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // JSON and URL-encoded body parsers
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // API: Get In Touch email dispatch endpoint
  app.post('/api/contact', async (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Missing required parameters. Name, email, and message are required.',
      });
    }

    const emailSubject = subject?.trim() || 'Software Quality Inquiry from Portfolio';
    const emailBody = `Hi Tahsin,

You received a new inquiry from your portfolio website:

Sender Name: ${name}
Sender Email: ${email}
Subject: ${emailSubject}

Message:
-------------------------------------------
${message}
-------------------------------------------

Sincerely,
Portfolio Contact Form System`;

    // 1. Log to console so developer can immediately see the constructed email
    console.log('\n==================================================');
    console.log('📬 NEW PORTFOLIO EMAIL DISPATCH REQUEST');
    console.log(`To: tahsinahmed309203@gmail.com, tahsin@bluetech.solutions`);
    console.log(`From Client Field: ${email} (${name})`);
    console.log(`Subject: ${emailSubject}`);
    console.log('---------------------------- MESSAGE ----------------------------');
    console.log(emailBody);
    console.log('==================================================\n');

    // 2. Transporter configuration using standard environment variables (no personal hardcoded secrets/fallbacks in code)
    const smtpHost = process.env.SMTP_HOST || 'smtp.mail.yahoo.com';
    const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 465;
    const smtpUser = process.env.SMTP_USER || '';
    const smtpPass = process.env.SMTP_PASS || '';

    const dispatchViaFormSubmit = async () => {
      console.log('🔗 Dispatching directly via FormSubmit.co API...');
      const targetRecipients = ['tahsinahmed309203@gmail.com', 'tahsin@bluetech.solutions'];
      const results = [];
      let needsActivation = false;

      for (const recipient of targetRecipients) {
        try {
          console.log(`📡 Sending FormSubmit API request for recipient: ${recipient}...`);
          
          const antiSpamRef = `FS-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
          const messageWithRef = `Visitor Name: ${name}\nVisitor Email: ${email}\n\nMessage:\n${message}\n\n---\n[Ref Token: ${antiSpamRef}]\n[Inquiry Origin: Portfolio Website]`;

          const response = await fetch(`https://formsubmit.co/ajax/${recipient}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
              name: name,
              email: email, // Use the real visitor email to pass strict anti-spoofing checks and successfully trigger activation
              _subject: `${emailSubject} (${antiSpamRef})`,
              message: messageWithRef,
              _captcha: 'false',
              _honey: ''
            })
          });

          if (response.ok) {
            const data = await response.json() as any;
            console.log(`✅ FormSubmit API response for ${recipient}:`, data);
            
            const msgStr = String(data?.message || '').toLowerCase();
            if (msgStr.includes('activation') || msgStr.includes('activate')) {
              needsActivation = true;
            }
            
            results.push({ recipient, success: true, data });
          } else {
            console.log(`⚠️ FormSubmit responded with status: ${response.status}`);
            results.push({ recipient, success: false, status: response.status });
          }
        } catch (fsError: any) {
          console.error(`⚠️ FormSubmit routing failed for ${recipient}:`, fsError);
          results.push({ recipient, success: false, error: fsError?.message || String(fsError) });
        }
      }

      const anySuccess = results.some(r => r.success);
      return {
        success: anySuccess,
        mode: anySuccess ? 'delivered' : 'logged_offline',
        hasSmtp: false,
        isFormSubmit: true,
        needsActivation,
        message: anySuccess 
          ? 'Message processed directly by secure API dispatcher.' 
          : 'Failed to dispatch via live fallback.',
        details: results
      };
    };

    if (!smtpUser || !smtpPass) {
      console.log('🔌 SMTP Credentials (SMTP_USER/SMTP_PASS) are NOT configured in settings.');
      console.log('📧 Forwarding directly using FormSubmit as secure API dispatcher...');
      const fallbackResult = await dispatchViaFormSubmit();
      return res.json(fallbackResult);
    }

    // Design fully self-healing auto-port fallback arrays for reliable connection
    const attempts = [
      { host: smtpHost, port: smtpPort, secure: smtpPort === 465 }
    ];

    if (smtpPort === 465) {
      attempts.push({ host: smtpHost, port: 587, secure: false });
    } else if (smtpPort === 587) {
      attempts.push({ host: smtpHost, port: 465, secure: true });
    } else {
      attempts.push({ host: smtpHost, port: 465, secure: true });
      attempts.push({ host: smtpHost, port: 587, secure: false });
    }

    let activeTransporter: nodemailer.Transporter | null = null;
    let smtpSuccess = false;
    let lastSmtpError: any = null;

    const trySmtpConnection = async (host: string, port: number, secure: boolean) => {
      console.log(`🔌 Attempting SMTP host: ${host}, port: ${port}, secure: ${secure}...`);
      const isYahoo = host.toLowerCase().includes('yahoo') || smtpUser.toLowerCase().includes('yahoo');
      
      const config = (isYahoo && port === 465)
        ? {
            service: 'yahoo',
            auth: {
              user: smtpUser,
              pass: smtpPass,
            },
            timeout: 8000,
          }
        : {
            host: host,
            port: port,
            secure: secure,
            auth: {
              user: smtpUser,
              pass: smtpPass,
            },
            tls: {
              rejectUnauthorized: false
            },
            timeout: 8000,
          };

      const testTransporter = nodemailer.createTransport(config as any);
      
      // Enforce connection check timeout
      await Promise.race([
        testTransporter.verify(),
        new Promise((_, reject) => setTimeout(() => reject(new Error('SMTP Verification timed out (8000ms limit)')), 8000))
      ]);

      return testTransporter;
    };

    // Try each dynamic self-healing connection configuration
    for (const attempt of attempts) {
      try {
        activeTransporter = await trySmtpConnection(attempt.host, attempt.port, attempt.secure);
        smtpSuccess = true;
        console.log(`🚀 SMTP Connection verified successfully using port ${attempt.port} (secure: ${attempt.secure})!`);
        break;
      } catch (err: any) {
        console.log(`⚠️ SMTP validation failed on port ${attempt.port}: ${err?.message || String(err)}`);
        lastSmtpError = err;
        if (activeTransporter) {
          try { activeTransporter.close(); } catch (e) {}
          activeTransporter = null;
        }
      }
    }

    if (!activeTransporter) {
      console.log(`⚠️ All SMTP self-healing configurations failed. Last SMTP Error: ${lastSmtpError?.message || String(lastSmtpError)}`);
      console.log('🔄 SMTP dispatch failed. Initiating secure FormSubmit API delivery...');
      const fallbackResult = await dispatchViaFormSubmit();
      return res.json(fallbackResult);
    }

    try {
      const targetRecipients = ['tahsinahmed309203@gmail.com', 'tahsin@bluetech.solutions'];
      const successfulDeliveries = [];
      const failedDeliveries = [];

      for (const target of targetRecipients) {
        try {
          console.log(`📡 Sending SMTP mail dynamically to recipient: ${target}...`);
          const info = await activeTransporter.sendMail({
            from: smtpUser, // Must match authenticated account to pass strict SPF policies
            to: target,
            replyTo: email, // Direct replies back to the client inquiry sender
            subject: emailSubject,
            text: emailBody,
          });
          
          console.log(`✅ SMTP email sent successfully to ${target}:`, info.messageId);
          successfulDeliveries.push({ recipient: target, messageId: info.messageId });
        } catch (individualError: any) {
          console.log(`⚠️ SMTP delivery failed for ${target}: ${individualError?.message || String(individualError)}`);
          failedDeliveries.push({ recipient: target, error: individualError?.message || String(individualError) });
        }
      }

      // Cleanly release connection socket pools
      try {
        activeTransporter.close();
        console.log('🔌 Dynamic SMTP transporter closed successfully.');
      } catch (closeErr) {
        console.log('⚠️ Transporter close issue:', closeErr);
      }

      if (successfulDeliveries.length > 0) {
        return res.json({
          success: true,
          mode: 'delivered',
          isFallback: false,
          hasSmtp: true,
          message: `Your message has been delivered successfully! (Delivered to: ${successfulDeliveries.map(d => d.recipient).join(', ')})`,
          details: { successfulDeliveries, failedDeliveries }
        });
      } else {
        throw new Error(`All SMTP target recipients failed. Errors: ${JSON.stringify(failedDeliveries)}`);
      }
    } catch (error: any) {
      if (activeTransporter) {
        try {
          activeTransporter.close();
        } catch (e) {}
      }
      console.log(`⚠️ Handled exception on SMTP route: ${error?.message || String(error)}`);
      console.log('🔄 SMTP dispatch failed. Initiating secure FormSubmit API delivery...');
      const fallbackResult = await dispatchViaFormSubmit();
      return res.json(fallbackResult);
    }
  });

  // Healthcheck endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // Vite middleware for assets/routes in dev, or serving static build in prod
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // PORT constraint is 3000 as hardcoded in sandbox architecture
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Full-stack express server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('💥 Failed to start full-stack server:', err);
});
