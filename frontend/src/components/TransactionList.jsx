export default function TransactionList({ transactions, onDelete }) {
  if (transactions.length === 0) {
    return <p className="text-gray-500 mt-4">Aucune transaction pour l’instant.</p>;
  }

  return (
    <div className="mt-4 max-h-64 overflow-y-auto space-y-2">
      {transactions.map((tx) => (
        <div
          key={tx.id || `${tx.label}-${tx.date}`}
          className="p-2 border rounded bg-white text-sm flex justify-between items-center shadow-sm"
        >
          <div className="flex flex-col flex-1">
            <span className="font-medium">{tx.label}</span>
            <span className="text-xs text-gray-500">{tx.date}</span>
          </div>

          <div className="text-xs text-gray-400 mx-2">{tx.category}</div>

          <div
            className={`font-semibold ${
              tx.type === "income" ? "text-green-600" : "text-red-600"
            }`}
          >
            {tx.type === "income" ? "+" : "-"}
            {Math.abs(tx.amount)} €
          </div>

          <button
            onClick={() => onDelete(tx.id)}
            className="ml-3 text-red-500 hover:underline text-xs"
          >
            Supprimer
          </button>
        </div>
      ))}
    </div>
  );
}