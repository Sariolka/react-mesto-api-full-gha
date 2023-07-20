import React from "react";


export function useForm(inputValues={}) {
    const [formValue, setFormValue] = React.useState(inputValues);
  
    const handleChange = (event) => {
      const {value, name} = event.target;
      setFormValue({...formValue, [name]: value});
    };
    return {formValue, handleChange, setFormValue};
  }
  