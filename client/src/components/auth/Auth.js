import { useState, createContext, useContext } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const savedata = () => {
    if (localStorage.User) {
      const data = JSON.parse(localStorage.User);
      setUser({ data });
    }
  };

  const login = (user) => {
    setUser({ user });
    localStorage.setItem("User", JSON.stringify(user));
  };

  const logout = () => {
    setUser({});
    localStorage.removeItem("User");
  };

  return (
    <AuthContext.Provider value={(user, login, logout, savedata)}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
