import React from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const ExportButton = ({ template, invoiceData }) => {
  const downloadPDF = async () => {
    const element = document.getElementById("invoice-preview");
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let verticalHeight = imgHeight;

    let positionX = 0;
    let positionY = 0;

    pdf.addImage(imgData, "PNG", positionX, positionY, imgWidth, imgHeight);
    verticalHeight -= pageHeight;

    while (verticalHeight >= 0) {
      positionY = verticalHeight - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", positionX, positionY, imgWidth, imgHeight);
      verticalHeight -= pageHeight;
    }

    pdf.save(`invoice-${invoiceData.invoiceNumber}.pdf`);
  };

  return (
    <button
      onClick={downloadPDF}
      className="bg-gradient-to-br from-[#F4991A] to-[#344F1F] text-white px-6 py-3 rounded-lg font-semibold hover:bg-gradient-to-br hover:from-[#344F1F] hover:to-[#F4991A] transition-all duration-700"
    >
      Download PDF
    </button>
  );
};
export default ExportButton;
