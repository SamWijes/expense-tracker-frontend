import "./ExpenseList.css";

export default function ExpenseList({ expenses }) {
  if (!expenses?.length) {
    return <div style={styles.empty}>No expenses found.</div>;
  }

  return (
     <div className="expense-list">
      {expenses.map((e) => (
        <div key={e.id} className="expense-card">
          <div className="expense-card__title">{e.title}</div>

          <div className="expense-card__meta">
            <span>Rs. {Number(e.amount).toFixed(2)}</span>
            <span>{String(e.expense_date).slice(0, 10)}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

const styles = {
  empty: { padding: 16, color: "#666" },
  grid: { display: "grid", gap: 12 },
  card: { padding: 14, borderRadius: 10, border: "1px solid #ddd" },
  title: { fontWeight: 600, marginBottom: 6 },
  meta: { display: "flex", justifyContent: "space-between", color: "#555" }
};
