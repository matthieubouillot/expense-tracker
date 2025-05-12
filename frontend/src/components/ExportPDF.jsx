import { jsPDF } from "jspdf";

export default function ExportPDF({ transactions, user }) {
  const handleExport = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text("Résumé de vos transactions 💰", 20, 20);
    doc.setFontSize(11);
    doc.text(`Utilisateur : ${user.first_name} ${user.last_name}`, 20, 30);

    let y = 45;
    transactions.forEach((tx, i) => {
      doc.text(
        `${i + 1}. ${tx.date} | ${tx.label} | ${tx.category} | ${tx.amount} €`,
        20,
        y
      );
      y += 7;
    });

    doc.save("transactions.pdf");
  };

  return (
    <button
      onClick={handleExport}
      className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
    >
      Exporter en PDF
    </button>
  );
}