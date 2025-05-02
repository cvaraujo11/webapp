'use client';

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { useState } from 'react'; // Importar useState
import "./globals.css";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Estado para controlar a visibilidade da sidebar

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <div className="flex flex-col h-screen">
          <Header toggleSidebar={toggleSidebar} /> {/* Passar toggleSidebar para Header */}
          <div className="flex flex-1">
            <Sidebar isOpen={isSidebarOpen} /> {/* Passar isSidebarOpen para Sidebar */}
            <main className={`flex-1 p-6 overflow-y-auto ${isSidebarOpen ? 'md:ml-64' : ''}`}> {/* Ajustar margem principal */}
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
