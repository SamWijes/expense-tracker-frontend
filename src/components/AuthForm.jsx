import { useState } from "react";
import { api, setToken } from "../api/client";

export default function AuthForm({ onAuth }) {
  const [mode, setMode] = useState("login"); // login | register
  const [name, setName] = useState("");
  const [email, setEmail] = useState("sam@test.com");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (mode === "register") {
        await api.register({ name, email, password });
        // after register, auto login:
      }

      const data = await api.login({ email, password });
      setToken(data.token);
      onAuth?.(data.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.card}>
      <h2 style={styles.h2}>{mode === "login" ? "Login" : "Register"}</h2>

      <form onSubmit={submit} style={styles.form}>
        {mode === "register" && (
          <input
            style={styles.input}
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}

        <input
          style={styles.input}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={styles.input}
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <div style={styles.error}>{error}</div>}

        <button style={styles.button} disabled={loading}>
          {loading ? "Please wait..." : mode === "login" ? "Login" : "Register"}
        </button>
      </form>

      <button
        style={styles.link}
        onClick={() => setMode(mode === "login" ? "register" : "login")}
      >
        Switch to {mode === "login" ? "Register" : "Login"}
      </button>
    </div>
  );
}

const styles = {
  card: {
    padding: 16,
    border: "1px solid #ddd",
    borderRadius: 10,
    maxWidth: 420,
    width: "100%"
  },
  h2: { margin: 0, marginBottom: 12 },
  form: { display: "grid", gap: 10 },
  input: { padding: 10, borderRadius: 8, border: "1px solid #ccc" },
  button: { padding: 10, borderRadius: 8, border: "none", cursor: "pointer" },
  link: { marginTop: 10, background: "transparent", border: "none", cursor: "pointer" },
  error: { color: "crimson", fontSize: 14 }
};
