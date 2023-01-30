import {useEffect, useState} from "react";

export default function useValidation(value, validations) {

  const [isEmpty, setIsEmpty] = useState(true);
  const [minLengthError, setMinLengthError] = useState(false);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    for (let validationKey in validations) {
      switch (validationKey) {
        case "isEmpty":
          value ? setIsEmpty(false) : setIsEmpty(true)
          break
        case "minLength":
          value.length <= validations[validationKey] ? setMinLengthError(true) : setMinLengthError(false)
          break
      }
    }
  }, [value])


  useEffect(() => {
    if (isEmpty || minLengthError) {
      setIsValid(false)
    } else {
      setIsValid(true)
    }
  }, [isEmpty, minLengthError])


  return { value, isEmpty, minLengthError, isValid }
}
