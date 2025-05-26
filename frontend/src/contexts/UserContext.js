import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user] = useState({
    name: "Michael",
    avatar: "/avatar/avatar.jpg",
  });

  const value = {
    user,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
