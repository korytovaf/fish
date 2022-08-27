import { header, basket, wrapper_right, wrapper, logo, nav_wrapper, basket_count } from '../styles/Header.module.css'
import Navigate from "./Navigate";
import Image from "next/image";
import logoSvg from "../public/icons/fish_logo.svg"
import basketIcon from "../public/icons/basket-icon.svg"
import NavigateMobile from "./NavigateMobile";
import Link from "next/link";
import useAuth from "../hooks/useAuth";
import {link} from "../styles/Navigate.module.css";
import {useRouter} from "next/router";
import useBasket from "../hooks/useBasket";

export default function Header() {
  const { isAuth, logout } = useAuth();
  const router = useRouter();
  const { basketProducts } = useBasket();

  const handlerLogout = () => {
    logout()
  }

  return (
    <header className={header}>
      <div className={wrapper}>
        <div className={logo}>
          <Image src={logoSvg} alt="logo"/>
        </div>
        <div className={nav_wrapper}>
          <Navigate />
          <NavigateMobile />
          <div className={wrapper_right}>
            {isAuth
              ? <Link href="/"><a className={link} onClick={handlerLogout}>Выйти</a></Link>
              : router.pathname !== "/auth" && <Link href="/auth"><a >Войти</a></Link>
            }
            <div className={basket}>
              <Image src={basketIcon} alt="basket" />
              {basketProducts.length > 0 && <div className={basket_count}>{basketProducts.length}</div>}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
