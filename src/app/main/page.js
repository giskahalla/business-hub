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
        <div className="flex">
          <div className="h-screen w-1/5">
              <Sidebar />
          </div>
          <div className="w-4/5">
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

