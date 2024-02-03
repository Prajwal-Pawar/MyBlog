import { createContext } from "react";

const AuthContext = createContext({
  token: null,
  setAuthToken: () => {},
  logout: () => {},
});

export default AuthContext;
