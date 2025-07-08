"use client";
import React, { useState } from "react";
import {
  Star,
  Heart,
  Filter,
  Grid,
  List,
  Search,
  ChevronDown,
} from "lucide-react";
import { useRouter } from "next/navigation"; // Add this import

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

const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "popular", label: "Most Popular" },
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

// Types
type Course = (typeof dummyCourses)[number];

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
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [loading] = useState(false);

  const router = useRouter(); // Add this line

  // Filter and sort courses
  let filteredCourses = dummyCourses.filter((course) => {
    const matchesCategory =
      selectedCategory === "All" || course.category === selectedCategory;
    const matchesSearch =
      course.Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.provider.Name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sorting logic
  filteredCourses = [...filteredCourses].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.Fees - b.Fees;
      case "price-high":
        return b.Fees - a.Fees;
      case "rating":
        return b.Rating - a.Rating;
      case "popular":
        return b.students - a.students;
      case "oldest":
        return a.id.localeCompare(b.id);
      case "newest":
      default:
        return b.id.localeCompare(a.id);
    }
  });

  const handleCardPress = (id: string) => {
    router.push(`/courses/1`); // Redirect to course details page
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
        ) : filteredCourses.length === 0 ? (
          <NoResults />
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
                onPress={() => handleCardPress(course.id)}
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
