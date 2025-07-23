"use client";
import React, { useState, useEffect } from "react";
import { Star, Heart, Grid, List } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Categories
const categories = [
  { category: "All", title: "All" },
  { category: "programming", title: "Programming" },
  { category: "design", title: "Design" },
  { category: "business", title: "Business" },
  { category: "marketing", title: "Marketing" },
  { category: "photography", title: "Photography" },
  { category: "data-science", title: "Data Science" },
  { category: "mobile-dev", title: "Mobile Development" },
];

// Types
type Course = {
  id: number;
  title: string;
  slug: string;
  description?: string;
  shortDescription?: string;
  courseImage?: string;
  courseFee: string; // Prisma Decimal comes as string
  rating?: number;
  totalRatings?: number;
  level: string;
  duration: number;
  courseType: string;
  language: string;
  courseProvider?: {
    companyName: string;
    logo?: string;
  };
  instructor?: {
    firstName: string;
    lastName: string;
    profilePicture?: string;
  };
  createdAt: string;
  // Add other fields as needed
};

type FeaturedCardProps = {
  item: Course;
  onPress: () => void;
};

const FeaturedCard: React.FC<FeaturedCardProps> = ({ item, onPress }) => (
  <div
    onClick={onPress}
    className="relative w-56 sm:w-60 md:w-64 lg:w-72 h-72 sm:h-80 md:h-84 cursor-pointer rounded-2xl overflow-hidden flex-shrink-0"
  >
    {/* Show course image if available */}
    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
      {item.courseImage ? (
        <img
          src={item.courseImage}
          alt={item.title}
          className="object-cover w-full h-full"
        />
      ) : (
        <span className="text-2xl font-bold">{item.title}</span>
      )}
    </div>
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
    <div className="absolute top-3 right-3 sm:top-5 sm:right-5 bg-white/90 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full flex items-center gap-1">
      <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current text-teal-500" />
      <span className="text-xs font-bold text-teal-500">
        {item.rating ?? "4.8"}
      </span>
    </div>
    <div className="absolute bottom-3 left-3 right-3 sm:bottom-5 sm:left-5 sm:right-5 text-white">
      <h3 className="text-lg sm:text-xl font-extrabold truncate">
        {item.title}
      </h3>
      <p className="text-sm sm:text-base truncate">
        {item.courseProvider?.companyName}
      </p>
      <div className="flex items-center justify-between w-full mt-1 sm:mt-2">
        <span className="text-lg sm:text-xl font-extrabold">
          {item.courseFee} EGP
        </span>
      </div>
    </div>
  </div>
);

type CourseCardProps = {
  item: Course;
  onPress: () => void;
  viewMode?: "grid" | "list";
};

const CourseCard: React.FC<CourseCardProps> = ({
  item,
  onPress,
  viewMode = "grid",
}) => (
  <div
    onClick={onPress}
    className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer p-3 sm:p-4 border border-gray-100"
  >
    <div className="relative mb-3">
      {/* Show course image if available */}
      <div className="w-full h-40 sm:h-48 bg-gray-200 flex items-center justify-center rounded-lg">
        {item.courseImage ? (
          <img
            src={item.courseImage}
            alt={item.title}
            className="object-cover w-full h-full rounded-lg"
          />
        ) : (
          <span className="text-base font-bold">{item.title}</span>
        )}
      </div>
      <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-full flex items-center gap-1">
        <Star className="w-3 h-3 fill-current text-yellow-500" />
        <span className="text-xs font-bold text-gray-700">
          {item.rating ?? "4.8"}
        </span>
      </div>
    </div>
    <div className="space-y-2">
      <h3 className="text-base sm:text-lg font-bold text-gray-800 line-clamp-2">
        {item.title}
      </h3>
      <p className="text-sm text-gray-600">
        {item.courseProvider?.companyName}
      </p>
      <div className="flex flex-wrap gap-1">
        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
          {item.instructor
            ? `${item.instructor.firstName} ${item.instructor.lastName}`
            : ""}
        </span>
      </div>
      <div className="flex items-center justify-between pt-2">
        <span className="text-lg font-bold text-teal-600">
          {item.courseFee} EGP
        </span>
        <Heart className="w-5 h-5 text-gray-400 hover:text-red-500 transition-colors" />
      </div>
    </div>
  </div>
);

const Filters: React.FC<{
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}> = ({ selectedCategory, onCategoryChange }) => (
  <div className="flex gap-2 sm:gap-3 md:gap-4 overflow-x-auto pb-2 mt-3 scrollbar-hide">
    <style jsx>{`
      .scrollbar-hide {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
      .scrollbar-hide::-webkit-scrollbar {
        display: none;
      }
    `}</style>
    {categories.map((item, index) => (
      <button
        key={index}
        onClick={() => onCategoryChange(item.category)}
        className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full whitespace-nowrap text-xs sm:text-sm font-medium transition-colors ${
          selectedCategory === item.category
            ? "bg-teal-500 text-white shadow-md"
            : "bg-teal-50 text-gray-800 border border-teal-200 hover:bg-teal-100"
        }`}
      >
        {item.title}
      </button>
    ))}
  </div>
);

const NoResults: React.FC = () => (
  <div className="flex flex-col items-center my-8 px-4">
    <div className="w-full max-w-sm h-48 sm:h-64 md:h-80 bg-gray-100 rounded-lg flex items-center justify-center">
      <span className="text-gray-400 text-4xl sm:text-6xl">📭</span>
    </div>
    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mt-4 sm:mt-5 text-center">
      No Result
    </h2>
    <p className="text-sm sm:text-base text-gray-500 mt-2 text-center">
      We could not find any result
    </p>
  </div>
);

// Main App Component
const CoursesApp: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    async function fetchCourses() {
      setLoading(true);
      const res = await fetch("/api/courses");
      const data = await res.json();
      setCourses(data);
      setLoading(false);
    }
    fetchCourses();
  }, []);

  const handleCardPress = (slug: string) => {
    router.push(`/courses/${slug}`);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    // Optionally filter courses by category if you have a category field
    // Otherwise, fetch again from API with category filter
  };

  // Fetch user from Clerk
  const { user, isLoaded } = useUser();

  // Featured courses: just pick first 3 for demo
  const featuredCourses = courses.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50 mb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Header */}
        <div className="flex items-center justify-between mt-2 sm:mt-4 lg:mt-5">
          <Image
            src="/tariky-logo.png"
            alt="tariky-logo"
            width={70}
            height={70}
            className="block md:hidden"
          />
          <p className="hidden md:block"></p>
          {isLoaded && (
            <div className="flex items-center ">
              <img
                src={
                  user?.imageUrl
                    ? user.imageUrl
                    : "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                }
                alt="Profile"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
              />
              <div className="ml-2 sm:ml-3">
                <p className="text-xs text-gray-500">Welcome,</p>
                <p className="text-sm sm:text-base font-medium text-gray-800">
                  {user?.firstName ?? "User"}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Featured Section */}
        {courses.length >= 3 && (
          <div className="my-6 sm:my-8 bg-white rounded-lg p-4 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">
                Featured
              </h2>
            </div>
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-teal-500"></div>
              </div>
            ) : (
              <div className="flex gap-3 sm:gap-4 lg:gap-5 overflow-x-auto pb-2 scrollbar-hide">
                <style jsx>{`
                  .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                  }
                  .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                  }
                `}</style>
                {featuredCourses.map((item) => (
                  <FeaturedCard
                    key={`featured_${item.id}`}
                    item={item}
                    onPress={() => handleCardPress(item.slug)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Courses Section */}
        <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">
              Courses
            </h2>
            <div className="flex items-center gap-2">
              <button
                className="text-sm sm:text-base font-bold text-teal-500 hover:text-teal-600 transition-colors"
                onClick={() => router.push("/courses")}
              >
                See All
              </button>
              {/* View Mode Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1 ml-3">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "grid"
                      ? "bg-white shadow-sm"
                      : "hover:bg-gray-200"
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "list"
                      ? "bg-white shadow-sm"
                      : "hover:bg-gray-200"
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          <Filters
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
          {/* Courses Grid */}
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-teal-500"></div>
            </div>
          ) : courses.length === 0 ? (
            <NoResults />
          ) : (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 mt-4 sm:mt-6"
                  : "space-y-4 mt-4 sm:mt-6"
              }
            >
              {courses.map((item) => (
                <CourseCard
                  key={item.id}
                  item={item}
                  onPress={() => handleCardPress(item.slug)}
                  viewMode={viewMode}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursesApp;
