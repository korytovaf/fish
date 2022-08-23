import Link from "next/link";
import { link, navigate } from "../styles/Navigate.module.css";
import { useAuthContext } from "../contexts/useAuth";

export default function Navigate() {

  const { isAuth } = useAuthContext();

  return (
    <div className={navigate}>
      <nav>
        <Link href="/"><a className={link}>Главная</a></Link>
        <Link href="/about"><a className={link}>О нас</a></Link>
        <Link href="/payment"><a className={link}>Доставка и оплата</a></Link>
        {isAuth && <Link href="/admin"><a className={link}>Админ панель</a></Link>}
      </nav>
    </div>
  )
}
