"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import {
  Star,
  Heart,
  Filter,
  Grid,
  List,
  Search,
  ChevronDown,
} from "lucide-react";
import { useRouter } from "next/navigation";

// Categories - updated to match your database
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

const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "popular", label: "Most Popular" },
  { value: "students", label: "Most Students" },
];

// Updated types to match backend response
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
            <div className="w-full sm:w-48 h-32 sm:h-28 bg-gray-200 flex items-center justify-center rounded-lg">
              {item.courseImage ? (
                <Image
                  src={item.courseImage}
                  alt={item.title}
                  width={192}
                  height={112}
                  className="object-cover w-full h-full rounded-lg"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-center p-2">
                  <div className="text-2xl mb-1">📚</div>
                  <span className="text-xs font-bold text-gray-600 line-clamp-2">
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

          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                {item.courseProvider?.companyName || "Unknown Provider"}
              </p>
              {item.shortDescription && (
                <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                  {item.shortDescription}
                </p>
              )}
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  {item.level}
                </span>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  {item.duration}h
                </span>
                <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                  {item.courseType}
                </span>
                {item.instructor && (
                  <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                    {item.instructor.firstName} {item.instructor.lastName}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-xl font-bold text-teal-600">
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
      </div>
    );
  }

  return (
    <div
      onClick={onPress}
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer p-3 sm:p-4 border border-gray-100"
    >
      <div className="relative mb-3">
        <div className="w-full h-40 sm:h-48 bg-gray-200 flex items-center justify-center rounded-lg">
          {item.courseImage ? (
            <Image
              src={item.courseImage}
              alt={item.title}
              width={400}
              height={300}
              className="object-cover w-full h-full rounded-lg"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-center p-4">
              <div className="text-3xl mb-2">📚</div>
              <span className="text-sm font-bold text-gray-600 line-clamp-2">
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
            {item.level}
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
              {item.enrolledStudentsCount} students
            </span>
          </div>
          <Heart className="w-5 h-5 text-gray-400 hover:text-red-500 transition-colors" />
        </div>
      </div>
    </div>
  );
};

type FilterBarProps = {
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  searchTerm: string;
  onSearchChange: (val: string) => void;
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
  totalCourses: number;
  allCoursesCount: number;
};

const FilterBar: React.FC<FilterBarProps> = ({
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  searchTerm,
  onSearchChange,
  viewMode,
  onViewModeChange,
  totalCourses,
  allCoursesCount,
}) => {
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Search Bar */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search courses, instructors, or providers..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none text-sm"
            />
          </div>
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="md:hidden bg-gray-100 p-2.5 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Filter className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Desktop Filters */}
        <div className="hidden md:flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Category Filters */}
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              <style jsx>{`
                .scrollbar-hide {
                  -ms-overflow-style: none;
                  scrollbar-width: none;
                }
                .scrollbar-hide::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
              {categories.map((category) => (
                <button
                  key={category.category}
                  onClick={() => onCategoryChange(category.category)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${
                    selectedCategory === category.category
                      ? "bg-teal-500 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category.title}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-sm text-gray-600">
              Showing <span className="font-semibold">{totalCourses}</span> of{" "}
              <span className="font-semibold">{allCoursesCount}</span> courses
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-sm"
              >
                <span>Sort by</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {showSortDropdown && (
                <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        onSortChange(option.value);
                        setShowSortDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                        sortBy === option.value
                          ? "bg-teal-50 text-teal-600"
                          : "text-gray-700"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* View Mode Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => onViewModeChange("grid")}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === "grid"
                    ? "bg-white shadow-sm"
                    : "hover:bg-gray-200"
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => onViewModeChange("list")}
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

        {/* Mobile Filters */}
        {showMobileFilters && (
          <div className="md:hidden mt-4 pt-4 border-t border-gray-200">
            <div className="space-y-4">
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {categories.map((category) => (
                  <button
                    key={category.category}
                    onClick={() => onCategoryChange(category.category)}
                    className={`px-3 py-1.5 rounded-full whitespace-nowrap text-xs font-medium transition-colors ${
                      selectedCategory === category.category
                        ? "bg-teal-500 text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {category.title}
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  {totalCourses} of {allCoursesCount} courses
                </div>

                <div className="flex items-center gap-2">
                  <div className="relative">
                    <button
                      onClick={() => setShowSortDropdown(!showSortDropdown)}
                      className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg text-sm"
                    >
                      <span>Sort</span>
                      <ChevronDown className="w-4 h-4" />
                    </button>

                    {showSortDropdown && (
                      <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                        {sortOptions.map((option) => (
                          <button
                            key={option.value}
                            onClick={() => {
                              onSortChange(option.value);
                              setShowSortDropdown(false);
                            }}
                            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                              sortBy === option.value
                                ? "bg-teal-50 text-teal-600"
                                : "text-gray-700"
                            }`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => onViewModeChange("grid")}
                      className={`p-1.5 rounded-md transition-colors ${
                        viewMode === "grid" ? "bg-white shadow-sm" : ""
                      }`}
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onViewModeChange("list")}
                      className={`p-1.5 rounded-md transition-colors ${
                        viewMode === "list" ? "bg-white shadow-sm" : ""
                      }`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const NoResults: React.FC<{ hasFilters: boolean }> = ({ hasFilters }) => (
  <div className="flex flex-col items-center justify-center py-20">
    <div className="text-6xl mb-4">📚</div>
    <h3 className="text-xl font-bold text-gray-700 mb-2">
      {hasFilters ? "No courses found" : "No courses available"}
    </h3>
    <p className="text-gray-500 text-center">
      {hasFilters
        ? "Try adjusting your search or filter criteria"
        : "No courses are currently available in the database"}
    </p>
  </div>
);

const LoadingSkeleton: React.FC<{ viewMode: "grid" | "list" }> = ({
  viewMode,
}) => {
  if (viewMode === "list") {
    return (
      <div className="space-y-4">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-lg shadow-md p-4 sm:p-6 border border-gray-100"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-48 h-32 sm:h-28 bg-gray-200 rounded-lg animate-pulse"></div>
              <div className="flex-1 space-y-3">
                <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
                <div className="flex gap-2">
                  <div className="h-6 bg-gray-200 rounded-full animate-pulse w-16"></div>
                  <div className="h-6 bg-gray-200 rounded-full animate-pulse w-12"></div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="h-6 bg-gray-200 rounded animate-pulse w-20"></div>
                  <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-lg shadow-md p-3 sm:p-4 border border-gray-100"
        >
          <div className="w-full h-40 sm:h-48 bg-gray-200 rounded-lg animate-pulse mb-3"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4"></div>
            <div className="flex gap-1">
              <div className="h-6 bg-gray-200 rounded-full animate-pulse w-16"></div>
              <div className="h-6 bg-gray-200 rounded-full animate-pulse w-12"></div>
            </div>
            <div className="flex items-center justify-between pt-2">
              <div className="h-5 bg-gray-200 rounded animate-pulse w-20"></div>
              <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Main Component
const CoursesPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    async function fetchCourses() {
      setLoading(true);
      setError(null);

      try {
        console.log("Fetching all courses from backend...");

        // Fetch all courses without pagination limits
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "https://tariky-backend-o26r.vercel.app"}/api/courses?limit=10000`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log("API Response status:", response.status);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const apiResponse: ApiResponse = await response.json();
        console.log("API Response:", apiResponse);

        if (apiResponse.success) {
          console.log("Successfully fetched courses:", apiResponse.data.length);
          setCourses(apiResponse.data);
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
      } finally {
        setLoading(false);
      }
    }

    fetchCourses();
  }, []);

  // Filter and sort courses
  let filteredCourses = courses.filter((course) => {
    const matchesCategory =
      selectedCategory === "All" || course.category.slug === selectedCategory;

    const matchesSearch =
      searchTerm === "" ||
      course.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.shortDescription
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      course.courseProvider?.companyName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      course.instructor?.firstName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      course.instructor?.lastName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      course.category.name?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  filteredCourses = [...filteredCourses].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return parseFloat(a.courseFee) - parseFloat(b.courseFee);
      case "price-high":
        return parseFloat(b.courseFee) - parseFloat(a.courseFee);
      case "rating":
        return (b.rating ?? 0) - (a.rating ?? 0);
      case "popular":
        return (b.totalRatings ?? 0) - (a.totalRatings ?? 0);
      case "students":
        return (b.enrolledStudentsCount ?? 0) - (a.enrolledStudentsCount ?? 0);
      case "oldest":
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      case "newest":
      default:
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }
  });

  const handleCardPress = (slug: string) => {
    router.push(`/courses/${slug}`);
  };

  const hasFilters = selectedCategory !== "All" || searchTerm !== "";

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
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
    <div className="min-h-screen bg-gray-50">
      <FilterBar
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        sortBy={sortBy}
        onSortChange={setSortBy}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        totalCourses={filteredCourses.length}
        allCoursesCount={courses.length}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {loading ? (
          <LoadingSkeleton viewMode={viewMode} />
        ) : courses.length === 0 ? (
          <NoResults hasFilters={hasFilters} />
        ) : filteredCourses.length === 0 ? (
          <NoResults hasFilters={hasFilters} />
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
                : "space-y-4"
            }
          >
            {filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                item={course}
                onPress={() => handleCardPress(course.slug)}
                viewMode={viewMode}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;
