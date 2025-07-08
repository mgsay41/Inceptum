"use client";
import { useEffect, useRef, useState } from "react";
import { Map, BookOpen, TrendingUp, Award } from "lucide-react";

const Features = () => {
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

  const features = [
    {
      icon: Map,
      title: "Career Roadmaps",
      description:
        "Follow structured learning paths designed by industry experts to reach your dream career.",
      color: "text-primary",
    },
    {
      icon: BookOpen,
      title: "Trending Courses",
      description:
        "Access the most in-demand courses that align with current market needs and opportunities.",
      color: "text-blue-500",
    },
    {
      icon: TrendingUp,
      title: "Student Rankings",
      description:
        "Track your progress and compete with peers through our comprehensive ranking system.",
      color: "text-purple-500",
    },
    {
      icon: Award,
      title: "Internship Offers",
      description:
        "Get matched with exclusive internship opportunities from our partner companies.",
      color: "text-orange-500",
    },
  ];

  return (
    <section id="features" ref={sectionRef} className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Everything You Need to <span className="text-primary">Succeed</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tariky provides comprehensive tools and resources to guide your
            educational journey and accelerate your career growth.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 ${
                isVisible ? "animate-fade-in" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-50 rounded-2xl shadow-sm mb-6">
                <feature.icon className={`w-8 h-8 ${feature.color}`} />
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {feature.title}
              </h3>

              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
