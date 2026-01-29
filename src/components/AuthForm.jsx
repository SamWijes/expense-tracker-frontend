import { useState } from "react";
import { api, setToken } from "../api/client";
import './AuthForm.css'

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
    <div className="card">
      <h2>{mode === "login" ? "Login" : "Register"}</h2>

      <form onSubmit={submit}>
        {mode === "register" && (
          <input
            className="input"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}

        <input
          className="input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="input"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <div className="error">{error}</div>}

        <button className="button" disabled={loading}>
          {loading ? "Please wait..." : mode === "login" ? "Login" : "Register"}
        </button>
      </form>

      <button
        className="link"
        onClick={() => setMode(mode === "login" ? "register" : "login")}
      >
        Switch to {mode === "login" ? "Register" : "Login"}
      </button>
    </div>

  );
}
