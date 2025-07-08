"use client";
import { useClerk, useUser } from "@clerk/nextjs";
import {
  IoLogOutOutline,
  IoCameraOutline,
  IoBookOutline,
  IoCheckmarkCircleOutline,
  IoTimeOutline,
  IoTrophyOutline,
  IoSettingsOutline,
  IoHelpCircleOutline,
  IoChevronForwardOutline,
} from "react-icons/io5";
import { PiCertificate } from "react-icons/pi";

export default function Profile() {
  const { signOut } = useClerk();
  const { user, isLoaded } = useUser();

  const statsData = [
    {
      label: "Courses Enrolled",
      value: 5,
      icon: IoBookOutline,
    },
    {
      label: "Completed",
      value: 3,
      icon: IoCheckmarkCircleOutline,
    },
    {
      label: "Hours Learned",
      value: 42,
      icon: IoTimeOutline,
    },
    {
      label: "Certificates",
      value: 2,
      icon: IoTrophyOutline,
    },
  ];

  const menuItems = [
    { label: "My Courses", icon: IoBookOutline },
    { label: "Certificates", icon: PiCertificate },
    { label: "Settings", icon: IoSettingsOutline },
    { label: "Help & Support", icon: IoHelpCircleOutline },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Profile
          </h1>
          <button
            className="text-red-500 hover:text-red-600 transition-colors p-2"
            onClick={() => signOut()}
          >
            <IoLogOutOutline className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Profile Section */}
          <div className="lg:col-span-1">
            <div className="flex flex-col items-center mb-8 lg:mb-0">
              <div className="relative">
                <button className="relative group">
                  <img
                    src={
                      isLoaded && user?.imageUrl
                        ? user.imageUrl
                        : "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg"
                    }
                    alt="Profile"
                    className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 rounded-full object-cover"
                  />
                  {/* <div className="absolute bottom-0 right-0 bg-primary rounded-full p-2">
                    <IoCameraOutline className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div> */}
                </button>
              </div>

              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mt-4 text-center">
                {isLoaded && user?.fullName ? user.fullName : "Mohamed Gamal"}
              </h2>
              <p className="text-gray-600 text-sm sm:text-base text-center">
                Full Stack Developer
              </p>
            </div>
          </div>

          {/* Stats and Menu Section */}
          <div className="lg:col-span-2 space-y-6 lg:space-y-8">
            {/* Stats Grid */}
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
                Learning Stats
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {statsData.map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <div
                      key={index}
                      className="bg-gray-50 p-3 sm:p-4 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center mb-2">
                        <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-primary mr-2" />
                        <span className="text-xl sm:text-2xl font-bold text-gray-800">
                          {stat.value}
                        </span>
                      </div>
                      <p className="text-gray-600 text-xs sm:text-sm">
                        {stat.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Menu Items */}
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
                Quick Actions
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                {menuItems.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <button
                      key={index}
                      className="flex items-center justify-between py-3 sm:py-4 px-3 sm:px-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left"
                    >
                      <div className="flex items-center">
                        <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-primary mr-3" />
                        <span className="text-sm sm:text-base text-gray-800 font-medium">
                          {item.label}
                        </span>
                      </div>
                      <IoChevronForwardOutline className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
