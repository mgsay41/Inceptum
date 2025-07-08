const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function cleanup() {
  console.log("🧹 Starting database cleanup...");

  try {
    // Delete all data in the correct order (respecting foreign key constraints)
    console.log("🗑️  Deleting assistant applications...");
    await prisma.assistant.deleteMany();

    console.log("🗑️  Deleting course requests...");
    await prisma.courseRequest.deleteMany();

    console.log("🗑️  Deleting courses...");
    await prisma.course.deleteMany();

    console.log("🗑️  Deleting roadmaps...");
    await prisma.roadmap.deleteMany();

    console.log("🗑️  Deleting certificates...");
    await prisma.certificate.deleteMany();

    console.log("🗑️  Deleting education records...");
    await prisma.education.deleteMany();

    console.log("🗑️  Deleting instructors...");
    await prisma.instructor.deleteMany();

    console.log("🗑️  Deleting course providers...");
    await prisma.courseProvider.deleteMany();

    console.log("🗑️  Deleting users...");
    await prisma.user.deleteMany();

    console.log("🗑️  Deleting admins...");
    await prisma.admin.deleteMany();

    // Reset auto-increment sequences (PostgreSQL specific)
    console.log("🔄 Resetting auto-increment sequences...");
    await prisma.$executeRaw`ALTER SEQUENCE "Admin_adminId_seq" RESTART WITH 1`;
    await prisma.$executeRaw`ALTER SEQUENCE "User_inceptumId_seq" RESTART WITH 1`;
    await prisma.$executeRaw`ALTER SEQUENCE "CourseProvider_providerId_seq" RESTART WITH 1`;
    await prisma.$executeRaw`ALTER SEQUENCE "Education_id_seq" RESTART WITH 1`;
    await prisma.$executeRaw`ALTER SEQUENCE "Certificate_id_seq" RESTART WITH 1`;
    await prisma.$executeRaw`ALTER SEQUENCE "Course_id_seq" RESTART WITH 1`;
    await prisma.$executeRaw`ALTER SEQUENCE "Assistant_id_seq" RESTART WITH 1`;
    await prisma.$executeRaw`ALTER SEQUENCE "Roadmap_id_seq" RESTART WITH 1`;
    await prisma.$executeRaw`ALTER SEQUENCE "Instructor_instructorId_seq" RESTART WITH 1`;
    await prisma.$executeRaw`ALTER SEQUENCE "CourseRequest_id_seq" RESTART WITH 1`;

    console.log("✅ Database cleanup completed successfully!");
    console.log("🎉 All test data has been removed and sequences reset.");
  } catch (error) {
    console.error("❌ Error during cleanup:", error);
    throw error;
  }
}

cleanup()
  .catch((e) => {
    console.error("❌ Cleanup failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
