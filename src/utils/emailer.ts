const nodemailer = require("nodemailer");

export const sendTicketEmail = async (
  to: string,
  subject: string,
  text: string,
  attachments: any[]
) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Larvik Rockeklubb" <${process.env.MAIL_USER}>`,
      to,
      subject,
      text,
      attachments,
    });

    console.log("Email sent:", to);
  } catch (error) {
    console.error("Email sending failed:", error);
  }
};
