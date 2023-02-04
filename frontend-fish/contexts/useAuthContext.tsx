import {createContext, useEffect, useState, FC, ReactNode, Dispatch, SetStateAction} from 'react';
import {userType} from '../types';
import { parseCookies } from 'nookies';
import {getUser} from '../api/fetchData';

type AuthContextType = {
  user: userType | null,
  setUser: Dispatch<SetStateAction<userType>>,
  isAuth: boolean,
  setIsAuth: Dispatch<SetStateAction<boolean>>,
  token: string,
}

type AuthContextWrapperType = {
  children: ReactNode,
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  isAuth: false,
  setIsAuth: () => {},
  token: null,
});

export const AuthContextWrapper:FC<AuthContextWrapperType> = ({ children }) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [user, setUser] = useState<userType | null>(null);
  const token = parseCookies(null, 'fish-auth-user')

  useEffect(() => {
    if (token['fish-auth-user']) {
      getUser().then((res) => {
        setIsAuth(true);
        setUser(res);
      })
    } else {
      setIsAuth(false);
      setUser(null);
    }
    }, [])

  const context: AuthContextType = {
    isAuth, setIsAuth, user, setUser, token: token['fish-auth-user'] || null
  }

  return (
    <AuthContext.Provider value={context} >
      { children }
    </AuthContext.Provider>
  )
}
