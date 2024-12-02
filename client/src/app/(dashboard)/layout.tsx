"use client"; // Ensure this is a client-side component

import { useState, useEffect } from "react";
import Menu from "@/components/Menu";
import Image from "next/image";
import Link from "next/link";
import BottomNav from "@/components/BottomNav"; // Import the bottom nav

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size changes (mobile vs desktop)
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Consider screens smaller than 768px as mobile
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="h-screen flex">
      {/* LEFT SIDEBAR */}
      <div
        className={`hidden md:block w-1/6 lg:w-1/6 xl:w-1/6 bg-white shadow-lg`}
      >
        <Link href="/" className="flex items-center justify-start pt-3 px-4">
          <Image
            src="/logo.png"
            alt="logo"
            width={150}
            height={150}
            className="hidden lg:block"
          />
        </Link>
        <Link href="/" className="flex items-center justify-center pt-3 px-4">
          <Image
            src="/logo2.png"
            alt="logo"
            width={50}
            height={50}
            className="block lg:hidden"
          />
        </Link>
        <Menu />
      </div>
      {/* MAIN CONTENT */}
      <div className="bg-[#F7F8FA] w-full flex flex-col">
        {/* Mobile Logo - Only show on mobile */}
        {isMobile && (
          <div className="flex p-4 bg-white shadow-md">
            <Link href="/">
              <Image
                src="/logo.png" // Use your logo path
                alt="Logo"
                width={150} // Adjust the width
                height={60} // Adjust the height
              />
            </Link>
          </div>
        )}

        {/* Scrollable children */}
        <div className="flex-1 overflow-y-auto scrollbar-hide pt-1">
          {children}
        </div>
      </div>
      {/* Bottom Navigation (Only shown on mobile) */}
      {isMobile && <BottomNav />} {/* Display BottomNav if mobile */}
    </div>
  );
}
