
'use client';

import { createContext, useContext, useState } from "react";

const DrawerContext = createContext();

export const useDrawer = () => useContext(DrawerContext);

export const DrawerProvider = ({ children }) => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = () => setOpenDrawer((prev) => !prev);

  return (
    <DrawerContext.Provider value={{ openDrawer, toggleDrawer }}>
      {children}
    </DrawerContext.Provider>
  );
};
