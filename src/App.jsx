import { useState } from "react";
import AuthForm from "./components/AuthForm";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import DateFilter from "./components/DateFilter";
import { api, clearToken, getToken } from "./api/client";

export default function App() {
  const [user, setUser] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState({ start: "", end: "" });

  async function loadExpenses(params = {}) {
    setError("");
    try {
      const data = await api.getExpenses(params);
      setExpenses(data.expenses || []);
    } catch (err) {
      setError(err.message);
    }
  }

  function onAuthSuccess(userData) {
    setUser(userData);
    loadExpenses(); // load ONLY after login/register
  }

  function logout() {
    clearToken();
    setUser(null);
    setExpenses([]);
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={{ marginTop: 0 }}>Expense Tracker</h1>

        {!getToken() ? (
          <AuthForm onAuth={onAuthSuccess} />
        ) : (
          <>
            <div style={styles.topRow}>
              <div style={{ color: "#444" }}>
                Logged in{user?.email ? ` as ${user.email}` : ""}
              </div>
              <button onClick={logout} style={styles.logout}>
                Logout
              </button>
            </div>

            <div style={styles.layout}>
              <div style={styles.left}>
                <ExpenseForm
                  onAdded={() =>
                    loadExpenses(filter.start || filter.end ? filter : {})
                  }
                />

                <DateFilter
                  start={filter.start}
                  end={filter.end}
                  onChange={setFilter}
                  onApply={() =>
                    loadExpenses(filter.start || filter.end ? filter : {})
                  }
                  onClear={() => {
                    setFilter({ start: "", end: "" });
                    loadExpenses();
                  }}
                />
              </div>

              <div style={styles.right}>
                <h2 style={{ marginTop: 0 }}>Expenses</h2>
                {error && <div style={styles.error}>{error}</div>}
                <ExpenseList expenses={expenses} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", placeItems: "start center", padding: 20 },
  container: { width: "100%", maxWidth: 980, display: "grid", gap: 16 },
  topRow: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  logout: { padding: 10, borderRadius: 8, border: "1px solid #ccc", cursor: "pointer" },
  layout: { display: "grid", gridTemplateColumns: "360px 1fr", gap: 16 },
  left: { display: "grid", gap: 16 },
  right: { padding: 16, border: "1px solid #ddd", borderRadius: 10 },
  error: { color: "crimson", marginBottom: 10 }
};
