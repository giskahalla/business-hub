
'use client';

import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const useModal = () => {
  return useContext(ModalContext);
};

export const ModalProvider = ({children}) => {

  const [open, setOpen] = useState(false);
  const [content, setContent] = useState(null);

  const updateContent = (newData) => setContent(newData);

  const handleOpen = () => setOpen((prev) => !prev);

  return (
    <ModalContext.Provider value={{ open, handleOpen, updateContent, content }}>
      {children}
    </ModalContext.Provider>
  );
}