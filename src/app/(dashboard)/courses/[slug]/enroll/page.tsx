"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  CheckCircle,
  ExternalLink,
  CreditCard,
  Clock,
  Users,
  Award,
  BookOpen,
} from "lucide-react";
import { useRouter, useParams } from "next/navigation";

// Types
type Course = {
  id: number;
  title: string;
  slug: string;
  description?: string;
  shortDescription?: string;
  courseImage?: string;
  courseFee: string;
  duration: number;
  courseType: string;
  level: string;
  totalLessons?: number;
  hasCertificate: boolean;
  paymentLink?: string; // New field for payment link
  instructor?: {
    firstName: string;
    lastName: string;
    profilePicture?: string;
  };
  courseProvider?: {
    companyName: string;
    logo?: string;
  };
};

type ApiResponse = {
  success: boolean;
  message: string;
  data: Course;
};

const CourseEnrollmentPage: React.FC = () => {
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
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "https://tariky-backend-o26r.vercel.app"}/api/courses/${slug}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Course not found");
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const apiResponse: ApiResponse = await response.json();

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

  const handlePaymentClick = () => {
    if (course?.paymentLink) {
      window.open(course.paymentLink, "_blank");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  if (error || !course) {
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back to Course</span>
          </button>
        </div>

        {/* Success Message */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-teal-500 to-teal-600 px-8 py-6">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-white rounded-full p-3">
                <CheckCircle className="w-8 h-8 text-teal-500" />
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white text-center mb-2">
              Congratulations!
            </h1>
            <p className="text-teal-100 text-center text-lg">
              You have successfully enrolled in this course
            </p>
          </div>

          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Complete Your Enrollment
              </h2>
              <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
                Excellent choice! To secure your spot in this course, please
                complete the payment process using the link below. Once payment
                is confirmed, our team will contact you shortly with detailed
                course information and next steps.
              </p>
            </div>

            {/* Course Summary Card */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                  {course.courseImage ? (
                    <Image
                      src={course.courseImage}
                      alt={course.title}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <BookOpen className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {course.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration} hours</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      <span>{course.courseType}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{course.level}</span>
                    </div>
                    {course.hasCertificate && (
                      <div className="flex items-center gap-1">
                        <Award className="w-4 h-4" />
                        <span>Certificate</span>
                      </div>
                    )}
                  </div>

                  {course.instructor && (
                    <p className="text-sm text-gray-600">
                      Instructor: {course.instructor.firstName}{" "}
                      {course.instructor.lastName}
                    </p>
                  )}

                  {course.courseProvider && (
                    <p className="text-sm text-gray-600">
                      Provider: {course.courseProvider.companyName}
                    </p>
                  )}
                </div>

                <div className="text-right">
                  <div className="text-2xl font-bold text-teal-600">
                    {parseFloat(course.courseFee).toLocaleString()} EGP
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Section */}
            <div className="text-center">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Secure Payment
                </h3>
                <p className="text-gray-600 text-sm">
                  Click the button below to complete your payment securely
                </p>
              </div>

              {course.paymentLink ? (
                <button
                  onClick={handlePaymentClick}
                  className="inline-flex items-center justify-center gap-3 bg-teal-500 hover:bg-teal-600 text-white font-semibold py-4 px-8 rounded-lg transition-colors transform hover:scale-105 duration-200 shadow-lg"
                >
                  <CreditCard className="w-5 h-5" />
                  <span>Proceed to Payment</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              ) : (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <p className="text-yellow-700">
                    Payment link is not available at the moment. Please contact
                    our support team.
                  </p>
                </div>
              )}

              <p className="text-xs text-gray-500 mt-4 max-w-md mx-auto">
                Your payment is processed securely. After successful payment,
                you will receive a confirmation email with course access
                details.
              </p>
            </div>
          </div>
        </div>

        {/* What Happens Next Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            What Happens Next?
          </h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-teal-100 rounded-full p-2 flex-shrink-0">
                <span className="text-teal-600 font-semibold text-sm">1</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Complete Payment</h4>
                <p className="text-sm text-gray-600">
                  Use the secure payment link above to finalize your enrollment
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-teal-100 rounded-full p-2 flex-shrink-0">
                <span className="text-teal-600 font-semibold text-sm">2</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">
                  Confirmation Email
                </h4>
                <p className="text-sm text-gray-600">
                  You will receive a confirmation email with payment receipt and
                  course details
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-teal-100 rounded-full p-2 flex-shrink-0">
                <span className="text-teal-600 font-semibold text-sm">3</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Team Contact</h4>
                <p className="text-sm text-gray-600">
                  Our team will contact you within 24 hours with course access
                  and schedule information
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-teal-100 rounded-full p-2 flex-shrink-0">
                <span className="text-teal-600 font-semibold text-sm">4</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Start Learning</h4>
                <p className="text-sm text-gray-600">
                  Begin your learning journey and work towards earning your
                  certificate
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Support Section */}
        <div className="bg-gray-50 rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Need Help?
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            If you have any questions or encounter any issues, our support team
            is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="mailto:support@example.com"
              className="inline-flex items-center justify-center gap-2 bg-white text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors border"
            >
              Email Support
            </a>
            <a
              href="tel:+1234567890"
              className="inline-flex items-center justify-center gap-2 bg-white text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors border"
            >
              Call Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseEnrollmentPage;
