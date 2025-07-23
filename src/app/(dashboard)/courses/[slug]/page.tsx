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

// Define course type to match your schema
type Course = {
  id: number;
  title: string;
  slug: string;
  description?: string;
  shortDescription?: string;
  courseImage?: string;
  courseFee: string;
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
  city?: string;
  country?: string;
  // Add other fields as needed
};

const CourseDetailsPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const slug = params?.slug as string;

  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true);
      const res = await fetch(`/api/courses/${slug}`);
      if (res.ok) {
        const data = await res.json();
        setCourse(data);
      } else {
        setCourse(null);
      }
      setLoading(false);
    };
    if (slug) fetchCourse();
  }, [slug]);

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
          src={course.courseImage ?? "/default-course.jpg"}
          alt={course.title}
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
            {course.title}
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center">
              <span className="px-4 py-2 bg-teal-100 text-teal-700 text-sm font-bold rounded-full">
                {course.courseType}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500 fill-current" />
              <span className="text-gray-600 text-sm font-medium">
                {course.rating ?? "4.8"}
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
                  src={course.courseProvider?.logo ?? "/default-logo.jpg"}
                  alt={course.courseProvider?.companyName ?? "Provider"}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="ml-3">
                <h3 className="text-lg font-bold text-gray-900">
                  {course.courseProvider?.companyName}
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
            {course.description}
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
                <span className="text-sm text-gray-700">
                  {course.duration} hours
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-500 w-20">
                  Ratings:
                </span>
                <span className="text-sm text-gray-700">
                  {course.totalRatings ?? 0}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {course.courseType === "ONLINE" ? "Course Type" : "Location"}
            </h3>
            <div className="flex items-center gap-3">
              <MapPin
                className={`w-6 h-6 ${
                  course.courseType === "ONLINE"
                    ? "text-teal-500"
                    : "text-gray-600"
                }`}
              />
              <span className="text-gray-600 text-sm font-medium">
                {course.courseType === "ONLINE"
                  ? "This course is online"
                  : `${course.city ?? ""} ${course.country ?? ""}`}
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
              {course.courseFee} EGP
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

      {/* Modal for booking */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Book Course</h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to book &quot;{course.title}&quot;?
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
