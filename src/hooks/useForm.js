import { useCallback, useRef, useState } from "react";

/* -------------------
  Custom Hook: useForm
------------------- */
export default function useForm(initialValues = {}) {
  const initialValuesRef = useRef(initialValues);
  const [values, setValues] = useState(initialValuesRef.current);

  /* -------------------
    Handle Change
  ------------------- */
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  /* -------------------
    Reset Form
  ------------------- */
  const resetForm = useCallback(() => {
    setValues(initialValuesRef.current);
  }, []);

  return { values, handleChange, resetForm, setValues };
}
