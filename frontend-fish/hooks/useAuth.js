import {AuthContext} from "../contexts/useAuthContext";
import {useContext} from "react";

export default function useAuth() {
  const [isAuth, setIsAuth, user, setUser] = useContext(AuthContext);

  const login = ({token, user}) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("fish-token", JSON.stringify(token))
      localStorage.setItem("fish-user", JSON.stringify(user))
      setIsAuth(true)
      setUser(user)
    }
  }

  const logout = () => {
    localStorage.removeItem('fish-token')
    localStorage.removeItem('fish-user')
    setIsAuth(false)
    setUser({})
  }

  return {
    login, logout, user, isAuth
  }
}
