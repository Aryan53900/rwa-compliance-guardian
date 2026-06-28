import { jsPDF } from "jspdf";

export function exportCompliancePDF(result) {
  const doc = new jsPDF();

  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("AI Compliance Report", 20, 20);

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");

  doc.text(`Compliance ID: ${result.complianceId}`, 20, 40);
  doc.text(`Status: ${result.status}`, 20, 50);
  doc.text(`Risk Score: ${result.risk}/100`, 20, 60);
  doc.text(`Casper Hash:`, 20, 70);
  doc.text(result.blockchainHash, 20, 78);

  doc.text("AI Assessment:", 20, 95);

  const lines = doc.splitTextToSize(
    result.explanation,
    170
  );

  doc.text(lines, 20, 105);

  doc.save(`Compliance-${result.complianceId}.pdf`);
}