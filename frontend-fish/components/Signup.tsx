import Input from "../ui/Input";
import useInput from "../hooks/useInput";
import {useEffect, useState} from "react";
// import {btn_group_submit, btn_link, error_message} from "../styles/Auth.module.css"
import useFetchApi from "../hooks/useFetchApi";
import {useAuth} from "../hooks/useAuth";
import {useRouter} from "next/router";
import Image from "next/image";
import spinner from "../public/icons/spinner.svg";

export default function Signup({ setIsLogin }) {
  const router = useRouter();
  const { load, requestApi, errorApi} = useFetchApi();
  const { login } = useAuth();

  const name = useInput("", { isEmpty: true });
  const email = useInput("", { isEmpty: true });
  const password = useInput("", { isEmpty: true, minLength: 6 });
  const confirm = useInput("", { isEmpty: true });
  const [validForm, setValidForm] = useState(false);

  const clearForm = () => {
    name.clear();
    email.clear();
    password.clear();
    confirm.clear();
  }

  const onSubmitForm = async (e) => {
    e.preventDefault();
    // if (!validForm) return
    //
    // const newUser = {
    //   name: name.value,
    //   email: email.value,
    //   password: password.value,
    // }
    //
    // const user = await requestApi("post", "auth/signup", newUser);
    //
    // if (user) {
    //   login(user)
    //   clearForm()
    //   await router.push("/")
    // }
  }

  const onChangeSetIsLogin = () => {
    setIsLogin(true)
  }

  useEffect(() => {
    if (name.valid.isValid && email.valid.isValid && password.valid.isValid && (confirm.value === password.value)) {
      setValidForm(true);
    } else {
      setValidForm(false);
    }
  }, [name, email, password, confirm]);

  return (
    <>
      {errorApi && <div>{errorApi}</div>}
      <Input
        value={name.value}
        handler={name.onChange}
        label="Имя пользователя"
        onBlur={name.onBlur}
        dirty={name.isDirty}
        valid={name.valid}
      />
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
      <Input
        value={confirm.value}
        handler={confirm.onChange}
        type="password"
        label="Подтверждение пароля"
        onBlur={confirm.onBlur}
        dirty={confirm.isDirty}
        valid={confirm.valid}
      />
      {/*<div className={btn_group_submit}>*/}
      {/*  <button disabled={!validForm} onClick={onSubmitForm} type="button">Зарегистрироваться</button>*/}
      {/*  <button className={btn_link} onClick={onChangeSetIsLogin} type="button">Войти</button>*/}
      {/*</div>*/}
      <div>
        <button disabled={!validForm} onClick={onSubmitForm} type="button">
          {load
            ? <Image src={spinner} height={40} width={40} alt="loading..." />
            : <span>Зарегистрироваться</span>
          }
        </button>
        <button onClick={onChangeSetIsLogin} type="button">Зарегистрироваться</button>
      </div>
    </>
  )
}
