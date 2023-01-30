import {useState} from "react";
import useValidation from "./useValidation";

export default function useInput(initialValue, validations) {
  const [value, setValue] = useState(initialValue);
  const [isDirty, setIsDirty] = useState(false);

  const valid = useValidation(value, validations)

  const onChange = (e) => {
    if (validations.isOnlyNumber) {
      setValue(e.target.value.replace(/\D/g, ""));
    } else {
      setValue(e.target.value);
    }
  }

  const clear = () => {
    setValue("");
    setIsDirty(false);
  }

  const onBlur = () => {
    setIsDirty(true);
  }

  return { value, isDirty, onChange, onBlur, valid, clear }
}
