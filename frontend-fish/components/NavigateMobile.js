import Link from "next/link";
import { link, navigate_mobile, menu_btn, menu_close, menu_active, menu_btn_close, menu_list } from '../styles/Navigate.module.css'
import {useState} from "react";
import Image from "next/image";
import menuIcon from "../public/icons/menu-icon.svg"
import closeIcon from "../public/icons/close-icon.svg"
import useAuth from "../hooks/useAuth";


export default function NavigateMobile() {
  const [openMenu, setOpenMenu] = useState(false);
  const { logout, user, isAuth } = useAuth();

  const onOpenMenu = () => {
    setOpenMenu(true);
  }

  const offOpenMenu = () => {
    setOpenMenu(false);
  }

  const handlerLogout = () => {
    offOpenMenu()
    logout()
  }

  return (
    <>
      <button className={menu_btn} onClick={onOpenMenu}>
        <Image src={menuIcon} alt="open menu" />
      </button>

      <div className={navigate_mobile}>
        <nav className={`${menu_list} ${openMenu ? menu_active : menu_close}`}>
          <button className={`${menu_btn} ${menu_btn_close}`} onClick={offOpenMenu}>
            <Image src={closeIcon} alt="close menu" />
          </button>
          <Link href="/"><a onClick={offOpenMenu} className={link}>Главная</a></Link>
          <Link href="/about"><a onClick={offOpenMenu} className={link}>О нас</a></Link>
          <Link href="/payment"><a onClick={offOpenMenu} className={link}>Доставка и оплата</a></Link>
          {user.isAdmin && <Link href="/admin"><a onClick={offOpenMenu} className={link}>Админ панель</a></Link>}
          {isAuth && <Link href="/"><a className={link} onClick={handlerLogout}>Выйти</a></Link>}
        </nav>
      </div>
    </>

  )
}
