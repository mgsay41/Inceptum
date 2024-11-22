import UserCard from "@/components/UserCard";
import React from "react";

const PageSuperInceptum = () => {
  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      <div className="w-full ">
        {/* USER CARD */}
        <div className="flex gap-4 justify-between">
          <UserCard type="student" />
          <UserCard type="Instructor" />
          <UserCard type="Assistant" />
          <UserCard type="Course" />
        </div>
      </div>
    </div>
  );
};

export default PageSuperInceptum;
