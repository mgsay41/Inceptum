const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");

const prisma = new PrismaClient();

// Helper function to generate slug from title
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "_")
    .replace(/-+/g, "_")
    .trim();
}

// Helper function to generate random array elements
function getRandomElements(array, count) {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

async function main() {
  console.log("🌱 Starting database seeding...");

  try {
    // Clear existing data (optional - remove if you want to keep existing data)
    console.log("🧹 Cleaning existing data...");
    await prisma.courseRequest.deleteMany();
    await prisma.course.deleteMany();
    await prisma.roadmap.deleteMany();
    await prisma.instructor.deleteMany();
    await prisma.certificate.deleteMany();
    await prisma.education.deleteMany();
    await prisma.courseCategory.deleteMany();
    await prisma.courseProvider.deleteMany();
    await prisma.user.deleteMany();
    await prisma.admin.deleteMany();

    // 1. Create Admins
    console.log("👑 Creating admins...");
    const admins = [];
    for (let i = 0; i < 3; i++) {
      const admin = await prisma.admin.create({
        data: {
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
          phoneNumber: faker.phone.number(),
          profilePicture: faker.image.avatar(),
        },
      });
      admins.push(admin);
    }

    // 2. Create Course Categories
    console.log("📚 Creating course categories...");
    const categoryData = [
      { name: "Web Development", icon: "🌐", color: "#3B82F6" },
      { name: "Mobile Development", icon: "📱", color: "#10B981" },
      { name: "Data Science", icon: "📊", color: "#8B5CF6" },
      { name: "Artificial Intelligence", icon: "🤖", color: "#F59E0B" },
      { name: "DevOps", icon: "⚙️", color: "#EF4444" },
      { name: "Cybersecurity", icon: "🔒", color: "#6366F1" },
      { name: "UI/UX Design", icon: "🎨", color: "#EC4899" },
      { name: "Cloud Computing", icon: "☁️", color: "#06B6D4" },
    ];

    const categories = [];
    for (const cat of categoryData) {
      const category = await prisma.courseCategory.create({
        data: {
          name: cat.name,
          slug: generateSlug(cat.name),
          description: faker.lorem.paragraph(),
          icon: cat.icon,
          color: cat.color,
        },
      });
      categories.push(category);
    }

    // 3. Create Course Providers
    console.log("🏢 Creating course providers...");
    const courseProviders = [];
    for (let i = 0; i < 5; i++) {
      const companyName = faker.company.name();
      const provider = await prisma.courseProvider.create({
        data: {
          companyName,
          companyDescription: faker.company.catchPhrase(),
          website: faker.internet.url(),
          email: faker.internet.email(),
          password: faker.internet.password(),
          phoneNumber: faker.phone.number(),
          address: faker.location.streetAddress(),
          city: faker.location.city(),
          country: faker.location.country(),
          logo: faker.image.url(),
          coverImage: faker.image.url(),
          established: faker.date.past({ years: 10 }),
          socialMediaLinks: {
            twitter: faker.internet.url(),
            linkedin: faker.internet.url(),
            facebook: faker.internet.url(),
          },
          businessLicense: faker.string.alphanumeric(10),
          taxId: faker.string.numeric(9),
          rating: faker.number.float({ min: 3.5, max: 5, fractionDigits: 1 }),
          totalStudents: faker.number.int({ min: 100, max: 5000 }),
          totalCourses: faker.number.int({ min: 5, max: 50 }),
          verified: faker.datatype.boolean(),
          status: faker.helpers.arrayElement([
            "APPROVED",
            "PENDING",
            "REJECTED",
          ]),
          adminId: faker.helpers.arrayElement(admins).id,
        },
      });
      courseProviders.push(provider);
    }

    // 4. Create Users
    console.log("👥 Creating users...");
    const users = [];
    for (let i = 0; i < 50; i++) {
      const user = await prisma.user.create({
        data: {
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          phoneNumber: faker.phone.number(),
          profilePhoto: faker.image.avatar(),
          email: faker.internet.email(),
          password: faker.internet.password(),
          age: faker.number.int({ min: 18, max: 65 }),
          bio: faker.lorem.paragraph(),
        },
      });
      users.push(user);
    }

    // 5. Create Education records for users
    console.log("🎓 Creating education records...");
    for (const user of users.slice(0, 30)) {
      await prisma.education.create({
        data: {
          userId: user.id,
          university: faker.helpers.arrayElement([
            "Harvard University",
            "MIT",
            "Stanford University",
            "University of California",
            "Oxford University",
            "Cambridge University",
          ]),
          college: faker.helpers.arrayElement([
            "College of Engineering",
            "College of Computer Science",
            "Business School",
            "College of Arts and Sciences",
          ]),
          department: faker.helpers.arrayElement([
            "Computer Science",
            "Software Engineering",
            "Information Technology",
            "Business Administration",
            "Data Science",
          ]),
          yearOfGraduation: faker.number.int({ min: 2015, max: 2024 }),
          degree: faker.helpers.arrayElement(["Bachelor", "Master", "PhD"]),
          universityId: faker.string.alphanumeric(8),
          photo: faker.image.url(),
        },
      });
    }

    // 6. Create Instructors
    console.log("👨‍🏫 Creating instructors...");
    const instructors = [];
    const skills = [
      "JavaScript",
      "Python",
      "React",
      "Node.js",
      "Docker",
      "AWS",
      "Machine Learning",
      "Data Analysis",
      "UI/UX Design",
      "Cybersecurity",
      "DevOps",
      "Mobile Development",
    ];

    for (let i = 0; i < 20; i++) {
      const instructor = await prisma.instructor.create({
        data: {
          profilePicture: faker.image.avatar(),
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          phoneNumber: faker.phone.number(),
          instructorClass: faker.helpers.arrayElement(["A", "B", "C"]),
          email: faker.internet.email(),
          password: faker.internet.password(),
          age: faker.number.int({ min: 25, max: 65 }),
          rating: faker.number.float({ min: 3.5, max: 5, fractionDigits: 1 }),
          totalRatings: faker.number.int({ min: 10, max: 500 }),
          cv: faker.internet.url(),
          bio: faker.lorem.paragraphs(2),
          specialization: faker.helpers.arrayElement([
            "Full Stack Development",
            "Data Science",
            "Mobile Development",
            "DevOps Engineering",
            "UI/UX Design",
          ]),
          experience: faker.number.int({ min: 2, max: 15 }),
          expertise: getRandomElements(
            skills,
            faker.number.int({ min: 3, max: 6 })
          ),
          certifications: [
            "AWS Certified Solutions Architect",
            "Google Cloud Professional",
            "Certified Kubernetes Administrator",
          ],
          linkedinUrl: faker.internet.url(),
          githubUrl: faker.internet.url(),
          portfolioUrl: faker.internet.url(),
          totalStudents: faker.number.int({ min: 50, max: 1000 }),
          totalCourses: faker.number.int({ min: 2, max: 15 }),
          courseProviderId: faker.datatype.boolean({ probability: 0.7 })
            ? faker.helpers.arrayElement(courseProviders).id
            : null,
        },
      });
      instructors.push(instructor);
    }

    // 7. Create Roadmaps
    console.log("🗺️ Creating roadmaps...");
    const roadmaps = [];
    const roadmapTitles = [
      "Full Stack Web Developer",
      "Data Scientist Career Path",
      "Mobile App Developer",
      "DevOps Engineer Roadmap",
      "AI/ML Specialist Track",
      "Cybersecurity Expert Path",
      "UI/UX Designer Journey",
      "Cloud Architect Roadmap",
    ];

    for (let i = 0; i < roadmapTitles.length; i++) {
      const title = roadmapTitles[i];
      const roadmap = await prisma.roadmap.create({
        data: {
          title,
          slug: generateSlug(title),
          description: faker.lorem.paragraphs(3),
          shortDescription: faker.lorem.sentence(),
          roadmapImage: faker.image.url(),
          level: faker.helpers.arrayElement([
            "BEGINNER",
            "INTERMEDIATE",
            "ADVANCED",
          ]),
          estimatedDuration: faker.number.int({ min: 100, max: 500 }),
          totalCourses: faker.number.int({ min: 3, max: 8 }),
          prerequisites: getRandomElements(
            [
              "Basic programming knowledge",
              "Understanding of web technologies",
              "Mathematical foundation",
              "Problem-solving skills",
            ],
            faker.number.int({ min: 1, max: 3 })
          ),
          learningGoals: [
            "Master core technologies",
            "Build real-world projects",
            "Understand best practices",
            "Prepare for job interviews",
          ],
          careerOutcomes: [
            "Software Developer",
            "Senior Engineer",
            "Technical Lead",
            "Freelance Consultant",
          ],
          sequence: [], // Will be updated after creating courses
          isLinear: faker.datatype.boolean(),
          adminId: faker.helpers.arrayElement(admins).id,
          categoryId: categories[i % categories.length].id,
          status: faker.helpers.arrayElement([
            "APPROVED",
            "PUBLISHED",
            "PENDING",
          ]),
        },
      });
      roadmaps.push(roadmap);
    }

    // 8. Create Courses
    console.log("📖 Creating courses...");
    const courses = [];
    const courseTitles = [
      "Introduction to Web Development",
      "Advanced JavaScript Concepts",
      "React for Beginners",
      "Node.js Backend Development",
      "Python Data Science Fundamentals",
      "Machine Learning with TensorFlow",
      "Mobile App Development with React Native",
      "Docker and Containerization",
      "AWS Cloud Fundamentals",
      "Cybersecurity Basics",
      "UI/UX Design Principles",
      "Database Design and SQL",
      "DevOps with Jenkins and GitHub Actions",
      "Advanced Python Programming",
      "Full Stack Project Development",
    ];

    for (let i = 0; i < courseTitles.length; i++) {
      const title = courseTitles[i];
      const courseType = faker.helpers.arrayElement([
        "ONLINE",
        "OFFLINE",
        "HYBRID",
      ]);

      const course = await prisma.course.create({
        data: {
          title,
          slug: generateSlug(title),
          description: faker.lorem.paragraphs(3),
          shortDescription: faker.lorem.sentence(),
          courseImage: faker.image.url(),
          courseFee: faker.number.float({
            min: 99,
            max: 999,
            fractionDigits: 2,
          }),
          rating: faker.number.float({ min: 3.5, max: 5, fractionDigits: 1 }),
          totalRatings: faker.number.int({ min: 10, max: 500 }),
          level: faker.helpers.arrayElement([
            "BEGINNER",
            "INTERMEDIATE",
            "ADVANCED",
          ]),
          duration: faker.number.int({ min: 20, max: 120 }),
          courseType,
          language: faker.helpers.arrayElement([
            "English",
            "Arabic",
            "Spanish",
          ]),

          // Location fields (for offline courses)
          address:
            courseType !== "ONLINE" ? faker.location.streetAddress() : null,
          city: courseType !== "ONLINE" ? faker.location.city() : null,
          country: courseType !== "ONLINE" ? faker.location.country() : null,
          venue:
            courseType !== "ONLINE"
              ? faker.company.name() + " Training Center"
              : null,

          // Course structure
          totalLessons: faker.number.int({ min: 10, max: 50 }),
          totalProjects: faker.number.int({ min: 1, max: 5 }),
          hasCapstoneProject: faker.datatype.boolean(),
          hasCertificate: faker.datatype.boolean({ probability: 0.8 }),

          // Prerequisites and outcomes
          prerequisites: getRandomElements(
            [
              "Basic programming knowledge",
              "Understanding of web technologies",
              "Mathematical foundation",
              "Problem-solving skills",
            ],
            faker.number.int({ min: 0, max: 3 })
          ),
          learningOutcomes: [
            "Master the fundamental concepts",
            "Build practical projects",
            "Understand industry best practices",
            "Prepare for advanced topics",
          ],
          courseOutline: faker.lorem.paragraphs(5),

          // Enrollment details
          maxStudents: faker.number.int({ min: 20, max: 100 }),
          currentStudents: faker.number.int({ min: 5, max: 80 }),
          startDate: faker.date.future(),
          endDate: faker.date.future(),
          enrollmentDeadline: faker.date.soon(),

          // Relationships
          instructorId: faker.helpers.arrayElement(instructors).id,
          courseProviderId: faker.datatype.boolean({ probability: 0.6 })
            ? faker.helpers.arrayElement(courseProviders).id
            : null,
          roadmapId: faker.datatype.boolean({ probability: 0.8 })
            ? faker.helpers.arrayElement(roadmaps).id
            : null,
          adminId: faker.helpers.arrayElement(admins).id,
          categoryId: faker.helpers.arrayElement(categories).id,
          status: faker.helpers.arrayElement([
            "APPROVED",
            "PUBLISHED",
            "PENDING",
          ]),
        },
      });
      courses.push(course);
    }

    // 9. Create Course Enrollments
    console.log("📝 Creating course enrollments...");
    for (const course of courses) {
      const enrolledUsers = getRandomElements(
        users,
        faker.number.int({ min: 5, max: 15 })
      );
      await prisma.course.update({
        where: { id: course.id },
        data: {
          enrolledStudents: {
            connect: enrolledUsers.map((user) => ({ id: user.id })),
          },
        },
      });
    }

    // 10. Create Roadmap Enrollments
    console.log("🗺️ Creating roadmap enrollments...");
    for (const roadmap of roadmaps) {
      const enrolledUsers = getRandomElements(
        users,
        faker.number.int({ min: 3, max: 10 })
      );
      await prisma.roadmap.update({
        where: { id: roadmap.id },
        data: {
          students: {
            connect: enrolledUsers.map((user) => ({ id: user.id })),
          },
        },
      });
    }

    // 11. Create Certificates
    console.log("🏆 Creating certificates...");
    for (let i = 0; i < 30; i++) {
      await prisma.certificate.create({
        data: {
          userId: faker.helpers.arrayElement(users).id,
          name: faker.helpers.arrayElement([
            "JavaScript Fundamentals Certificate",
            "React Developer Certification",
            "Python Data Science Certificate",
            "AWS Cloud Practitioner",
            "Google Analytics Certified",
          ]),
          file: faker.internet.url(),
          issueDate: faker.date.past(),
          institute: faker.helpers.arrayElement([
            "Coursera",
            "edX",
            "Udacity",
            "Google",
            "Microsoft",
            "AWS",
          ]),
        },
      });
    }

    // 12. Create Course Requests
    console.log("📋 Creating course requests...");
    for (let i = 0; i < 10; i++) {
      const courseType = faker.helpers.arrayElement([
        "ONLINE",
        "OFFLINE",
        "HYBRID",
      ]);
      await prisma.courseRequest.create({
        data: {
          title: faker.lorem.words(3),
          description: faker.lorem.paragraphs(2),
          roadmapName: faker.helpers.arrayElement(roadmapTitles),
          duration: faker.number.int({ min: 20, max: 100 }),
          courseOutline: faker.lorem.paragraphs(3),
          courseFee: faker.number.float({
            min: 199,
            max: 1999,
            fractionDigits: 2,
          }),
          level: faker.helpers.arrayElement([
            "BEGINNER",
            "INTERMEDIATE",
            "ADVANCED",
          ]),
          courseType,
          location: courseType !== "ONLINE" ? faker.location.city() : null,
          address:
            courseType !== "ONLINE" ? faker.location.streetAddress() : null,
          city: courseType !== "ONLINE" ? faker.location.city() : null,
          country: courseType !== "ONLINE" ? faker.location.country() : null,
          startDate: faker.date.future(),
          endDate: faker.date.future(),
          courseImage: faker.image.url(),
          numberOfSessions: faker.number.int({ min: 8, max: 24 }),
          sessionDuration: faker.number.int({ min: 60, max: 180 }),
          maxStudents: faker.number.int({ min: 15, max: 50 }),
          instructorId: faker.helpers.arrayElement(instructors).id,
          status: faker.helpers.arrayElement([
            "PENDING",
            "ACCEPTED",
            "REJECTED",
          ]),
        },
      });
    }

    console.log("✅ Database seeding completed successfully!");
    console.log(`Created:
    - ${admins.length} admins
    - ${categories.length} course categories
    - ${courseProviders.length} course providers
    - ${users.length} users
    - ${instructors.length} instructors
    - ${roadmaps.length} roadmaps
    - ${courses.length} courses
    - 30 certificates
    - 10 course requests
    - Course and roadmap enrollments`);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
