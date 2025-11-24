const QRCode = require("qrcode");

export const generateQRCode = async (data: string): Promise<string> => {
  try {
    const qr = await QRCode.toDataURL(data);
    return qr;
  } catch (error) {
    console.error("QR generation failed:", error);
    throw error;
  }
};
