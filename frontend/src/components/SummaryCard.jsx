export default function SummaryCard({ transactions }) {
    const income = transactions.filter((tx) => tx.type === "income").reduce((acc, tx) => acc + tx.amount, 0);
    const expense = transactions.filter((tx) => tx.type === "expense").reduce((acc, tx) => acc + tx.amount, 0);
    const balance = income - expense;
  
    const categoryCount = {};
    transactions.forEach((tx) => {
      if (!categoryCount[tx.category]) categoryCount[tx.category] = 0;
      categoryCount[tx.category] += 1;
    });
  
    const topCategory = Object.entries(categoryCount).sort((a, b) => b[1] - a[1])[0]?.[0] || "Aucune";
  
    return (
      <div className="bg-white p-4 rounded shadow space-y-2">
        <h2 className="text-xl font-semibold">Résumé</h2>
        <p>💰 Solde net : <strong>{balance.toFixed(2)} €</strong></p>
        <p>📈 Revenus : {income.toFixed(2)} €</p>
        <p>📉 Dépenses : {expense.toFixed(2)} €</p>
        <p>🏷️ Catégorie la plus utilisée : {topCategory}</p>
      </div>
    );
  }