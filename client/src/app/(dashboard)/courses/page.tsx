"use client";

import CourseCard from "@/components/CoursesCard";
import Link from "next/link"; // Ensure the correct import for Next.js Link
import React, { useState } from "react";

// Courses Page Component
const Courses = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const courses = [
    {
      id: "1",
      title: "Advanced Web Development",
      description:
        "Master modern web technologies including React, Node.js, and cloud deployment.",
      instructor: "Prof. Alex Thompson",
      duration: "12 weeks",
      students: 245,
      image:
        "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    },
    {
      id: "2",
      title: "Data Science & Analytics",
      description:
        "Learn to analyze and visualize data using Python, pandas, and machine learning.",
      instructor: "Dr. Maria Garcia",
      duration: "10 weeks",
      students: 189,
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    },
    {
      id: "3",
      title: "Mobile App Development",
      description:
        "Build cross-platform mobile applications using React Native and Flutter.",
      instructor: "John Davidson",
      duration: "8 weeks",
      students: 167,
      image:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    },
    {
      id: "4",
      title: "UI/UX Design Fundamentals",
      description:
        "Learn the principles of user interface and experience design.",
      instructor: "Sarah Williams",
      duration: "6 weeks",
      students: 134,
      image:
        "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    },
  ];

  // Filter courses based on search term
  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Available Courses
          </h1>
          <div className="flex gap-4">
            <input
              type="search"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <Link href={`/courses/${course.id}`} key={course.id}>
              {/* No <a> tag needed */}
              <CourseCard {...course} />
            </Link>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            No courses found matching your search.
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
