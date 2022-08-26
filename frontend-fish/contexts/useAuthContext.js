import {createContext, useEffect, useState} from "react";

export const AuthContext = createContext({});
export function AuthContextWrapper({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("fish-user")
      if (user) {
        setIsAuth(true)
        setUser(JSON.parse(user))
      }
    }
  }, [])

  return (
    <AuthContext.Provider value={[isAuth, setIsAuth, user, setUser]} >
      { children }
    </AuthContext.Provider>
  )
}
