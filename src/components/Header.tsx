"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
  useAuth,
} from "@clerk/nextjs";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const { isSignedIn } = useAuth();

  useEffect(() => {
    // Redirect to /home when user logs in
    if (isSignedIn) {
      router.push("/home");
    }
  }, [isSignedIn, router]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToFeatures = () => {
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Image
            src="/tariky-logo.png"
            alt="Tariky Logo"
            width={80}
            height={80}
            className="w-28 h-28 object-contain"
          />
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <button
            onClick={scrollToFeatures}
            className="text-gray-600 hover:text-primary transition-colors"
          >
            Features
          </button>
          <button
            onClick={() =>
              document
                .getElementById("how-it-works")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="text-gray-600 hover:text-primary transition-colors"
          >
            How It Works
          </button>
        </nav>

        <div className="flex items-center space-x-4">
          <SignedOut>
            <SignInButton mode="modal">
              <Button className="bg-primary hover:bg-primary/90 text-white font-medium px-6">
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <Button
              className="bg-primary hover:bg-primary/90 text-white font-medium px-6"
              onClick={() => router.push("/home")}
            >
              Dashboard
            </Button>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </div>
    </header>
  );
};

export default Header;
