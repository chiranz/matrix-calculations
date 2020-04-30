import React from "react";
import MatrixField from "./MatrixField";

export default function MatrixBoard({ matrix, onChange, title, error }) {
  return (
    <div className="matrix-board">
      <h3>{title}</h3>
      {Object.values(matrix).length
        ? matrix.rows.map((row) => (
            <div className="row" key={row.index}>
              {row.cols.map((field) => (
                <MatrixField
                  field={field}
                  key={field.col}
                  onChange={onChange}
                />
              ))}
            </div>
          ))
        : ""}
      {error && <div className="error">{error}</div>}
    </div>
  );
}
