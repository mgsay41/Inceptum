import { Clock, BookOpen } from "lucide-react";
import Image from "next/image";

interface CourseCardProps {
  id?: string; // Optional id
  title: string;
  description: string;
  instructor: string;
  duration: string;
  students: number;
  image: string;
}

const CourseCard = ({
  id = "1", // Provide a default value if id is optional
  title,
  description,
  instructor,
  duration,
  students,
  image,
}: CourseCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-200 hover:scale-105">
      <Image
        className="h-48 w-full object-cover"
        src={image}
        alt={title}
        width={300}
        height={300}
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        <div className="border-t pt-4">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center">
              <BookOpen className="h-4 w-4 text-[#ff005c] mr-2" />
              <span className="text-sm text-gray-700">{instructor}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
