import { navigate, link, navigate_list, link_phone } from "../styles/Navigate.module.css";
import useAuth from "../hooks/useAuth";
import {Telegram_icon} from "../ui/icons/Telegram_icon";
import Link from "next/link";
import {useRouter} from "next/router";

export default function Navigate() {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <div className={navigate}>
      <nav className={navigate_list}>

        {router.asPath === '/basket' && (
          <Link href="/"><a className={link}>Вернуться на главную</a></Link>
        )}

        <a
          href="https://telegram.im/@korytovaf"
          target="_blank"
          className={link_phone}
          rel="noreferrer"
        >
          <Telegram_icon height={18} width={18} />
        </a>

        <a
          href="tel:+79533713839"
          target="_blank"
          className={link_phone}
          rel="noreferrer"
        >
          <span>+7 953 371 3839</span>
        </a>
        {/*<Link href="/payment"><a className={link}>Доставка и оплата</a></Link>*/}
        {/*{user.isAdmin && <Link href="/admin"><a className={link}>Админ панель</a></Link>}*/}
      </nav>
    </div>
  )
}
