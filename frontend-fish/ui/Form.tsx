// import {form, header, header_wrapper} from "../styles/Form.module.css";

export default function Form({ children, title }) {
  return (
    <form >
      <div >
        <h3 >{ title }</h3>
      </div>
      { children }
    </form>
  )
}
