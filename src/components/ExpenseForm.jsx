import { useState } from "react";
import { api } from "../api/client";

export default function ExpenseForm({ onAdded }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [expenseDate, setExpenseDate] = useState(() => {
    const d = new Date();
    return d.toISOString().slice(0, 10);
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setError("");

    const num = Number(amount);
    if (!title.trim() || Number.isNaN(num)) {
      setError("Enter title and amount (number).");
      return;
    }

    setLoading(true);
    try {
      await api.addExpense({
        title: title.trim(),
        amount: num,
        expense_date: expenseDate
      });
      setTitle("");
      setAmount("");
      onAdded?.();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.card}>
      <h3 style={{ marginTop: 0 }}>Add Expense</h3>
      <form onSubmit={submit} style={styles.form}>
        <input
          style={styles.input}
          placeholder="Title (e.g., Lunch)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          style={styles.input}
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <input
          style={styles.input}
          type="date"
          value={expenseDate}
          onChange={(e) => setExpenseDate(e.target.value)}
        />

        {error && <div style={styles.error}>{error}</div>}

        <button style={styles.button} disabled={loading}>
          {loading ? "Adding..." : "Add"}
        </button>
      </form>
    </div>
  );
}

const styles = {
  card: { padding: 16, border: "1px solid #ddd", borderRadius: 10 },
  form: { display: "grid", gap: 10 },
  input: { padding: 10, borderRadius: 8, border: "1px solid #ccc" },
  button: { padding: 10, borderRadius: 8, border: "none", cursor: "pointer" },
  error: { color: "crimson", fontSize: 14 }
};
