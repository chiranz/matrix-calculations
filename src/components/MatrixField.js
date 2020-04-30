import React from "react";

export default function MatrixField({ field, onChange }) {
  const handleChange = (e) => {
    const rawValue = +e.target.value;
    const value = rawValue ? rawValue : null;
    onChange({ ...field, value });
  };

  return (
    <input
      className="field"
      value={field.value || ""}
      readOnly={field.readOnly}
      onChange={handleChange}
    />
  );
}
