-- CreateEnum
CREATE TYPE "InstructorClass" AS ENUM ('A', 'B', 'C');

-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- CreateEnum
CREATE TYPE "CourseStatus" AS ENUM ('PENDING', 'APPROVED', 'PUBLISHED', 'REJECTED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "RoadmapStatus" AS ENUM ('PENDING', 'APPROVED', 'PUBLISHED', 'REJECTED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "CourseProviderStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'SUSPENDED');

-- CreateEnum
CREATE TYPE "CourseLevel" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT');

-- CreateEnum
CREATE TYPE "CourseType" AS ENUM ('ONLINE', 'OFFLINE', 'HYBRID');

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "adminId" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "profilePicture" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "inceptumId" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "profilePhoto" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "bio" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseProvider" (
    "id" TEXT NOT NULL,
    "providerId" SERIAL NOT NULL,
    "companyName" TEXT NOT NULL,
    "companyDescription" TEXT,
    "website" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "address" TEXT,
    "city" TEXT,
    "country" TEXT,
    "logo" TEXT,
    "coverImage" TEXT,
    "established" TIMESTAMP(3),
    "socialMediaLinks" JSONB,
    "businessLicense" TEXT,
    "taxId" TEXT,
    "rating" DOUBLE PRECISION DEFAULT 0.0,
    "totalStudents" INTEGER NOT NULL DEFAULT 0,
    "totalCourses" INTEGER NOT NULL DEFAULT 0,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "status" "CourseProviderStatus" NOT NULL DEFAULT 'PENDING',
    "adminId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CourseProvider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Education" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "university" TEXT NOT NULL,
    "college" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "yearOfGraduation" INTEGER NOT NULL,
    "degree" TEXT NOT NULL,
    "universityId" TEXT NOT NULL,
    "photo" TEXT,

    CONSTRAINT "Education_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Certificate" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "file" TEXT NOT NULL,
    "issueDate" TIMESTAMP(3) NOT NULL,
    "institute" TEXT NOT NULL,

    CONSTRAINT "Certificate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "shortDescription" TEXT,
    "courseImage" TEXT,
    "courseFee" DECIMAL(10,2) NOT NULL,
    "rating" DOUBLE PRECISION DEFAULT 0.0,
    "totalRatings" INTEGER NOT NULL DEFAULT 0,
    "level" "CourseLevel" NOT NULL DEFAULT 'BEGINNER',
    "duration" INTEGER NOT NULL,
    "courseType" "CourseType" NOT NULL DEFAULT 'ONLINE',
    "language" TEXT NOT NULL DEFAULT 'English',
    "address" TEXT,
    "city" TEXT,
    "country" TEXT,
    "venue" TEXT,
    "totalLessons" INTEGER,
    "totalProjects" INTEGER DEFAULT 0,
    "hasCapstoneProject" BOOLEAN NOT NULL DEFAULT false,
    "hasCertificate" BOOLEAN NOT NULL DEFAULT true,
    "prerequisites" TEXT[],
    "learningOutcomes" TEXT[],
    "courseOutline" TEXT,
    "maxStudents" INTEGER,
    "currentStudents" INTEGER NOT NULL DEFAULT 0,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "enrollmentDeadline" TIMESTAMP(3),
    "instructorId" TEXT,
    "courseProviderId" TEXT,
    "roadmapId" INTEGER,
    "adminId" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "status" "CourseStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "icon" TEXT,
    "color" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CourseCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Roadmap" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "shortDescription" TEXT,
    "roadmapImage" TEXT,
    "level" "CourseLevel" NOT NULL DEFAULT 'BEGINNER',
    "estimatedDuration" INTEGER,
    "totalCourses" INTEGER NOT NULL DEFAULT 0,
    "prerequisites" TEXT[],
    "learningGoals" TEXT[],
    "careerOutcomes" TEXT[],
    "sequence" INTEGER[],
    "isLinear" BOOLEAN NOT NULL DEFAULT true,
    "adminId" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "status" "RoadmapStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Roadmap_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Instructor" (
    "id" TEXT NOT NULL,
    "instructorId" SERIAL NOT NULL,
    "profilePicture" TEXT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "instructorClass" "InstructorClass" NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "rating" DOUBLE PRECISION DEFAULT 0.0,
    "totalRatings" INTEGER NOT NULL DEFAULT 0,
    "cv" TEXT,
    "bio" TEXT,
    "specialization" TEXT,
    "experience" INTEGER,
    "expertise" TEXT[],
    "certifications" TEXT[],
    "linkedinUrl" TEXT,
    "githubUrl" TEXT,
    "portfolioUrl" TEXT,
    "totalStudents" INTEGER NOT NULL DEFAULT 0,
    "totalCourses" INTEGER NOT NULL DEFAULT 0,
    "courseProviderId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Instructor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseRequest" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "roadmapName" TEXT,
    "duration" INTEGER NOT NULL,
    "courseOutline" TEXT,
    "courseFee" DECIMAL(10,2),
    "level" "CourseLevel" NOT NULL DEFAULT 'BEGINNER',
    "courseType" "CourseType" NOT NULL DEFAULT 'ONLINE',
    "location" TEXT,
    "address" TEXT,
    "city" TEXT,
    "country" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "courseImage" TEXT,
    "numberOfSessions" INTEGER NOT NULL,
    "sessionDuration" INTEGER NOT NULL,
    "maxStudents" INTEGER,
    "instructorId" TEXT NOT NULL,
    "status" "RequestStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CourseRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserCourses" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_UserCourses_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_EnrolledRoadMaps" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_EnrolledRoadMaps_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_InstructorRoadMaps" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_InstructorRoadMaps_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_adminId_key" ON "Admin"("adminId");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_phoneNumber_key" ON "Admin"("phoneNumber");

-- CreateIndex
CREATE INDEX "Admin_email_phoneNumber_idx" ON "Admin"("email", "phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "User_inceptumId_key" ON "User"("inceptumId");

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNumber_key" ON "User"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_email_phoneNumber_idx" ON "User"("email", "phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "CourseProvider_providerId_key" ON "CourseProvider"("providerId");

-- CreateIndex
CREATE UNIQUE INDEX "CourseProvider_email_key" ON "CourseProvider"("email");

-- CreateIndex
CREATE UNIQUE INDEX "CourseProvider_phoneNumber_key" ON "CourseProvider"("phoneNumber");

-- CreateIndex
CREATE INDEX "CourseProvider_email_phoneNumber_companyName_idx" ON "CourseProvider"("email", "phoneNumber", "companyName");

-- CreateIndex
CREATE INDEX "Education_userId_idx" ON "Education"("userId");

-- CreateIndex
CREATE INDEX "Certificate_userId_idx" ON "Certificate"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Course_slug_key" ON "Course"("slug");

-- CreateIndex
CREATE INDEX "Course_slug_instructorId_roadmapId_adminId_courseProviderId_idx" ON "Course"("slug", "instructorId", "roadmapId", "adminId", "courseProviderId", "categoryId");

-- CreateIndex
CREATE INDEX "Course_level_courseType_rating_idx" ON "Course"("level", "courseType", "rating");

-- CreateIndex
CREATE UNIQUE INDEX "CourseCategory_name_key" ON "CourseCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "CourseCategory_slug_key" ON "CourseCategory"("slug");

-- CreateIndex
CREATE INDEX "CourseCategory_slug_idx" ON "CourseCategory"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Roadmap_slug_key" ON "Roadmap"("slug");

-- CreateIndex
CREATE INDEX "Roadmap_slug_adminId_categoryId_idx" ON "Roadmap"("slug", "adminId", "categoryId");

-- CreateIndex
CREATE INDEX "Roadmap_level_status_idx" ON "Roadmap"("level", "status");

-- CreateIndex
CREATE UNIQUE INDEX "Instructor_instructorId_key" ON "Instructor"("instructorId");

-- CreateIndex
CREATE UNIQUE INDEX "Instructor_phoneNumber_key" ON "Instructor"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Instructor_email_key" ON "Instructor"("email");

-- CreateIndex
CREATE INDEX "Instructor_email_phoneNumber_courseProviderId_idx" ON "Instructor"("email", "phoneNumber", "courseProviderId");

-- CreateIndex
CREATE INDEX "Instructor_rating_experience_idx" ON "Instructor"("rating", "experience");

-- CreateIndex
CREATE INDEX "CourseRequest_instructorId_status_idx" ON "CourseRequest"("instructorId", "status");

-- CreateIndex
CREATE INDEX "_UserCourses_B_index" ON "_UserCourses"("B");

-- CreateIndex
CREATE INDEX "_EnrolledRoadMaps_B_index" ON "_EnrolledRoadMaps"("B");

-- CreateIndex
CREATE INDEX "_InstructorRoadMaps_B_index" ON "_InstructorRoadMaps"("B");

-- AddForeignKey
ALTER TABLE "CourseProvider" ADD CONSTRAINT "CourseProvider_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Education" ADD CONSTRAINT "Education_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certificate" ADD CONSTRAINT "Certificate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "Instructor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_courseProviderId_fkey" FOREIGN KEY ("courseProviderId") REFERENCES "CourseProvider"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_roadmapId_fkey" FOREIGN KEY ("roadmapId") REFERENCES "Roadmap"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "CourseCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Roadmap" ADD CONSTRAINT "Roadmap_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Roadmap" ADD CONSTRAINT "Roadmap_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "CourseCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Instructor" ADD CONSTRAINT "Instructor_courseProviderId_fkey" FOREIGN KEY ("courseProviderId") REFERENCES "CourseProvider"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseRequest" ADD CONSTRAINT "CourseRequest_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "Instructor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserCourses" ADD CONSTRAINT "_UserCourses_A_fkey" FOREIGN KEY ("A") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserCourses" ADD CONSTRAINT "_UserCourses_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EnrolledRoadMaps" ADD CONSTRAINT "_EnrolledRoadMaps_A_fkey" FOREIGN KEY ("A") REFERENCES "Roadmap"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EnrolledRoadMaps" ADD CONSTRAINT "_EnrolledRoadMaps_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InstructorRoadMaps" ADD CONSTRAINT "_InstructorRoadMaps_A_fkey" FOREIGN KEY ("A") REFERENCES "Instructor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InstructorRoadMaps" ADD CONSTRAINT "_InstructorRoadMaps_B_fkey" FOREIGN KEY ("B") REFERENCES "Roadmap"("id") ON DELETE CASCADE ON UPDATE CASCADE;
