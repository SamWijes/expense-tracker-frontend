import { useEffect, useState } from "react";
import AuthForm from "./components/AuthForm";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import DateFilter from "./components/DateFilter";
import { api, clearToken, getToken } from "./api/client";
import './App.css'

export default function App() {
  const [user, setUser] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState({ start: "", end: "" });

  async function loadExpenses(params = {}) {
    console.log("here");

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
    loadExpenses();
  }

  useEffect(() => {
    async function run() {
      await loadExpenses();
    }
    run();
  }, [])

  function logout() {
    clearToken();
    setUser(null);
    setExpenses([]);
  }

  return (
    <div className="app-page">
      <div className="app-container">
        <h1 className="app-title">Expense Tracker</h1>

        {!getToken() ? (
          <AuthForm onAuth={onAuthSuccess} />
        ) : (
          <>
            <div className="app-top-row">
              <div className="app-user">
                Logged in{user?.email ? ` as ${user.email}` : ""}
              </div>
              <button onClick={logout} className="app-logout">
                Logout
              </button>
            </div>

            <div className="app-layout">
              <div className="app-left">
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

              <div className="app-right">
                <h2 className="app-section-title">Expenses</h2>
                {error && <div className="app-error">{error}</div>}
                <ExpenseList expenses={expenses} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
