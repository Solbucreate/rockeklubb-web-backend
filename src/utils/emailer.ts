import nodemailer from "nodemailer";

export interface EmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
  attachments?: { filename: string; path: string }[];
}

/**
 * Sender en e-post via Gmail SMTP
 * @param options E-postinformasjon
 */
export async function sendEmail(options: EmailOptions): Promise<void> {
  try {
    // Transporter for Gmail SMTP
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,   // må legges inn i Render dashboard
        pass: process.env.EMAIL_PASS,   // Gmail app password
      },
    });

    await transporter.sendMail({
      from: `"Larvik Rockeklubb" <${process.env.EMAIL_USER}>`,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
      attachments: options.attachments,
    });

    console.log("E-post sendt til:", options.to);
  } catch (err) {
    console.error("Klarte ikke å sende e-post:", err);
    throw new Error("Email send failed");
  }
}
