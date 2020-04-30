import React, { useState } from "react";

export default function SizeForm({ setMatrixSize }) {
  const [rows, setRows] = useState(null);
  const [cols, setCols] = useState(null);
  const [empty, setEmpty] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!+rows || !+cols) {
      setEmpty(true);
      return;
    }
    setMatrixSize({
      rows: +rows,
      cols: +cols,
    });
  };
  const showError = <span className="error">Fields can't be empty</span>;
  return (
    <form className="form-container">
      <div className="input-container">
        <div className="input-group">
          <label htmlFor="rows">Rows</label>
          <input
            className="input"
            type="text"
            name="row"
            id="row"
            value={rows || ""}
            onChange={(e) => {
              setEmpty(false);
              setRows(+e.target.value);
            }}
          />
        </div>
        <div className="input-group">
          <label htmlFor="cols">Cols</label>
          <input
            className="input"
            type="text"
            name="col"
            id="col"
            value={cols || ""}
            onChange={(e) => {
              setEmpty(false);
              setCols(+e.target.value);
            }}
          />
        </div>
      </div>

      <button className="button" onClick={handleSubmit} type="submit">
        Generate
      </button>
      {empty ? showError : ""}
    </form>
  );
}
