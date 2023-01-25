import { box } from "./Box.module.css"

export default function Box({ children }) {

  return (
    <div className={box}>
      { children }
    </div>
  )
}
