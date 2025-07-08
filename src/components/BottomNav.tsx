"use client"; // Make sure this is a client-side component

import { usePathname } from "next/navigation"; // To get the current path
import Link from "next/link";
import { FaHome, FaBook, FaUser } from "react-icons/fa"; // Icons for Home, Courses, Profile

const BottomNav = () => {
  const pathname = usePathname(); // Get the current path

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200">
      <div className="flex justify-around items-center py-2">
        {/* Home Icon */}
        <Link
          href="/home"
          className={`flex flex-col items-center ${
            pathname === "/home" ? "text-[#ff005c]" : "text-gray-600"
          }`}
        >
          <FaHome size={24} />
          <span className="text-xs">Home</span>
        </Link>

        {/* Courses Icon */}
        <Link
          href="/courses"
          className={`flex flex-col items-center ${
            pathname === "/courses" ? "text-[#ff005c]" : "text-gray-600"
          }`}
        >
          <FaBook size={24} />
          <span className="text-xs">Courses</span>
        </Link>

        {/* Profile Icon */}
        <Link
          href="/profile"
          className={`flex flex-col items-center ${
            pathname === "/profile" ? "text-[#ff005c]" : "text-gray-600"
          }`}
        >
          <FaUser size={24} />
          <span className="text-xs">Profile</span>
        </Link>
      </div>
    </div>
  );
};

export default BottomNav;
