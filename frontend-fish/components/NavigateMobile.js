import Link from "next/link";
import {
  link,
  navigate_mobile,
  menu_btn,
  menu_close,
  menu_active,
  menu_btn_close,
  menu_list,
  basket_count,
  link_phone
} from '../styles/Navigate.module.css'
import { useState } from "react";
import Image from "next/image";
import menuIcon from "../public/icons/menu-icon.svg"
import closeIcon from "../public/icons/close-icon.svg"
import useAuth from "../hooks/useAuth";
import basketIcon from "../public/icons/basket-icon.svg";
import useBasket from "../hooks/useBasket";
import {useRouter} from "next/router";
import {Telegram_icon} from "../ui/icons/Telegram_icon";


export default function NavigateMobile() {
  const [openMenu, setOpenMenu] = useState(false);
  const { logout, user, isAuth } = useAuth();
  const { basketProducts } = useBasket();

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

          <Link href="/"><a onClick={offOpenMenu} className={link_phone}>Главная</a></Link>

          <a
            href="https://telegram.im/@forelvpiter"
            target="_blank"
            className={link_phone}
            rel="noreferrer"
          >
            <span>Телеграм</span>
            <Telegram_icon height={18} width={18} />
          </a>

          <a
            href="tel:+79533713839"
            target="_blank"
            className={link_phone}
            rel="noreferrer"
          >
            <span>Телефон</span>
            <span>+7 953 371 3839</span>
          </a>

          <Link href="/basket">
            <a onClick={offOpenMenu} className={link_phone}>
              <span>Перейти в корзину</span>
              {basketProducts.length > 0 && <span className={basket_count}>{basketProducts.length}</span>}
            </a>
          </Link>

          {user.isAdmin && <Link href="/admin"><a onClick={offOpenMenu} className={link_phone}>Админ панель</a></Link>}
          {isAuth && <Link href="/"><a className={link_phone} onClick={handlerLogout}>Выйти</a></Link>}

        </nav>
      </div>
    </>

  )
}
