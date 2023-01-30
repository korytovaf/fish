import {AuthContext} from "../contexts/useAuthContext";
import {useContext} from "react";
import {userType} from '../types';

export const useAuth = () => {
  const {isAuth, setIsAuth, user, setUser} = useContext(AuthContext);

  const login: (user: userType) => void = (user) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("fish-user", JSON.stringify(user))
      if (user.token) {
        setIsAuth(true)
        setUser(user)
      }
    }
  }

  const logout: ()=>void = () => {
    localStorage.removeItem('fish-user')
    setIsAuth(false)
    setUser(null)
  }

  return {
    login, logout, user, isAuth
  }
}
