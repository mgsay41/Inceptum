"use client";
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

const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "popular", label: "Most Popular" },
];

// Types - Updated to match database structure
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
  // Add category field for filtering (you might need to add this to your database)
  category?: string;
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
                <img
                  src={item.courseImage}
                  alt={item.title}
                  className="object-cover w-full h-full rounded-lg"
                />
              ) : (
                <span className="text-sm font-bold text-gray-400">
                  {item.title}
                </span>
              )}
            </div>
            <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-full flex items-center gap-1">
              <Star className="w-3 h-3 fill-current text-yellow-500" />
              <span className="text-xs font-bold text-gray-700">
                {item.rating ?? "4.8"}
              </span>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                {item.courseProvider?.companyName}
              </p>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  {item.level}
                </span>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  {item.duration} hours
                </span>
                {item.instructor && (
                  <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                    {item.instructor.firstName} {item.instructor.lastName}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-teal-600">
                {item.courseFee} EGP
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
        <div className="w-full h-40 sm:h-48 bg-gray-200 flex items-center justify-center rounded-lg">
          {item.courseImage ? (
            <img
              src={item.courseImage}
              alt={item.title}
              className="object-cover w-full h-full rounded-lg"
            />
          ) : (
            <span className="text-sm font-bold text-gray-400">
              {item.title}
            </span>
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
            {item.level}
          </span>
          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
            {item.duration} hours
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
              placeholder="Search courses..."
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
            <span className="text-sm text-gray-600">
              {totalCourses} courses
            </span>

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
                <span className="text-sm text-gray-600">
                  {totalCourses} courses
                </span>

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

const NoResults: React.FC = () => (
  <div className="flex flex-col items-center justify-center py-20">
    <div className="text-6xl mb-4">📚</div>
    <h3 className="text-xl font-bold text-gray-700 mb-2">No courses found</h3>
    <p className="text-gray-500 text-center">
      Try adjusting your search or filter criteria
    </p>
  </div>
);

// Main Component
const CoursesPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    async function fetchCourses() {
      setLoading(true);
      try {
        console.log("Fetching courses from API...");
        const res = await fetch("/api/courses");
        console.log("API Response status:", res.status);

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        console.log("Fetched courses data:", data);
        console.log("Number of courses:", data.length);

        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCourses();
  }, []);

  // Filter and sort courses
  let filteredCourses = courses.filter((course) => {
    const matchesCategory =
      selectedCategory === "All" ||
      course.category === selectedCategory ||
      course.courseType?.toLowerCase().includes(selectedCategory.toLowerCase());

    const matchesSearch =
      course.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.courseProvider?.companyName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      course.instructor?.firstName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      course.instructor?.lastName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

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
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
          </div>
        ) : courses.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">
              No courses found
            </h3>
            <p className="text-gray-500 text-center">
              {searchTerm || selectedCategory !== "All"
                ? "Try adjusting your search or filter criteria"
                : "No courses available in the database"}
            </p>
            <button
              onClick={() => {
                console.log("Current courses state:", courses);
                console.log("Filtered courses:", filteredCourses);
              }}
              className="mt-4 px-4 py-2 bg-teal-500 text-white rounded-lg text-sm"
            >
              Debug: Log Course Data
            </button>
          </div>
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
