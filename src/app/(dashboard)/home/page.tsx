"use client";

import Image from "next/image";
import Link from "next/link";
import {
  PencilIcon,
  ArrowRight,
  FileText,
  BookOpen,
  HeartHandshake,
  UserCog,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import UserCard from "@/components/UserCard";
import { RiRoadMapLine } from "react-icons/ri";

type Role = "student" | "instructor" | "assistant";

const colors = {
  blue: "#3b82f6",
  green: "#10b981",
  yellow: "#f59e0b",
  purple: "#ff005c",
  pink: "#ec4899",
  indigo: "#6366f1",
  red: "#ef4444",
  orange: "#f97316",
};

interface ProfileData {
  role: Role;
  name: string;
  email: string;
  phone: string;
  university?: string;
  roadmaps?: { name: string; progress: number }[];
  courses?: { name: string; status: string }[];
  points?: number;
  achievements?: string[];
  approvedCourses?: { name: string; status: string }[];
  pendingCourseRequests?: string[];
  experience?: string;
  skills?: string[];
  assignedCourses?: { name: string; status: string }[];
  pendingApplications?: string[];
}

const profileData: ProfileData = {
  role: "assistant", // Change this to 'instructor' or 'assistant' to see different profiles
  name: "Rafiqur Rahman",
  email: "rafiqurrahman51@gmail.com",
  phone: "+09 345 346 46",
  university: "University of Leeds",
  roadmaps: [
    { name: "Web Development", progress: 65 },
    { name: "Data Science", progress: 30 },
  ],
  courses: [
    { name: "Introduction to React", status: "In Progress" },
    { name: "Python Basics", status: "Completed" },
  ],
  points: 1250,
  achievements: ["Frontend Developer", "Git Master"],
  approvedCourses: [
    { name: "Advanced React Patterns", status: "Ongoing" },
    { name: "Node.js Fundamentals", status: "Completed" },
  ],
  pendingCourseRequests: ["Machine Learning Basics", "GraphQL Mastery"],
  experience: "10+ years in web development and teaching",
  skills: ["React", "Node.js", "Python", "Data Structures"],
  assignedCourses: [
    { name: "JavaScript Fundamentals", status: "Ongoing" },
    { name: "CSS Layouts", status: "Completed" },
  ],
  pendingApplications: ["React Native Course", "Vue.js Basics"],
};

export default function ProfilePage() {
  const { role } = profileData;

  return (
    <div className="container max-w-5xl mx-auto p-4 pb-20 space-y-6">
      <div className="w-full ">
        {/* USER CARD */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <UserCard
            icon={<RiRoadMapLine />}
            title="Roadmaps"
            value="2"
            subtext="1 completed, 1 in progress"
            color={colors.blue}
          />
          <UserCard
            icon={<BookOpen />}
            title="Courses"
            value="5"
            subtext="2 completed, 3 in progress"
            color={colors.purple}
          />
        </div>
      </div>
      {role === "student" && <StudentContent data={profileData} />}
      {role === "instructor" && <InstructorContent data={profileData} />}
      {role === "assistant" && <AssistantContent data={profileData} />}
    </div>
  );
}

function ProfileHeader({ data }: { data: ProfileData }) {
  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between bg-white rounded-lg p-6 space-y-4 sm:space-y-0 border">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
        <div className="w-20 h-20 rounded-full overflow-hidden">
          <Image
            src="/IMG_6567.JPG"
            alt="Profile picture"
            width={80}
            height={80}
            className="object-cover"
          />
        </div>

        <div className="text-center sm:text-left">
          <h2 className="text-xl font-semibold">{data.name}</h2>
          <p className="text-muted-foreground capitalize">{data.role}</p>
          <p className="text-sm text-muted-foreground">
            {data.university || "No university listed"}
          </p>
        </div>
      </div>
      <Button variant="ghost" size="icon" className="text-blue-600">
        <PencilIcon className="h-4 w-4" />
        <span className="sr-only">Edit profile</span>
      </Button>
    </div>
  );
}

function PersonalInformation({ data }: { data: ProfileData }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Personal Information</CardTitle>
        <Button variant="ghost" size="icon" className="text-blue-600">
          <PencilIcon className="h-4 w-4" />
          <span className="sr-only">Edit personal information</span>
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-sm text-muted-foreground">First Name</label>
            <p className="font-medium">{data.name.split(" ")[0]}</p>
          </div>
          <div className="space-y-1">
            <label className="text-sm text-muted-foreground">Last Name</label>
            <p className="font-medium">{data.name.split(" ")[1]}</p>
          </div>
          <div className="space-y-1">
            <label className="text-sm text-muted-foreground">
              Email address
            </label>
            <p className="font-medium">{data.email}</p>
          </div>
          <div className="space-y-1">
            <label className="text-sm text-muted-foreground">Phone</label>
            <p className="font-medium">{data.phone}</p>
          </div>
        </div>
        {data.university && (
          <div className="space-y-1">
            <label className="text-sm text-muted-foreground">University</label>
            <p className="font-medium">{data.university}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function StudentContent({ data }: { data: ProfileData }) {
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Roadmap Progress</CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/roadmaps" className="text-blue-600">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.roadmaps?.map((roadmap, index) => (
            <div key={index}>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">{roadmap.name}</span>
                <span className="text-sm font-medium">{roadmap.progress}%</span>
              </div>
              <Progress value={roadmap.progress} className="w-full" />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Enrolled Courses</CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/courses" className="text-blue-600">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {data.courses?.map((course, index) => (
              <li key={index} className="flex justify-between items-center">
                <span>{course.name}</span>
                <Badge
                  variant={
                    course.status === "Completed" ? "default" : "secondary"
                  }
                >
                  {course.status}
                </Badge>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </>
  );
}

function InstructorContent({ data }: { data: ProfileData }) {
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Approved Courses</CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/roadmaps" className="text-blue-600">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {data.approvedCourses?.map((course, index) => (
              <li key={index} className="flex justify-between items-center">
                <span>{course.name}</span>
                <Badge
                  variant={
                    course.status === "Completed" ? "default" : "secondary"
                  }
                >
                  {course.status}
                </Badge>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Pending Course Requests</CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/roadmaps" className="text-blue-600">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {data.pendingCourseRequests?.map((course, index) => (
              <li key={index} className="flex justify-between items-center">
                <span>{course}</span>
                <Badge variant="secondary">Pending</Badge>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Experience & CV</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Experience</h3>
            <p>{data.experience}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {data.skills?.map((skill, index) => (
                <Badge key={index} variant="outline">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          <Button variant="outline" className="w-full">
            <FileText className="mr-2 h-4 w-4" />
            View Full CV
          </Button>
        </CardContent>
      </Card>
    </>
  );
}

function AssistantContent({ data }: { data: ProfileData }) {
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Assigned Courses</CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/roadmaps" className="text-blue-600">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {data.assignedCourses?.map((course, index) => (
              <li key={index} className="flex justify-between items-center">
                <span>{course.name}</span>
                <Badge
                  variant={
                    course.status === "Completed" ? "default" : "secondary"
                  }
                >
                  {course.status}
                </Badge>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Pending Applications</CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/roadmaps" className="text-blue-600">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {data.pendingApplications?.map((course, index) => (
              <li key={index} className="flex justify-between items-center">
                <span>{course}</span>
                <Badge variant="secondary">Pending</Badge>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Courses Progress</CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/roadmaps" className="text-blue-600">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.roadmaps?.map((roadmap, index) => (
            <div key={index}>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">{roadmap.name}</span>
                <span className="text-sm font-medium">{roadmap.progress}%</span>
              </div>
              <Progress value={roadmap.progress} className="w-full" />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Enrolled Courses</CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/courses" className="text-blue-600">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {data.courses?.map((course, index) => (
              <li key={index} className="flex justify-between items-center">
                <span>{course.name}</span>
                <Badge
                  variant={
                    course.status === "Completed" ? "default" : "secondary"
                  }
                >
                  {course.status}
                </Badge>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </>
  );
}
