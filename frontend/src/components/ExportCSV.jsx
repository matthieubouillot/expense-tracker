export default function ExportCSV({ transactions }) {
    const downloadCSV = () => {
      const headers = ["Date", "Type", "Label", "Montant", "Catégorie"];
      const rows = transactions.map((tx) => [
        tx.date,
        tx.type,
        tx.label,
        tx.amount,
        tx.category,
      ]);
  
      const csvContent =
        "data:text/csv;charset=utf-8," +
        [headers, ...rows].map((row) => row.join(",")).join("\n");
  
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "transactions.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
  
    return (
      <button
        onClick={downloadCSV}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        📥 Exporter en CSV
      </button>
    );
  }