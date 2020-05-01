import React from "react";

export default function MatrixField({ field, onChange }) {
  const handleChange = (e) => {
    const rawValue = +e.target.value;
    const value = isNaN(rawValue) ? null : rawValue;
    onChange({ ...field, value });
  };
  const fieldValue = field.value === null ? "" : field.value;
  return (
    <input
      className="field"
      value={fieldValue}
      readOnly={field.readOnly}
      onChange={handleChange}
    />
  );
}
