const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

export interface TicketPDFData {
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  venue: string;
  // QR-koden kan være enten en filsti eller en Buffer
  qrCode: string | Buffer;
  ticketId: number;
  orderId: number;
  email: string;
}

/**
 * Genererer en PDF-billett og lagrer den på disk.
 * Returnerer filstien til den genererte PDF-filen.
 */
export const generateTicketPDF = async (
  ticketData: TicketPDFData
): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    // Mappe der alle billetter lagres
    const folder = path.join(__dirname, "../../tickets_pdf");

    // Sørg for at mappen finnes
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }

    const fileName = `ticket-${ticketData.orderId}-${ticketData.ticketId}.pdf`;
    const filePath = path.join(folder, fileName);

    const doc = new PDFDocument({
      size: "A4",
      margin: 50,
    });

    const writeStream = fs.createWriteStream(filePath);
    doc.pipe(writeStream);

    // Tittel
    doc
      .fontSize(22)
      .text("Larvik Rockeklubb - Billett", { align: "center" })
      .moveDown();

    // Event-info
    doc
      .fontSize(16)
      .text(`Arrangement: ${ticketData.eventTitle}`)
      .moveDown(0.5);
    doc.text(`Dato: ${ticketData.eventDate}`);
    doc.text(`Tid: ${ticketData.eventTime}`);
    doc.text(`Sted: ${ticketData.venue}`).moveDown();

    // Billett-info
    doc
      .fontSize(14)
      .text(`Billett-ID: ${ticketData.ticketId}`)
      .text(`Ordre-ID: ${ticketData.orderId}`)
      .text(`E-post: ${ticketData.email}`)
      .moveDown(2);

    doc.text(
      "Ta med denne billetten (digitalt eller printet). QR-koden under brukes ved inngang.",
      {
        align: "left",
      }
    ).moveDown(1.5);

    // QR-kode (filsti eller buffer)
    try {
      doc.image(ticketData.qrCode as any, {
        fit: [200, 200],
        align: "center",
        valign: "center",
      });
    } catch (err) {
      console.error("Kunne ikke legge til QR-kode i PDF:", err);
    }

    doc.end();

    writeStream.on("finish", () => resolve(filePath));
    writeStream.on("error", (err: any) => reject(err));
  });
};

// Alias for kompatibilitet med kode som importerer { generatePDF }
export const generatePDF = generateTicketPDF;
