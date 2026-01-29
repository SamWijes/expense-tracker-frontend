import "./DateFilter.css";

export default function DateFilter({ start, end, onChange, onApply, onClear }) {
  return (
    <div className="date-filter">
      <h3 className="date-filter__title">Filter by Date</h3>

      <div className="date-filter__row">
        <label className="date-filter__label">
          Start
          <input
            className="date-filter__input"
            type="date"
            value={start}
            onChange={(e) => onChange?.({ start: e.target.value, end })}
          />
        </label>

        <label className="date-filter__label">
          End
          <input
            className="date-filter__input"
            type="date"
            value={end}
            onChange={(e) => onChange?.({ start, end: e.target.value })}
          />
        </label>
      </div>

      <div className="date-filter__actions">
        <button className="date-filter__button" onClick={onApply}>
          Apply
        </button>
        <button className="date-filter__button date-filter__button--clear" onClick={onClear}>
          Clear
        </button>
      </div>
    </div>
  );
}
