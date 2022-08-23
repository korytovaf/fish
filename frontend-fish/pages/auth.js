import Form from "../ui/Form";
import { inputs } from "../styles/FormAddedProduct.module.css";
import Input from "../ui/Input";
import useInput from "../hooks/useInput";
import {fetchData} from "../api/fetchData";
import {useEffect, useState} from "react";

export default function AuthPage() {

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
    if (!validForm) return

    const newUser = {
      name: name.value,
      email: email.value,
      password: password.value,
    }
    const product = await fetchData('post', 'auth/signup', newUser);
    if (product.status === 200) {
      console.log(product)
      clearForm()
    }
  }

  useEffect(() => {
    if (name.valid.isValid && email.valid.isValid && password.valid.isValid && (confirm.value === password.value)) {
      setValidForm(true);
    } else {
      setValidForm(false);
    }
  }, [name, email, password, confirm]);


  return (
    <Form title="Регистрация">
      <div className={inputs}>
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
        <div>
          <button disabled={!validForm} onClick={onSubmitForm}>Зарегистрироваться</button>
        </div>
      </div>
    </Form>
  )
}
