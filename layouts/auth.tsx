"use client";

import { useIsomorphicLayoutEffect } from "framer-motion";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AuthHeader, PublicHeader } from "@/components/common/header";
import { ScrollIndicator } from "@/components/common/scroll-indicator";
import { Sidebar } from "@/components/common/sidebar";
import { ADMIN_DASHBOARD, LOGIN, STUDENT_DASHBOARD } from "@/constants/route";
import { Peran } from "@/lib/generated/prisma";

export function ClientLayout({ children, role }: { children: React.ReactNode; role: Peran }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useIsomorphicLayoutEffect(() => {
    setIsMounted(true);
    const handleResize = () => setSidebarOpen(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (isMounted && window.innerWidth < 1024) setSidebarOpen(false);
  }, [pathname, isMounted]);

  if (pathname.startsWith(LOGIN)) {
    return <main className="min-h-screen w-full bg-white">{children}</main>;
  }

  if (pathname.startsWith(ADMIN_DASHBOARD) || pathname.startsWith(STUDENT_DASHBOARD)) {
    return (
      <>
        <Sidebar role={role} className={!isMounted ? "-translate-x-full lg:translate-x-0" : sidebarOpen ? "translate-x-0" : "-translate-x-full"} />
        {isMounted && sidebarOpen && <div className="fixed inset-0 z-30 bg-black/20 lg:hidden" onClick={() => setSidebarOpen(false)} />}
        <main className={`flex-1 transition-all duration-300 ease-in-out ${!isMounted ? "ml-0 lg:ml-64" : sidebarOpen ? "lg:ml-64" : "ml-0"}`}>
          <AuthHeader setSidebarOpen={setSidebarOpen} />
          {children}
        </main>
      </>
    );
  }

  return (
    <>
      <ScrollIndicator />
      <PublicHeader />
      {children}
    </>
  );
}