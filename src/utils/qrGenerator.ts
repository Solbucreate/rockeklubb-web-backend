import QRCode from "qrcode";

/**
 * Genererer en QR-kode basert på en tekststreng.
 * @param data Teksten som QR-koden skal inneholde (typisk orderId eller billettId)
 * @returns Buffer (PNG-bilde av QR-koden)
 */
export async function generateQR(data: string): Promise<Buffer> {
  try {
    const qrBuffer = await QRCode.toBuffer(data, {
      type: "png",
      width: 500,
      margin: 2,
      errorCorrectionLevel: "H",
    });

    return qrBuffer;
  } catch (error) {
    console.error("Failed to generate QR code:", error);
    throw new Error("QR generation failed");
  }
}
