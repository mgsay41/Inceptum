"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  ArrowLeft,
  Heart,
  Send,
  Star,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import Image from "next/image";

// Define course type to match your data structure
interface Provider {
  Logo: string;
  Name: string;
  [key: string]: any;
}

interface Course {
  id: string;
  Image: string;
  Title: string;
  Category: string;
  Rating: number;
  provider: Provider;
  About: string;
  Type: string;
  Location?: string;
  Fees: number;
  students: number;
  duration: string;
  level: string;
  [key: string]: any;
}

// Mock course data - replace with your actual data
const mockCourses: Course[] = [
  {
    id: "1",
    Title: "Complete React Native Development Course",
    Image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop",
    Rating: 4.8,
    Fees: 1200,
    provider: {
      Name: "Tech Academy",
      Logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop&crop=face",
    },
    Category: "Programming",
    About:
      "Master React Native development with this comprehensive course. Learn to build cross-platform mobile applications using React Native, covering navigation, state management, APIs, and deployment. This course includes hands-on projects and real-world examples to help you become a proficient mobile developer.",
    Type: "Online",
    Location: "Cairo, Egypt",
    students: 12500,
    duration: "40 hours",
    level: "Intermediate",
  },
  {
    id: "2",
    Title: "UI/UX Design Masterclass - Complete Guide",
    Image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
    Rating: 4.9,
    Fees: 950,
    provider: {
      Name: "Design Studio",
      Logo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    },
    Category: "Design",
    About:
      "Learn the fundamentals of UI/UX design with this comprehensive masterclass. Cover user research, wireframing, prototyping, and design systems. Work on real projects and build a portfolio that showcases your skills to potential employers.",
    Type: "In-Person",
    Location: "Cairo, Egypt",
    students: 8900,
    duration: "35 hours",
    level: "Beginner",
  },
  // Add more courses as needed
];

const CourseDetailsPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const courseId = params?.id as string;

  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const loadCourse = async () => {
      setLoading(true);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Find course by ID
      const foundCourse = mockCourses.find((c) => c.id === courseId);
      setCourse(foundCourse || null);
      setLoading(false);
    };

    if (courseId) {
      loadCourse();
    }
  }, [courseId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto mb-4"></div>
          <p className="text-lg font-medium text-gray-600">Loading course...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-medium text-gray-600 mb-4">
            Course not found
          </p>
          <button
            onClick={() => router.back()}
            className="px-6 py-2 bg-teal-500 text-white font-medium rounded-full hover:bg-teal-600 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white mb-9">
      {/* Header Image Section */}
      <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[50vh]">
        <Image
          src={course.Image}
          alt={course.Title}
          fill
          className="object-cover"
          priority
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-white/20" />

        {/* Navigation Bar */}
        <div className="absolute top-0 left-0 right-0 z-50 p-4 sm:p-6 lg:p-8">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="flex items-center justify-center w-11 h-11 bg-teal-500 rounded-full hover:bg-teal-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>

            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-white/20 rounded-full transition-colors">
                <Heart className="w-6 h-6 text-white" />
              </button>
              <button className="p-2 hover:bg-white/20 rounded-full transition-colors">
                <Send className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto pb-32">
        {/* Course Title and Info */}
        <div className="mt-6 sm:mt-8 space-y-4">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900">
            {course.Title}
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center">
              <span className="px-4 py-2 bg-teal-100 text-teal-700 text-sm font-bold rounded-full">
                {course.Category}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500 fill-current" />
              <span className="text-gray-600 text-sm font-medium">
                {course.Rating}.0
              </span>
            </div>
          </div>
        </div>

        {/* Provider Section */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Provider</h2>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="relative w-14 h-14 rounded-full overflow-hidden">
                <Image
                  src={course.provider.Logo}
                  alt={course.provider.Name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="ml-3">
                <h3 className="text-lg font-bold text-gray-900">
                  {course.provider.Name}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <MessageCircle className="w-6 h-6 text-teal-500" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Phone className="w-6 h-6 text-teal-500" />
              </button>
            </div>
          </div>
        </div>

        {/* Overview Section */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Overview</h2>
          <p className="text-gray-600 text-base leading-relaxed">
            {course.About}
          </p>
        </div>

        {/* Course Details */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              Course Details
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-500 w-20">
                  Level:
                </span>
                <span className="text-sm text-gray-700">{course.level}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-500 w-20">
                  Duration:
                </span>
                <span className="text-sm text-gray-700">{course.duration}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-500 w-20">
                  Students:
                </span>
                <span className="text-sm text-gray-700">
                  {course.students.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {course.Type === "Online" ? "Course Type" : "Location"}
            </h3>
            <div className="flex items-center gap-3">
              <MapPin
                className={`w-6 h-6 ${course.Type === "Online" ? "text-teal-500" : "text-gray-600"}`}
              />
              <span className="text-gray-600 text-sm font-medium">
                {course.Type === "Online"
                  ? "This course is online"
                  : course.Location}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 sm:p-6 lg:p-8 mb-14">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-xs font-medium text-gray-500 mb-1">
              Price
            </span>
            <span className="text-2xl font-bold text-teal-600">
              {course.Fees} EGP
            </span>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="flex-1 max-w-xs bg-teal-500 text-white text-lg font-bold py-3 px-6 rounded-full hover:bg-teal-600 transition-colors shadow-lg"
          >
            Book Now
          </button>
        </div>
      </div>

      {/* Modal for booking (optional) */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Book Course</h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to book &quot;{course.Title}&quot;?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setModalOpen(false)}
                className="flex-1 py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Handle booking logic here
                  console.log("Booking course:", course.id);
                  setModalOpen(false);
                }}
                className="flex-1 py-2 px-4 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetailsPage;
