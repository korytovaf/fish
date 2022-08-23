import styles from "../styles/InputUi.module.css"
import {useState, useRef} from "react";

export default function Input({ value, handler, label, valid, dirty, onBlur, type = "text" }) {

  const inputRef = useRef()
  const [focus, setFocus] = useState(false);

  const onFocusHandler = () => {
    setFocus(true);
    inputRef.current.focus();
  }

  const onBlurHandler = () => {
    if (!value) setFocus(false);
    onBlur();
  }

  return (
    <div>
      <div
        onClick={onFocusHandler}
        className={`${styles.wrapper} ${(valid.isEmpty && dirty) ? styles.wrapper_error : ""}`}
      >
        <label
          onClick={onFocusHandler}
          className={`
            ${styles.label}
            ${focus ? styles.label_active : ""}
          `}
        >
          {label}
        </label>
        <input
          ref={inputRef}
          className={styles.input}
          type={type}
          value={value}
          onChange={handler}
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
        />
      </div>
      {(valid.isEmpty && dirty) &&  <p className={styles.message}>Поле не может быть пустым</p>}
    </div>

  )
}
