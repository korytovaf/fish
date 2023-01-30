import {createContext, useEffect, useState, FC, ReactNode, Dispatch, SetStateAction} from 'react';
import {userType} from '../types';


type AuthContextType = {
  user: userType | null,
  setUser: Dispatch<SetStateAction<userType>>,
  isAuth: boolean,
  setIsAuth: Dispatch<SetStateAction<boolean>>,
}

type AuthContextWrapperType = {
  children: ReactNode,
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  isAuth: false,
  setIsAuth: () => {},
});

export const AuthContextWrapper:FC<AuthContextWrapperType> = ({ children }) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [user, setUser] = useState<userType | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("fish-user")
      if (user) {
        setIsAuth(true)
        setUser(JSON.parse(user))
      }
    }
  }, [])

  const context: AuthContextType = {
    isAuth, setIsAuth, user, setUser
  }

  return (
    <AuthContext.Provider value={context} >
      { children }
    </AuthContext.Provider>
  )
}
