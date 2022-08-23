import styles from "../styles/TextareaUi.module.css"
import {useState, useRef} from "react";

export default function Textarea({ value, handler, label, valid, dirty, onBlur }) {

  const textareaRef = useRef()
  const [focus, setFocus] = useState(false);

  const onFocusHandler = () => {
    setFocus(true);
    textareaRef.current.focus();
  }

  const onBlurHandler = () => {
    if (!value) setFocus(false);
    onBlur();
  }

  const onKeyUpHandler = (e) => {
    textareaRef.current.style.height = "26px"
    textareaRef.current.style.height = `${e.target.scrollHeight}px`
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
        <textarea
          required
          ref={textareaRef}
          className={styles.textarea}
          value={value}
          onChange={handler}
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
          onKeyUp={onKeyUpHandler}
        />
      </div>
      {(valid.isEmpty && dirty) &&  <p className={styles.message}>Поле не может быть пустым</p>}
    </div>

  )
}
