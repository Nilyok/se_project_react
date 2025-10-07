import { useState } from "react";

/* -------------------
     Custom Hook: useForm
------------------- */
export const useForm = (initialValues = {}) => {
  const [values, setValues] = useState(initialValues);

  /* -------------------
       Handle Change
  ------------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  /* -------------------
       Reset Form
  ------------------- */
  const resetForm = () => {
    setValues(initialValues);
  };

  return { values, handleChange, resetForm };
};
