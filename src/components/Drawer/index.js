
'use client';

import { createContext, useContext, useState } from "react";

const DrawerContext = createContext();

export const useDrawer = () => {
  return useContext(DrawerContext);
};

export const DrawerProvider = ({ children }) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [data, setData] = useState(null);

  const toggleDrawer = () => setOpenDrawer((prev) => !prev);
  const updateData = (newData) => setData(newData);

  return (
    <DrawerContext.Provider value={{ openDrawer, toggleDrawer, data, updateData }}>
      {children}
    </DrawerContext.Provider>
  );
};
