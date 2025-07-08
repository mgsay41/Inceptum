"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Users, Trophy } from "lucide-react";
import { useRouter } from "next/navigation"; // Add this import

const Hero = () => {
  const router = useRouter(); // Initialize router

  const handleGetStarted = () => {
    router.push("/signin"); // Redirect to sign-in page
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Floating Icons */}
      <div className="absolute inset-0">
        <BookOpen
          className="absolute top-1/4 left-1/4 w-8 h-8 text-primary/20 animate-float"
          style={{ animationDelay: "0.5s" }}
        />
        <Users
          className="absolute top-1/3 right-1/4 w-6 h-6 text-blue-500/20 animate-float"
          style={{ animationDelay: "1.5s" }}
        />
        <Trophy
          className="absolute bottom-1/3 left-1/3 w-7 h-7 text-purple-500/20 animate-float"
          style={{ animationDelay: "2.5s" }}
        />
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Your Career Starts with the{" "}
            <span className="text-primary">Right Path</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Explore curated learning paths, join job-oriented courses, and
            launch your future with Tariky. The student career platform that
            guides your success.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={handleGetStarted} // Use the new handler
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-4 text-lg group"
            >
              Get Started
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-2 border-gray-300 hover:border-primary hover:text-primary font-semibold px-8 py-4 text-lg"
            >
              Watch Demo
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">10K+</div>
              <div className="text-gray-600">Students</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-gray-600">Courses</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">95%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
