import Form from "../ui/Form";
// import { inputs } from "../styles/FormAddedProduct.module.css";
import Signup from "../components/Signup";
import {useState} from "react";
import Login from "../components/Login";

export default function AuthPage() {

  const [isLogin, setIsLogin] = useState(true);


  return (
    <Form title={isLogin ? "Авторизация" : "Регистрация"}>
      <div>
        {isLogin ? <Login setIsLogin={setIsLogin} /> : <Signup setIsLogin={setIsLogin} />}
      </div>
    </Form>
  )
}
