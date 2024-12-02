"use client"; // Mark this component as a Client Component

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation"; // Use usePathname instead of useRouter
import {
  FaHome,
  FaBook,
  FaClipboardList,
  FaBell,
  FaUser,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa"; // Example icons from React Icons

const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: <FaHome size={20} />, // Icon for Home
        label: "Home",
        href: "/home",
      },
      {
        icon: <FaBook size={20} />, // Icon for Courses
        label: "Courses",
        href: "/courses",
      },
      {
        icon: <FaClipboardList size={20} />, // Icon for My Applications
        label: "My Applications",
        href: "/my-applications",
      },
      {
        icon: <FaBell size={20} />, // Icon for Notifications
        label: "Notifications",
        href: "/notifications",
      },
    ],
  },
  {
    title: "OTHER",
    items: [
      {
        icon: <FaUser size={20} />, // Icon for Profile
        label: "Profile",
        href: "/profile",
      },
      {
        icon: <FaCog size={20} />, // Icon for Settings
        label: "Settings",
        href: "/settings",
      },
      {
        icon: <FaSignOutAlt size={20} />, // Icon for Logout
        label: "Logout",
        href: "/logout",
      },
    ],
  },
];

const Menu = () => {
  const pathname = usePathname(); // Get the current path using usePathname

  return (
    <div className="mt-4 text-sm px-5 pb-5">
      {menuItems.map((section) => (
        <div className="flex flex-col gap-2" key={section.title}>
          {/* Section Title */}
          <span className="hidden lg:block text-black font-light my-4">
            {section.title}
          </span>
          {/* Menu Items */}
          {section.items.map((item) => (
            <Link
              href={item.href}
              key={item.href}
              className={`flex items-center justify-center lg:justify-start gap-4 py-2 ${
                pathname === item.href
                  ? "text-[#ff005c]" // Change text color when active
                  : "text-black/90"
              }`}
            >
              <div className="flex items-center gap-2">
                {/* Icon */}
                {item.icon}
                {/* Label */}
                <span className="hidden lg:block">{item.label}</span>
              </div>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Menu;
