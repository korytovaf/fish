// import styles from "../styles/InputUi.module.css"
import {useState, useRef} from "react";

export default function Input({ value, handler, label, valid, dirty, onBlur, type = "text" }) {

  const inputRef = useRef()
  const [focus, setFocus] = useState(false);

  const onFocusHandler = () => {
    setFocus(true);
    // inputRef.current.focus();
  }

  const onBlurHandler = () => {
    if (!value) setFocus(false);
    onBlur();
  }

  return (
    <div>
      <div
        onClick={onFocusHandler}
      >
        <label
          onClick={onFocusHandler}
        >
          {label}
        </label>
        <input
          ref={inputRef}
          type={type}
          value={value}
          onChange={handler}
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
        />
      </div>
      {(valid.isEmpty && dirty) &&  <p>Поле не может быть пустым</p>}
    </div>

  )
}
