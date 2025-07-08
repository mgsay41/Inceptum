-- CreateEnum
CREATE TYPE "CourseProviderStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'SUSPENDED');

-- DropIndex
DROP INDEX "Course_instructorId_roadmapId_adminId_idx";

-- DropIndex
DROP INDEX "Instructor_email_phoneNumber_idx";

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "courseProviderId" TEXT;

-- AlterTable
ALTER TABLE "Instructor" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "courseProviderId" TEXT,
ADD COLUMN     "experience" INTEGER,
ADD COLUMN     "specialization" TEXT;

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

-- CreateIndex
CREATE UNIQUE INDEX "CourseProvider_providerId_key" ON "CourseProvider"("providerId");

-- CreateIndex
CREATE UNIQUE INDEX "CourseProvider_email_key" ON "CourseProvider"("email");

-- CreateIndex
CREATE UNIQUE INDEX "CourseProvider_phoneNumber_key" ON "CourseProvider"("phoneNumber");

-- CreateIndex
CREATE INDEX "CourseProvider_email_phoneNumber_companyName_idx" ON "CourseProvider"("email", "phoneNumber", "companyName");

-- CreateIndex
CREATE INDEX "Course_instructorId_roadmapId_adminId_courseProviderId_idx" ON "Course"("instructorId", "roadmapId", "adminId", "courseProviderId");

-- CreateIndex
CREATE INDEX "Instructor_email_phoneNumber_courseProviderId_idx" ON "Instructor"("email", "phoneNumber", "courseProviderId");

-- AddForeignKey
ALTER TABLE "CourseProvider" ADD CONSTRAINT "CourseProvider_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_courseProviderId_fkey" FOREIGN KEY ("courseProviderId") REFERENCES "CourseProvider"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Instructor" ADD CONSTRAINT "Instructor_courseProviderId_fkey" FOREIGN KEY ("courseProviderId") REFERENCES "CourseProvider"("id") ON DELETE SET NULL ON UPDATE CASCADE;
