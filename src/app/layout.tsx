'use client'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from 'react-redux'
import {store} from '@/app/utils/store'
const inter = Inter({ subsets: ["latin"] });

/* export const metadata: Metadata = {
  title: "Hotel Customer Relationship Management System Project",
  description: "Система управления взаимоотношениями с клиентами отеля",
};  */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   
    <html lang="en">
      <Provider store={store}>
          <body className={inter.className}>{children}</body>
      </Provider>
    </html>
    
  );
}
