import { header, basket, wrapper, logo, nav_wrapper } from '../styles/Header.module.css'
import Navigate from "./Navigate";
import Image from "next/image";
import logoSvg from "../public/icons/fish_logo.svg"
import basketIcon from "../public/icons/basket-icon.svg"
import NavigateMobile from "./NavigateMobile";

export default function Header() {
  return (
    <header className={header}>
      <div className={wrapper}>
        <div className={logo}>
          <Image src={logoSvg} />
        </div>
        <div className={nav_wrapper}>
          <Navigate />
          <NavigateMobile />
          <div className={basket}>
            <Image src={basketIcon} />
          </div>
        </div>
      </div>
    </header>
  )
}
