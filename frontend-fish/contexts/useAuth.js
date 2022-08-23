import {createContext, useContext} from "react";

const AuthContext = createContext({});
export function AuthContextWrapper({ children }) {
  const state = {
    isAuth: false
  }

  return (
    <AuthContext.Provider value={state} >
      { children }
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  return useContext(AuthContext)
}
