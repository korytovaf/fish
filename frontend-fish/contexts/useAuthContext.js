import {createContext, useEffect, useState} from "react";

export const AuthContext = createContext({});
export function AuthContextWrapper({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("fish-token")
      if (token) {
        setIsAuth(true)
      }
      const userLocalStorage = localStorage.getItem("fish-user")
      if (userLocalStorage) {
        setUser(JSON.parse(userLocalStorage))
      }
    }
  }, [])

  return (
    <AuthContext.Provider value={[isAuth, setIsAuth, user, setUser]} >
      { children }
    </AuthContext.Provider>
  )
}
