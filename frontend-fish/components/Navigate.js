import Link from "next/link";
import { link, navigate } from "../styles/Navigate.module.css";
import useAuth from "../hooks/useAuth";

export default function Navigate() {
  const { user } = useAuth();

  return (
    <div className={navigate}>
      <nav>
        <Link href="/"><a className={link}>Главная</a></Link>
        <Link href="/about"><a className={link}>О нас</a></Link>
        <Link href="/payment"><a className={link}>Доставка и оплата</a></Link>
        {user.isAdmin && <Link href="/admin"><a className={link}>Админ панель</a></Link>}
      </nav>
    </div>
  )
}
