import UserCard from "@/components/UserCard";
import React from "react";

import {
  Bell,
  DollarSign,
  Users,
  BookOpen,
  Briefcase,
  GraduationCap,
  UserCog,
  HeartHandshake,
} from "lucide-react";

const colors = {
  blue: "#3b82f6",
  green: "#10b981",
  yellow: "#f59e0b",
  purple: "#8b5cf6",
  pink: "#ec4899",
  indigo: "#6366f1",
  red: "#ef4444",
  orange: "#f97316",
};

const PageSuperInceptum = () => {
  return (
    <div className="p-6 flex gap-4 flex-col md:flex-row">
      <div className="w-full ">
        {/* USER CARD */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <UserCard
            icon={<Users />}
            title="Students"
            value="1,000"
            subtext="80 new this month"
            color={colors.blue}
          />
          <UserCard
            icon={<UserCog />}
            title="Trainers"
            value="200"
            subtext="15 new this month"
            color={colors.green}
          />
          <UserCard
            icon={<HeartHandshake />}
            title="Assistants"
            value="34"
            subtext="5 new this month"
            color={colors.yellow}
          />
          <UserCard
            icon={<BookOpen />}
            title="Courses"
            value="50"
            subtext="Active: 30, Upcoming: 20"
            color={colors.purple}
          />
        </div>
      </div>
    </div>
  );
};

export default PageSuperInceptum;
