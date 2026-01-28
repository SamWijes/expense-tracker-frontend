export default function DateFilter({ start, end, onChange, onApply, onClear }) {
  return (
    <div style={styles.card}>
      <h3 style={{ marginTop: 0 }}>Filter by Date</h3>
      <div style={styles.row}>
        <label style={styles.label}>
          Start
          <input
            style={styles.input}
            type="date"
            value={start}
            onChange={(e) => onChange?.({ start: e.target.value, end })}
          />
        </label>

        <label style={styles.label}>
          End
          <input
            style={styles.input}
            type="date"
            value={end}
            onChange={(e) => onChange?.({ start, end: e.target.value })}
          />
        </label>
      </div>

      <div style={styles.row2}>
        <button style={styles.button} onClick={onApply}>
          Apply
        </button>
        <button style={styles.button2} onClick={onClear}>
          Clear
        </button>
      </div>
    </div>
  );
}

const styles = {
  card: { padding: 16, border: "1px solid #ddd", borderRadius: 10 },
  row: { display: "flex", gap: 10, flexWrap: "wrap" },
  row2: { display: "flex", gap: 10, marginTop: 10 },
  label: { display: "grid", gap: 6, fontSize: 14 },
  input: { padding: 10, borderRadius: 8, border: "1px solid #ccc" },
  button: { padding: 10, borderRadius: 8, border: "none", cursor: "pointer" },
  button2: { padding: 10, borderRadius: 8, border: "1px solid #ccc", cursor: "pointer" }
};
