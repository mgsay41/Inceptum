"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import {
  Star,
  Heart,
  Clock,
  Users,
  BookOpen,
  Award,
  MapPin,
  Calendar,
  ChevronLeft,
  Play,
  Download,
  Share2,
  Globe,
  CheckCircle,
  User,
  Building,
} from "lucide-react";
import { useRouter, useParams } from "next/navigation";

// Types matching your backend response
type Course = {
  id: number;
  title: string;
  slug: string;
  description?: string;
  shortDescription?: string;
  courseImage?: string;
  courseFee: string;
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
  courseOutline?: string;
  maxStudents?: number;
  currentStudents: number;
  startDate?: string;
  endDate?: string;
  enrollmentDeadline?: string;
  status: string;
  courseProvider?: {
    id: string;
    providerId: number;
    companyName: string;
    companyDescription?: string;
    website?: string;
    logo?: string;
    coverImage?: string;
    rating?: number;
    totalStudents: number;
    totalCourses: number;
    verified: boolean;
    established?: string;
    city?: string;
    country?: string;
  };
  instructor?: {
    id: string;
    instructorId: number;
    firstName: string;
    lastName: string;
    profilePicture?: string;
    rating?: number;
    totalRatings: number;
    bio?: string;
    specialization?: string;
    experience?: number;
    expertise: string[];
    certifications: string[];
    linkedinUrl?: string;
    githubUrl?: string;
    portfolioUrl?: string;
    totalStudents: number;
    totalCourses: number;
  };
  category: {
    id: number;
    name: string;
    slug: string;
    description?: string;
    icon?: string;
    color?: string;
  };
  roadmap?: {
    id: number;
    title: string;
    slug: string;
    description?: string;
    shortDescription?: string;
    roadmapImage?: string;
    level: string;
    estimatedDuration?: number;
    totalCourses: number;
    isLinear: boolean;
  };
  createdBy: {
    id: string;
    firstName: string;
    lastName: string;
  };
  enrolledStudentsCount: number;
  createdAt: string;
  updatedAt?: string;
};

type ApiResponse = {
  success: boolean;
  message: string;
  data: Course;
};

const LoadingSkeleton: React.FC = () => (
  <div className="min-h-screen bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="animate-pulse">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-8 h-8 bg-gray-200 rounded"></div>
          <div className="h-6 bg-gray-200 rounded w-32"></div>
        </div>

        {/* Main content */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="w-full h-64 bg-gray-200 rounded-lg"></div>
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded w-24"></div>
                <div className="h-12 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-32"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const CourseDetailPage: React.FC = () => {
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const params = useParams();
  const slug = params?.slug as string;

  useEffect(() => {
    if (!slug) return;

    async function fetchCourse() {
      setLoading(true);
      setError(null);

      try {
        console.log(`Fetching course with slug: ${slug}`);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "https://tariky-backend-o26r.vercel.app"}/api/courses/${slug}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log("API Response status:", response.status);

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Course not found");
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const apiResponse: ApiResponse = await response.json();
        console.log("API Response:", apiResponse);

        if (apiResponse.success) {
          setCourse(apiResponse.data);
        } else {
          throw new Error(apiResponse.message || "Failed to fetch course");
        }
      } catch (err) {
        console.error("Error fetching course:", err);
        setError(
          err instanceof Error
            ? err.message
            : "An error occurred while fetching the course"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchCourse();
  }, [slug]);

  const handleEnroll = () => {
    router.push(`/courses/${slug}/enroll`);
  };

  const handleShare = () => {
    if (navigator.share && course) {
      navigator.share({
        title: course.title,
        text: course.shortDescription || course.description,
        url: window.location.href,
      });
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Course Not Found
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => router.push("/courses")}
            className="bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600 transition-colors"
          >
            Browse All Courses
          </button>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📚</div>
          <h2 className="text-2xl font-bold text-gray-800">Course not found</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 mb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back</span>
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Course Image */}
            <div className="relative w-full h-64 sm:h-80 bg-gray-200 rounded-lg overflow-hidden">
              {course.courseImage ? (
                <Image
                  src={course.courseImage}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="text-6xl mb-4">📚</div>
                    <span className="text-xl font-bold text-gray-600">
                      {course.title}
                    </span>
                  </div>
                </div>
              )}
              <div className="absolute top-4 left-4">
                <span className="bg-teal-500 text-white px-3 py-1.5 rounded-full text-sm font-bold">
                  {course.level}
                </span>
              </div>
            </div>

            {/* Course Info */}
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {course.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-current text-yellow-500" />
                  <span className="font-semibold">
                    {course.rating?.toFixed(1) || "4.8"}
                  </span>
                  <span className="text-gray-600">
                    ({course.totalRatings} reviews)
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-5 h-5 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    {course.enrolledStudentsCount} students enrolled
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Globe className="w-5 h-5 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    {course.language}
                  </span>
                </div>
              </div>

              {course.shortDescription && (
                <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                  {course.shortDescription}
                </p>
              )}
            </div>

            {/* Course Details */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-teal-500" />
                  <div>
                    <p className="font-semibold">Duration</p>
                    <p className="text-sm text-gray-600">
                      {course.duration} hours
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-teal-500" />
                  <div>
                    <p className="font-semibold">Course Type</p>
                    <p className="text-sm text-gray-600">{course.courseType}</p>
                  </div>
                </div>
              </div>

              {course.totalLessons && (
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center gap-3">
                    <Play className="w-5 h-5 text-teal-500" />
                    <div>
                      <p className="font-semibold">Lessons</p>
                      <p className="text-sm text-gray-600">
                        {course.totalLessons} lessons
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {course.hasCertificate && (
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-teal-500" />
                    <div>
                      <p className="font-semibold">Certificate</p>
                      <p className="text-sm text-gray-600">Upon completion</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            {course.description && (
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-4">About This Course</h3>
                <div className="prose max-w-none text-gray-700">
                  <p className="leading-relaxed">{course.description}</p>
                </div>
              </div>
            )}

            {/* Learning Outcomes */}
            {course.learningOutcomes.length > 0 && (
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-4">What You will Learn</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {course.learningOutcomes.map((outcome, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Prerequisites */}
            {course.prerequisites.length > 0 && (
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-4">Prerequisites</h3>
                <ul className="space-y-2">
                  {course.prerequisites.map((prerequisite, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{prerequisite}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Instructor */}
            {course.instructor && (
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-4">Instructor</h3>
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                    {course.instructor.profilePicture ? (
                      <Image
                        src={course.instructor.profilePicture}
                        alt={`${course.instructor.firstName} ${course.instructor.lastName}`}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <User className="w-8 h-8 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold">
                      {course.instructor.firstName} {course.instructor.lastName}
                    </h4>
                    {course.instructor.specialization && (
                      <p className="text-teal-600 font-medium">
                        {course.instructor.specialization}
                      </p>
                    )}
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                      {course.instructor.rating && (
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-current text-yellow-500" />
                          <span>{course.instructor.rating.toFixed(1)}</span>
                        </div>
                      )}
                      <span>{course.instructor.totalStudents} students</span>
                      <span>{course.instructor.totalCourses} courses</span>
                    </div>
                    {course.instructor.bio && (
                      <p className="mt-3 text-gray-700 leading-relaxed">
                        {course.instructor.bio}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Enrollment Card */}
            <div className="bg-white p-6 rounded-lg shadow-md top-6">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-teal-600 mb-2">
                  {parseFloat(course.courseFee).toLocaleString()} EGP
                </div>
                {course.maxStudents && (
                  <p className="text-sm text-gray-600">
                    {course.maxStudents - course.currentStudents} spots left
                  </p>
                )}
              </div>

              <button
                onClick={handleEnroll}
                className="w-full py-3 px-4 rounded-lg font-semibold transition-colors bg-teal-500 hover:bg-teal-600 text-white"
              >
                Enroll Now
              </button>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={handleShare}
                  className="flex-1 py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  <span className="text-sm">Share</span>
                </button>
                <button className="flex-1 py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                  <Heart className="w-4 h-4" />
                  <span className="text-sm">Save</span>
                </button>
              </div>

              {/* Course Schedule */}
              {(course.startDate || course.endDate) && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-semibold mb-3">Schedule</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    {course.startDate && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>
                          Starts:{" "}
                          {new Date(course.startDate).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                    {course.endDate && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>
                          Ends: {new Date(course.endDate).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Location (for offline courses) */}
              {course.courseType === "OFFLINE" &&
                (course.address || course.city) && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="font-semibold mb-3">Location</h4>
                    <div className="flex items-start gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <div>
                        {course.venue && (
                          <p className="font-medium">{course.venue}</p>
                        )}
                        {course.address && <p>{course.address}</p>}
                        {course.city && course.country && (
                          <p>
                            {course.city}, {course.country}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
            </div>

            {/* Course Provider */}
            {course.courseProvider && (
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h4 className="font-semibold mb-3">Course Provider</h4>
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                    {course.courseProvider.logo ? (
                      <Image
                        src={course.courseProvider.logo}
                        alt={course.courseProvider.companyName}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <Building className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h5 className="font-medium">
                        {course.courseProvider.companyName}
                      </h5>
                      {course.courseProvider.verified && (
                        <CheckCircle className="w-4 h-4 text-blue-500" />
                      )}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-current text-yellow-500" />
                        <span>
                          {course.courseProvider.rating?.toFixed(1) || "4.8"}
                        </span>
                      </div>
                      <p>{course.courseProvider.totalStudents} students</p>
                      <p>{course.courseProvider.totalCourses} courses</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Category */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="font-semibold mb-3">Category</h4>
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded"
                  style={{
                    backgroundColor: course.category.color || "#14b8a6",
                  }}
                ></div>
                <span className="text-gray-700">{course.category.name}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
