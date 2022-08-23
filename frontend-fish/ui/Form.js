import {form, header, header_wrapper} from "../styles/Form.module.css";

export default function Form({ children, title }) {
  return (
    <form className={form}>
      <div className={header_wrapper}>
        <h3 className={header}>{ title }</h3>
      </div>
      { children }
    </form>
  )
}
