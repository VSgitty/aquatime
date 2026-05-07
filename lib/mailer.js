import nodemailer from 'nodemailer';

let transporter = null;

function getTransporter() {
  if (transporter) {
    return transporter;
  }

  const host = process.env.SMTP_HOST;
  const port = Number.parseInt(process.env.SMTP_PORT || '587', 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !port || !user || !pass) {
    return null;
  }

  transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  });

  return transporter;
}

export function canSendEmail() {
  return Boolean(getTransporter());
}

export async function sendEmail({ to, subject, text, html }) {
  const tx = getTransporter();
  if (!tx) {
    return { sent: false, reason: 'smtp_not_configured' };
  }

  if (!to || !subject || (!text && !html)) {
    return { sent: false, reason: 'invalid_payload' };
  }

  const from = process.env.SMTP_FROM || process.env.SMTP_USER;

  await tx.sendMail({
    from,
    to,
    subject,
    text,
    html,
  });

  return { sent: true };
}
