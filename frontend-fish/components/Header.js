import { header, basket, wrapper_right, wrapper, logo, logo_img, logo_text, nav_wrapper, basket_count, logo_text_subtitle } from '../styles/Header.module.css'
import Navigate from "./Navigate";
import Image from "next/image";
// import logoSvg from "../public/icons/Logo_fish.svg"
import { ReactComponent as logoSvg } from '../public/icons/Logo_fish.svg';
import basketIcon from "../public/icons/basket-icon.svg"
import NavigateMobile from "./NavigateMobile";
import Link from "next/link";
import useAuth from "../hooks/useAuth";
import {link} from "../styles/Navigate.module.css";
import {useRouter} from "next/router";
import useBasket from "../hooks/useBasket";
import {LogoFish} from "../ui/icons/LogoFish";

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
          <div className={logo_img}>
            <LogoFish />
            {/*<Image src={logoSvg} alt="logo" />*/}
          </div>
          <span className={logo_text}>
            <div className={logo_text}>Форель карелии</div>
            <div className={logo_text_subtitle}>ДО ПАРАДНОЙ</div>
          </span>
        </div>
        <div className={nav_wrapper}>
          <Navigate />
          <NavigateMobile />
          <div className={wrapper_right}>
            {/*{isAuth*/}
            {/*  ? <Link href="/"><a className={link} onClick={handlerLogout}>Выйти</a></Link>*/}
            {/*  : router.pathname !== "/auth" && <Link href="/auth"><a >Войти</a></Link>*/}
            {/*}*/}
            <button type="button" onClick={() => router.push("basket")} className={basket}>
              <Image src={basketIcon} alt="basket" width={35} height={35} />
              {basketProducts.length > 0 && <div className={basket_count}>{basketProducts.length}</div>}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
