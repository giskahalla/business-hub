'use client';

import { Provider } from 'react-redux'
import { Suspense } from 'react';
import { CircularProgress } from '@mui/joy';

import { DrawerProvider, ModalProvider } from "@/components";
import { Sidebar } from "@/components";

import { store } from '@/services/store';

import "../globals.css";

export default function Main({ children }) {

  return (
    <Provider store={store}>
        <div className="flex flex-row justify-center">
        <div className="h-screen">
            <Sidebar />
        </div>
        <div className="flex-1 h-screen">
            <DrawerProvider>
            <ModalProvider>
              <Suspense fallback={<CircularProgress />}>
                {children}
              </Suspense>
            </ModalProvider>
            </DrawerProvider>
        </div>
        </div>
    </Provider>
  );
}

