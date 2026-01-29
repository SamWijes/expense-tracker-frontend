import { useState } from "react";
import { api } from "../api/client";
import "./ExpenseForm.css";

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
    <div className="expense-form">
      <h3 className="expense-form__title">Add Expense</h3>

      <form onSubmit={submit} className="expense-form__form">
        <input
          className="expense-form__input"
          placeholder="Title (e.g., Lunch)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="expense-form__input"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <input
          className="expense-form__input"
          type="date"
          value={expenseDate}
          onChange={(e) => setExpenseDate(e.target.value)}
        />

        {error && <div className="expense-form__error">{error}</div>}

        <button className="expense-form__button" disabled={loading}>
          {loading ? "Adding..." : "Add"}
        </button>
      </form>
    </div>
  );
}
