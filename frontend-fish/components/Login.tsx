import Input from "../ui/Input";
import useInput from "../hooks/useInput";
import {useEffect, useState} from "react";
// import {btn_group_submit, btn_link, error_message} from "../styles/Auth.module.css";
import { useRouter } from "next/router";
import Image from "next/image";
import spinner from "../public/icons/spinner.svg";
import {useAuth} from "../hooks/useAuth";
import useFetchApi from "../hooks/useFetchApi";

export default function Login({ setIsLogin }) {
  // const router = useRouter();
  const { load, requestApi, errorApi} = useFetchApi();
  // const { login } = useAuth();

  const email = useInput("", { isEmpty: true });
  const password = useInput("", { isEmpty: true });
  const [validForm, setValidForm] = useState(false);

  const clearForm = () => {
    email.clear();
    password.clear();
  }

  const onSubmitForm = async (e) => {
    e.preventDefault();
    // if (!validForm) return
    //
    // const newUser = {
    //   email: email.value,
    //   password: password.value,
    // }
    // // const user = await requestApi("post", "auth/login", newUser);
    // if (user) {
    //   login(user)
    //   clearForm()
    //   await router.push("/")
    // }
  }

  const onChangeSetIsLogin = () => {
    setIsLogin(false)
  }

  useEffect(() => {
    if (email.valid.isValid && password.valid.isValid) {
      setValidForm(true);
    } else {
      setValidForm(false);
    }
  }, [email, password]);

  return (
    <>
      {errorApi && <div>{errorApi}</div>}
      <Input
        value={email.value}
        handler={email.onChange}
        label="Email"
        onBlur={email.onBlur}
        dirty={email.isDirty}
        valid={email.valid}
      />
      <Input
        value={password.value}
        handler={password.onChange}
        type="password"
        label="Пароль"
        onBlur={password.onBlur}
        dirty={password.isDirty}
        valid={password.valid}
      />
      <div>
        <button disabled={!validForm} onClick={onSubmitForm} type="button">
          {load
            ? <Image src={spinner} height={40} width={40} alt="loading..." />
            : <span>Войти</span>
          }
        </button>
        <button onClick={onChangeSetIsLogin} type="button">Зарегистрироваться</button>
      </div>
    </>
  )
}
