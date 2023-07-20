import { useState } from "react";

function useValidation() {
  const [formValues, setFormValues] = useState({});
  const [showErrors, setShowErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormValues({
      ...formValues,
      [name]: value,
    });

    setShowErrors({ ...showErrors, [name]: e.target.validationMessage });
    setIsValid(e.target.closest("form").checkValidity());
  }

  function resetValidation() {
    setShowErrors({});
    setIsValid(false);
    setFormValues({});
  }

  return {
    formValues,
    handleChange,
    showErrors,
    isValid,
    resetValidation,
    setFormValues,
    setIsValid,
  };
}

export default useValidation;
