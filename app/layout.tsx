"use client";

import "./globals.css";
import Sidebar from "./components/sidebar";
import Searchbar from "./components/searchbar";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { checkAdmin } from "./lib/api";


export default function RootLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
      const check = async () => {
          const token = localStorage.getItem('jwt');
          if (!token) {
              router.push('/login');
              return;
          }
          const result = await checkAdmin(token);
          if (result) {
              router.push('/');
          } else {
              router.push('/login');
          }
      }
      check();
  }, []);
  return pathname === '/login' ? <>{children}</> : (
    <html>
      <body>
      <div className="min-h-screen flex">
          <Sidebar/>

          {/* Main Content */}
          <main className="flex-1 bg-gray-100 p-6">
              <Searchbar/>
              {children}
          </main>
      </div>
      </body>
      </html>
  );
}
