"use client";
import React, { useState } from "react";
import { Star, Heart, Bell, Search, Filter, Grid, List } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Dummy data
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

const dummyCourses = [
  {
    id: "1",
    Title: "Complete React Native Development Course",
    Image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop",
    Rating: 4.8,
    Fees: 1200,
    provider: { Name: "Tech Academy" },
    category: "programming",
    students: 12500,
    duration: "40 hours",
    level: "Intermediate",
  },
  {
    id: "2",
    Title: "UI/UX Design Masterclass - Complete Guide",
    Image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
    Rating: 4.9,
    Fees: 950,
    provider: { Name: "Design Studio" },
    category: "design",
    students: 8900,
    duration: "35 hours",
    level: "Beginner",
  },
  {
    id: "3",
    Title: "Digital Marketing Strategy & Analytics",
    Image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
    Rating: 4.7,
    Fees: 800,
    provider: { Name: "Marketing Pro" },
    category: "marketing",
    students: 15600,
    duration: "25 hours",
    level: "Intermediate",
  },
  {
    id: "4",
    Title: "Professional Photography Fundamentals",
    Image:
      "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400&h=300&fit=crop",
    Rating: 4.6,
    Fees: 600,
    provider: { Name: "Photo School" },
    category: "photography",
    students: 6700,
    duration: "20 hours",
    level: "Beginner",
  },
  {
    id: "5",
    Title: "Business Analytics & Data Visualization",
    Image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
    Rating: 4.8,
    Fees: 1100,
    provider: { Name: "Business Hub" },
    category: "business",
    students: 9800,
    duration: "30 hours",
    level: "Advanced",
  },
  {
    id: "6",
    Title: "Full Stack Web Development Bootcamp",
    Image:
      "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400&h=300&fit=crop",
    Rating: 4.9,
    Fees: 1500,
    provider: { Name: "Code Academy" },
    category: "programming",
    students: 18900,
    duration: "60 hours",
    level: "Intermediate",
  },
  {
    id: "7",
    Title: "Data Science with Python & Machine Learning",
    Image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
    Rating: 4.7,
    Fees: 1350,
    provider: { Name: "Data Institute" },
    category: "data-science",
    students: 7500,
    duration: "50 hours",
    level: "Advanced",
  },
  {
    id: "8",
    Title: "iOS App Development with Swift",
    Image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop",
    Rating: 4.6,
    Fees: 1250,
    provider: { Name: "Mobile Masters" },
    category: "mobile-dev",
    students: 5600,
    duration: "45 hours",
    level: "Intermediate",
  },
  {
    id: "9",
    Title: "Advanced Graphic Design & Branding",
    Image:
      "https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&h=300&fit=crop",
    Rating: 4.8,
    Fees: 900,
    provider: { Name: "Creative Studio" },
    category: "design",
    students: 11200,
    duration: "28 hours",
    level: "Advanced",
  },
  {
    id: "10",
    Title: "Social Media Marketing Mastery",
    Image:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop",
    Rating: 4.5,
    Fees: 650,
    provider: { Name: "Social Media Pro" },
    category: "marketing",
    students: 13400,
    duration: "18 hours",
    level: "Beginner",
  },
  {
    id: "11",
    Title: "Entrepreneurship & Business Strategy",
    Image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
    Rating: 4.7,
    Fees: 1050,
    provider: { Name: "Business Leaders" },
    category: "business",
    students: 8700,
    duration: "32 hours",
    level: "Intermediate",
  },
  {
    id: "12",
    Title: "Wedding Photography Workshop",
    Image:
      "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=400&h=300&fit=crop",
    Rating: 4.9,
    Fees: 750,
    provider: { Name: "Wedding Pros" },
    category: "photography",
    students: 4300,
    duration: "15 hours",
    level: "Intermediate",
  },
];

const featuredCourses = dummyCourses.slice(0, 3);

// Types
type Course = (typeof dummyCourses)[number];

type FeaturedCardProps = {
  item: Course;
  onPress: () => void;
};

const FeaturedCard: React.FC<FeaturedCardProps> = ({ item, onPress }) => {
  return (
    <div
      onClick={onPress}
      className="relative w-56 sm:w-60 md:w-64 lg:w-72 h-72 sm:h-80 md:h-84 cursor-pointer rounded-2xl overflow-hidden flex-shrink-0"
    >
      <img
        src={item.Image}
        alt={item.Title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

      <div className="absolute top-3 right-3 sm:top-5 sm:right-5 bg-white/90 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full flex items-center gap-1">
        <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current text-teal-500" />
        <span className="text-xs font-bold text-teal-500">{item.Rating}</span>
      </div>

      <div className="absolute bottom-3 left-3 right-3 sm:bottom-5 sm:left-5 sm:right-5 text-white">
        <h3 className="text-lg sm:text-xl font-extrabold truncate">
          {item.Title}
        </h3>
        <p className="text-sm sm:text-base truncate">{item.provider?.Name}</p>
        <div className="flex items-center justify-between w-full mt-1 sm:mt-2">
          <span className="text-lg sm:text-xl font-extrabold">
            {item.Fees} EGP
          </span>
        </div>
      </div>
    </div>
  );
};

// Enhanced Course Card (from CoursesPage)
type CourseCardProps = {
  item: Course;
  onPress: () => void;
  viewMode?: "grid" | "list";
};

const CourseCard: React.FC<CourseCardProps> = ({
  item,
  onPress,
  viewMode = "grid",
}) => {
  if (viewMode === "list") {
    return (
      <div
        onClick={onPress}
        className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer p-4 sm:p-6 border border-gray-100"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-shrink-0">
            <img
              src={item.Image}
              alt={item.Title}
              className="w-full sm:w-48 h-32 sm:h-28 object-cover rounded-lg"
            />
            <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-full flex items-center gap-1">
              <Star className="w-3 h-3 fill-current text-yellow-500" />
              <span className="text-xs font-bold text-gray-700">
                {item.Rating}
              </span>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                {item.Title}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                {item.provider?.Name}
              </p>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  {item.level}
                </span>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  {item.duration}
                </span>
                <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                  {item.students.toLocaleString()} students
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-teal-600">
                {item.Fees} EGP
              </span>
              <Heart className="w-5 h-5 text-gray-400 hover:text-red-500 transition-colors" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onPress}
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer p-3 sm:p-4 border border-gray-100"
    >
      <div className="relative mb-3">
        <img
          src={item.Image}
          alt={item.Title}
          className="w-full h-40 sm:h-48 object-cover rounded-lg"
        />
        <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-full flex items-center gap-1">
          <Star className="w-3 h-3 fill-current text-yellow-500" />
          <span className="text-xs font-bold text-gray-700">{item.Rating}</span>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-base sm:text-lg font-bold text-gray-800 line-clamp-2">
          {item.Title}
        </h3>
        <p className="text-sm text-gray-600">{item.provider?.Name}</p>

        <div className="flex flex-wrap gap-1">
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
            {item.level}
          </span>
          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
            {item.duration}
          </span>
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-lg font-bold text-teal-600">
            {item.Fees} EGP
          </span>
          <Heart className="w-5 h-5 text-gray-400 hover:text-red-500 transition-colors" />
        </div>
      </div>
    </div>
  );
};

const Filters: React.FC<{
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}> = ({ selectedCategory, onCategoryChange }) => {
  return (
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
};

const NoResults: React.FC = () => {
  return (
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
};

// Main App Component
const CoursesApp: React.FC = () => {
  const [courses, setCourses] = useState(dummyCourses);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [loading] = useState(false);

  const router = useRouter(); // Add this line

  const handleCardPress = (id: string) => {
    router.push(`/courses/1`); // Redirect to course details page
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);

    // Filter courses based on category
    if (category === "All") {
      setCourses(dummyCourses);
    } else {
      const filtered = dummyCourses.filter(
        (course) => course.category === category
      );
      setCourses(filtered);
    }
  };

  // Fetch user from Clerk
  const { user, isLoaded } = useUser();

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
          />
          <div className="flex items-center">
            <img
              src={
                isLoaded && user?.imageUrl
                  ? user.imageUrl
                  : "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
              }
              alt="Profile"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
            />
            <div className="ml-2 sm:ml-3">
              <p className="text-xs text-gray-500">Welcome,</p>
              <p className="text-sm sm:text-base font-medium text-gray-800">
                {isLoaded && user?.firstName ? user.firstName : "User"}
              </p>
            </div>
          </div>
        </div>

        {/* Featured Section */}
        <div className="my-6 sm:my-8 bg-white rounded-lg p-4 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">
              Featured
            </h2>
            <button className="text-sm sm:text-base font-bold text-teal-500 hover:text-teal-600 transition-colors">
              See All
            </button>
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
                  onPress={() => handleCardPress(item.id)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Courses Section */}
        <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">
              Courses
            </h2>
            <div className="flex items-center gap-2">
              <button className="text-sm sm:text-base font-bold text-teal-500 hover:text-teal-600 transition-colors">
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
                  onPress={() => handleCardPress(item.id)}
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
