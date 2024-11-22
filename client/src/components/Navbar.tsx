import Image from "next/image";
import React from "react";

const Navbar = () => {
  return (
    <div className="flex items-center justify-end p-4">
      {/* ICONS AND USERS */}
      <div className="flex items-center gap-6 ">
        <div className="rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative">
          <Image
            src="/announcement.png"
            alt="announcement"
            width={20}
            height={20}
          />
          <div className="absolute -top-3 -right-3 w-5 h-5 rounded-full bg-[#FF005C] text-white flex items-center justify-center text-xs">
            1
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-xs leading-3 font-medium">Mohamed Gamal</span>
          <span className="text-[10px] text-gray-500 text-right">Admin</span>
        </div>
        <Image
          src="/avatar.png"
          alt="avatar"
          width={36}
          height={36}
          className=" rounded-full"
        />
      </div>
    </div>
  );
};

export default Navbar;
