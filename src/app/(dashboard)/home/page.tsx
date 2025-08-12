"use client";
import React, { useState, useEffect } from "react";
import { Star, Heart, Grid, List } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Categories - updated to match your database categories
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

// Updated types to match your backend response
type Course = {
  id: number;
  title: string;
  slug: string;
  description?: string;
  shortDescription?: string;
  courseImage?: string;
  courseFee: string; // Prisma Decimal comes as string
  rating?: number;
  totalRatings: number;
  level: string;
  duration: number;
  courseType: string;
  language: string;
  address?: string;
  city?: string;
  country?: string;
  venue?: string;
  totalLessons?: number;
  totalProjects?: number;
  hasCapstoneProject: boolean;
  hasCertificate: boolean;
  prerequisites: string[];
  learningOutcomes: string[];
  maxStudents?: number;
  currentStudents: number;
  startDate?: string;
  endDate?: string;
  enrollmentDeadline?: string;
  status: string;
  courseProvider?: {
    id: string;
    companyName: string;
    logo?: string;
    rating?: number;
    verified: boolean;
  };
  instructor?: {
    id: string;
    firstName: string;
    lastName: string;
    profilePicture?: string;
    rating?: number;
    experience?: number;
    specialization?: string;
  };
  category: {
    id: number;
    name: string;
    slug: string;
    icon?: string;
    color?: string;
  };
  roadmap?: {
    id: number;
    title: string;
    slug: string;
  };
  enrolledStudentsCount: number;
  createdAt: string;
  updatedAt?: string;
};

// API Response type
type ApiResponse = {
  success: boolean;
  message: string;
  data: Course[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
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
        <Image
          src={item.courseImage}
          width={400}
          height={300}
          alt={item.title}
          className="object-cover w-full h-full"
        />
      ) : (
        <div className="flex flex-col items-center justify-center p-4 text-center">
          <div className="text-4xl mb-2">📚</div>
          <span className="text-lg font-bold text-gray-600">{item.title}</span>
        </div>
      )}
    </div>
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
    <div className="absolute top-3 right-3 sm:top-5 sm:right-5 bg-white/90 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full flex items-center gap-1">
      <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current text-yellow-500" />
      <span className="text-xs font-bold text-gray-700">
        {item.rating ? item.rating.toFixed(1) : "4.8"}
      </span>
    </div>
    <div className="absolute bottom-3 left-3 right-3 sm:bottom-5 sm:left-5 sm:right-5 text-white">
      <h3 className="text-lg sm:text-xl font-extrabold truncate">
        {item.title}
      </h3>
      <p className="text-sm sm:text-base truncate">
        {item.courseProvider?.companyName || "Unknown Provider"}
      </p>
      <div className="flex items-center justify-between w-full mt-1 sm:mt-2">
        <span className="text-lg sm:text-xl font-extrabold">
          {parseFloat(item.courseFee).toLocaleString()} EGP
        </span>
        <div className="flex items-center gap-1 bg-black/30 px-2 py-1 rounded-full">
          <span className="text-xs">{item.enrolledStudentsCount} students</span>
        </div>
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
          <Image
            src={item.courseImage}
            width={400}
            height={300}
            alt={item.title}
            className="object-cover w-full h-full rounded-lg"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-center">
            <div className="text-3xl mb-2">📚</div>
            <span className="text-sm font-bold text-gray-600">
              {item.title}
            </span>
          </div>
        )}
      </div>
      <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-full flex items-center gap-1">
        <Star className="w-3 h-3 fill-current text-yellow-500" />
        <span className="text-xs font-bold text-gray-700">
          {item.rating ? item.rating.toFixed(1) : "4.8"}
        </span>
      </div>
      {/* Course level badge */}
      <div className="absolute top-2 left-2 bg-teal-500 text-white px-2 py-1 rounded-full">
        <span className="text-xs font-bold">{item.level}</span>
      </div>
    </div>
    <div className="space-y-2">
      <h3 className="text-base sm:text-lg font-bold text-gray-800 line-clamp-2">
        {item.title}
      </h3>
      <p className="text-sm text-gray-600">
        {item.courseProvider?.companyName || "Unknown Provider"}
      </p>
      <div className="flex flex-wrap gap-1">
        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
          {item.instructor
            ? `${item.instructor.firstName} ${item.instructor.lastName}`
            : "No Instructor"}
        </span>
        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
          {item.duration}h
        </span>
        <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
          {item.courseType}
        </span>
      </div>
      <div className="flex items-center justify-between pt-2">
        <div className="flex flex-col">
          <span className="text-lg font-bold text-teal-600">
            {parseFloat(item.courseFee).toLocaleString()} EGP
          </span>
          <span className="text-xs text-gray-500">
            {item.enrolledStudentsCount} students enrolled
          </span>
        </div>
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
      No Courses Found
    </h2>
    <p className="text-sm sm:text-base text-gray-500 mt-2 text-center">
      We could not find any courses matching your criteria
    </p>
  </div>
);

const LoadingSkeleton: React.FC = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 mt-4 sm:mt-6">
    {[...Array(8)].map((_, i) => (
      <div
        key={i}
        className="bg-white rounded-lg shadow-md p-3 sm:p-4 border border-gray-100"
      >
        <div className="w-full h-40 sm:h-48 bg-gray-200 rounded-lg animate-pulse mb-3"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4"></div>
          <div className="flex gap-1">
            <div className="h-6 bg-gray-200 rounded-full animate-pulse w-20"></div>
            <div className="h-6 bg-gray-200 rounded-full animate-pulse w-12"></div>
          </div>
          <div className="flex items-center justify-between pt-2">
            <div className="h-5 bg-gray-200 rounded animate-pulse w-24"></div>
            <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

// Main App Component
const CoursesApp: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    async function fetchCourses() {
      setLoading(true);
      setError(null);

      try {
        // Fetch all courses without pagination
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "https://tariky-backend-o26r.vercel.app"}/api/courses?all=true`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const apiResponse: ApiResponse = await response.json();

        if (apiResponse.success) {
          setCourses(apiResponse.data);
          setFilteredCourses(apiResponse.data);
        } else {
          throw new Error(apiResponse.message || "Failed to fetch courses");
        }
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError(
          err instanceof Error
            ? err.message
            : "An error occurred while fetching courses"
        );
        setCourses([]);
        setFilteredCourses([]);
      } finally {
        setLoading(false);
      }
    }

    fetchCourses();
  }, []);

  const handleCardPress = (slug: string) => {
    router.push(`/courses/${slug}`);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);

    if (category === "All") {
      setFilteredCourses(courses);
    } else {
      // Filter courses by category slug
      const filtered = courses.filter(
        (course) => course.category.slug === category
      );
      setFilteredCourses(filtered);
    }
  };

  // Fetch user from Clerk
  const { user, isLoaded } = useUser();

  // Featured courses: pick top 3 by rating or enrollment
  const featuredCourses = courses
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 3);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Error Loading Courses
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

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
            <div className="flex items-center">
              <Image
                src={
                  user?.imageUrl
                    ? user.imageUrl
                    : "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                }
                width={48}
                height={48}
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
        {!loading && featuredCourses.length > 0 && (
          <div className="my-6 sm:my-8 bg-white rounded-lg p-4 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">
                Featured Courses
              </h2>
              <span className="text-sm text-gray-500">Top rated courses</span>
            </div>
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
          </div>
        )}

        {/* Courses Section */}
        <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex flex-col">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">
                All Courses
              </h2>
              {!loading && (
                <span className="text-sm text-gray-500">
                  {filteredCourses.length} course
                  {filteredCourses.length !== 1 ? "s" : ""} available
                </span>
              )}
            </div>
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
            <LoadingSkeleton />
          ) : filteredCourses.length === 0 ? (
            <NoResults />
          ) : (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 mt-4 sm:mt-6"
                  : "space-y-4 mt-4 sm:mt-6"
              }
            >
              {filteredCourses.map((item) => (
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
