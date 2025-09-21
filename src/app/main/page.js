'use client';

import { Provider } from 'react-redux'

import { DrawerProvider } from "@/components";
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
                {children}
            </DrawerProvider>
        </div>
        </div>
    </Provider>
  );
}

