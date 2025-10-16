"use client"; // Ensure this is a client-side component

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import Menu from "@/components/Menu";
import Image from "next/image";
import Link from "next/link";
import BottomNav from "@/components/BottomNav"; // Import the bottom nav
import OnboardingModal from "@/components/OnboardingModal";
import { useOnboarding } from "@/hooks/useOnboarding";
import { usePathname } from "next/navigation"; // Add this import

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname(); // Get current path
  const { user } = useUser();
  const { needsOnboarding, loading } = useOnboarding();
  const [showOnboarding, setShowOnboarding] = useState(false);

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

  // Show onboarding modal when needed
  useEffect(() => {
    if (!loading && needsOnboarding) {
      setShowOnboarding(true);
    }
  }, [loading, needsOnboarding]);
  return (
    <div className="h-screen flex">
      {/* LEFT SIDEBAR */}
      <div
        className={`hidden md:block w-1/6 lg:w-1/6 xl:w-1/6 bg-white shadow-lg`}
      >
        <Link href="/" className="flex items-center justify-start pt-4 px-4">
          <Image
            src="/tariky-logo.png"
            alt="tariky-logo"
            width={100}
            height={100}
            className="hidden lg:block"
          />
        </Link>
        <Link href="/" className="flex items-center justify-center pt-1 px-4">
          <Image
            src="/tariky-icon.png"
            alt="tariky-icon"
            width={50}
            height={50}
            className="block lg:hidden"
          />
        </Link>
        <Menu />
      </div>
      {/* MAIN CONTENT */}
      <div className="bg-[#F7F8FA] w-full flex flex-col">
        {/* Mobile Logo - Only show on mobile and NOT on /profile */}
        {/* {isMobile && pathname !== "/profile" && (
          <div className="flex p-4">
            <Link href="/">
              <Image
                src="/tariky-logo.png"
                alt="tariky-logo"
                width={70}
                height={70}
              />
            </Link>
          </div>
        )} */}

        {/* Scrollable children */}
        <div className="flex-1 overflow-y-auto scrollbar-hide pt-1">
          {children}
        </div>
      </div>
      {/* Bottom Navigation (Only shown on mobile) */}
      {isMobile && <BottomNav />} {/* Display BottomNav if mobile */}

      {/* Onboarding Modal */}
      {showOnboarding && user && (
        <OnboardingModal
          clerkUser={user}
          onComplete={() => setShowOnboarding(false)}
        />
      )}
    </div>
  );
}
