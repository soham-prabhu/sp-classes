import { createContext, useState } from "react";

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [loginStatus, setLoginStatus] = useState(
    sessionStorage.getItem('token') ? true : false
  );

  return (
    <LoginContext.Provider value={{ loginStatus, setLoginStatus }}>
      {children}
    </LoginContext.Provider>
  );
};