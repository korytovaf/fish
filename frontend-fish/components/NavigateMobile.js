import Link from "next/link";
import { link, navigate_mobile, menu_btn, menu_close, menu_active, menu_btn_close, menu_list } from '../styles/Navigate.module.css'
import {useState} from "react";
import Image from "next/image";
import menuIcon from "../public/icons/menu-icon.svg"
import closeIcon from "../public/icons/close-icon.svg"

export default function NavigateMobile() {
  const [openMenu, setOpenMenu] = useState(false);

  const onOpenMenu = () => {
    setOpenMenu(true);
  }

  const offOpenMenu = () => {
    setOpenMenu(false);
  }

  return (
    <>
      <button className={menu_btn} onClick={onOpenMenu}>
        <Image src={menuIcon} />
      </button>

      <div className={navigate_mobile}>
        <nav className={`${menu_list} ${openMenu ? menu_active : menu_close}`}>
          <button className={`${menu_btn} ${menu_btn_close}`} onClick={offOpenMenu}>
            <Image src={closeIcon} />
          </button>
          <Link href="/"><a onClick={offOpenMenu} className={link}>Главная</a></Link>
          <Link href="/about"><a onClick={offOpenMenu} className={link}>О нас</a></Link>
          <Link href="/payment"><a onClick={offOpenMenu} className={link}>Доставка и оплата</a></Link>
          <Link href="/admin"><a onClick={offOpenMenu} className={link}>Админ панель</a></Link>
        </nav>
      </div>
    </>

  )
}
