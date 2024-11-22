import React from "react";

type UserCardProps = {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  subtext: string;
  color: string;
};

const UserCard = ({ icon, title, value, subtext, color }: UserCardProps) => {
  return (
    <div
      className="bg-white rounded-lg p-6 shadow-lg border-t-4"
      style={{ borderColor: color }}
    >
      <div className="flex items-center mb-2">
        <div className="mr-3" style={{ color }}>
          {icon}
        </div>
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      </div>
      <p className="text-3xl font-bold mb-1 text-gray-800">{value}</p>
      <p className="text-sm text-gray-600">{subtext}</p>
    </div>
  );
};

export default UserCard;
