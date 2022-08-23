import { wrapper, listItem } from "../styles/InputRadioUi.module.css"

export default function InputRadio({ title, listBtn, setValue, initialValue }) {

  const onHandler = (e) => {
    setValue(e.target.value)
  }

  return (
    <div className={wrapper}>
      <span>{title}</span>
      {listBtn.map(({ id, name, value }) => (
        <div className={listItem} key={id}>
          <input checked={value === initialValue} type="radio" id={id} name={name} value={value} onChange={onHandler}/>
          <label htmlFor={id}>{value}</label>
        </div>
      ))}
    </div>
  )
}
