const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

export const generateTicketPDF = async (ticketData: {
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  venue: string;
  qrCode: string;
  ticketId: number;
  orderId: number;
  email: string;
}) => {
  return new Promise<string>((resolve, reject) => {
    const folder = path.join(__dirname, "../../tickets_pdf");
    if (!fs.existsSync(folder)) fs.mkdirSync(folder);

    const filePath = path.join(folder, `ticket_${ticketData.ticketId}.pdf`);

    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(filePath));

    doc.fontSize(22).text("🎟 Larvik Rockeklubb Billett", { underline: true });
    doc.moveDown();

    doc.fontSize(16).text(`Arrangement: ${ticketData.eventTitle}`);
    doc.text(`Dato: ${ticketData.eventDate}`);
    doc.text(`Tid: ${ticketData.eventTime}`);
    doc.text(`Sted: ${ticketData.venue}`);
    doc.moveDown();

    doc.text(`Billett-ID: ${ticketData.ticketId}`);
    doc.text(`Ordre-ID: ${ticketData.orderId}`);
    doc.text(`Epost: ${ticketData.email}`);
    doc.moveDown();

    // QR-kode
    doc.image(ticketData.qrCode, {
      fit: [200, 200],
      align: "center",
      valign: "center",
    });

    doc.end();

    doc.on("finish", () => resolve(filePath));
    doc.on("error", reject);
  });
};
