import {useState, useRef} from "react";

export default function Textarea({ value, handler, label, valid, dirty, onBlur }) {

  const textareaRef = useRef()
  const [focus, setFocus] = useState(false);

  const onFocusHandler = () => {
    setFocus(true);
    // textareaRef.current.focus();
  }

  const onBlurHandler = () => {
    if (!value) setFocus(false);
    onBlur();
  }

  const onKeyUpHandler = (e) => {
    // textareaRef.current.style.height = "26px"
    // textareaRef.current.style.height = `${e.target.scrollHeight}px`
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
        <textarea
          required
          ref={textareaRef}
          value={value}
          onChange={handler}
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
          onKeyUp={onKeyUpHandler}
        />
      </div>
      {(valid.isEmpty && dirty) &&  <p >Поле не может быть пустым</p>}
    </div>

  )
}
