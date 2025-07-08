"use client";
import { useEffect, useRef, useState } from "react";
import { UserPlus, Search, GraduationCap } from "lucide-react";

const HowItWorks = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const steps = [
    {
      icon: UserPlus,
      title: "Register",
      description:
        "Create your free account and tell us about your career interests and goals.",
      color: "bg-primary",
    },
    {
      icon: Search,
      title: "Explore Roadmaps",
      description:
        "Discover personalized learning paths tailored to your chosen career field.",
      color: "bg-blue-500",
    },
    {
      icon: GraduationCap,
      title: "Join Courses",
      description:
        "Enroll in courses, complete projects, and earn certificates to boost your profile.",
      color: "bg-purple-500",
    },
  ];

  return (
    <section id="how-it-works" ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            How <span className="text-primary">Tariky</span> Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Getting started with your career journey is simple. Follow these
            three easy steps to unlock your potential.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`text-center ${
                  isVisible ? "animate-fade-in" : "opacity-0"
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div
                  className={`inline-flex items-center justify-center w-20 h-20 ${step.color} rounded-3xl text-white mb-8 shadow-lg`}
                >
                  <step.icon className="w-10 h-10" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {step.title}
                </h3>

                <p className="text-gray-600 leading-relaxed text-lg">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
