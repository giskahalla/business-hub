
'use client';

import { createContext, useContext, useState } from "react";

import { Box } from "@mui/material"
import { Drawer, ModalClose, DialogTitle, DialogContent } from "@mui/joy"

import { MainButton } from "@/components";

import { BTN_STYLE} from "@/constants";

import '@/app/globals.css';

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

export const DrawerWrapper = ({ drawerTitle, drawerContent, onClose, onSubmit }) => {

    const { openDrawer } = useDrawer();

    return (
        <Drawer open={openDrawer} anchor="right" onClose={onClose}>
            <ModalClose />
             <DialogTitle sx={{ padding: '10px'}}>
                {drawerTitle}
             </DialogTitle>
            <DialogContent sx={{ padding: '0 20px', height: '90%' }}>
              {drawerContent}
            </DialogContent>
            <Box
                sx={{
                    display: 'flex',
                    gap: 1,
                    p: '0 20px',
                    pb: '15px',
                    mt: '15px',
                    borderTop: '1px solid',
                    borderColor: 'divider',
                }}
                >
                <div style={{ display: 'flex', gap: 10, textAlign: "right", marginTop: 20 }}>
                    <MainButton type="submit" title='Submit' onClick={onSubmit}/>
                    <MainButton variant="outlined" onClick={onClose} title='Cancel' style={{...BTN_STYLE.outlined }}/>
                </div>
            </Box>
        </Drawer>
    )
}
