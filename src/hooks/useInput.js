import { useState } from "react";

export const useInput = (initialValue) => {
  const [values, setValues] = useState(initialValue);

  const handleChange = (e) => {
    console.log(e.target);
    setValues((values) => ({
      ...values,
      [e.target.name]: e.target.value,
    }));
  };
  return { values, handleChange };
};
