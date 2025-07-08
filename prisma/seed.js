const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

// Helper function to hash passwords
async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

// Generate random dates
function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

// Generate random rating
function randomRating() {
  return Math.round((Math.random() * 4 + 1) * 10) / 10; // 1.0 to 5.0
}

async function main() {
  console.log("🌱 Starting database seeding...");

  // Clear existing data (in correct order due to foreign key constraints)
  console.log("🧹 Clearing existing data...");
  await prisma.assistant.deleteMany();
  await prisma.courseRequest.deleteMany();
  await prisma.course.deleteMany();
  await prisma.roadmap.deleteMany();
  await prisma.certificate.deleteMany();
  await prisma.education.deleteMany();
  await prisma.instructor.deleteMany();
  await prisma.courseProvider.deleteMany();
  await prisma.user.deleteMany();
  await prisma.admin.deleteMany();

  // Create Admins
  console.log("👑 Creating admins...");
  const admins = await Promise.all([
    prisma.admin.create({
      data: {
        firstName: "John",
        lastName: "Admin",
        email: "john.admin@example.com",
        password: await hashPassword("admin123"),
        phoneNumber: "+1234567890",
        profilePicture: "https://example.com/admin1.jpg",
      },
    }),
    prisma.admin.create({
      data: {
        firstName: "Sarah",
        lastName: "Manager",
        email: "sarah.manager@example.com",
        password: await hashPassword("admin123"),
        phoneNumber: "+1234567891",
        profilePicture: "https://example.com/admin2.jpg",
      },
    }),
  ]);

  // Create Instructors
  console.log("👨‍🏫 Creating instructors...");
  const instructors = await Promise.all([
    prisma.instructor.create({
      data: {
        firstName: "Dr. Michael",
        lastName: "Johnson",
        email: "michael.johnson@example.com",
        password: await hashPassword("instructor123"),
        phoneNumber: "+1234567892",
        instructorClass: "A",
        age: 45,
        rating: randomRating(),
        cv: "https://example.com/cv1.pdf",
        profilePicture: "https://example.com/instructor1.jpg",
        bio: "Experienced software architect with 15+ years in web development",
        specialization: "Full Stack Development",
        experience: 15,
      },
    }),
    prisma.instructor.create({
      data: {
        firstName: "Prof. Emily",
        lastName: "Davis",
        email: "emily.davis@example.com",
        password: await hashPassword("instructor123"),
        phoneNumber: "+1234567893",
        instructorClass: "B",
        age: 38,
        rating: randomRating(),
        cv: "https://example.com/cv2.pdf",
        profilePicture: "https://example.com/instructor2.jpg",
        bio: "React specialist and frontend architecture expert",
        specialization: "Frontend Development",
        experience: 12,
      },
    }),
    prisma.instructor.create({
      data: {
        firstName: "Dr. Robert",
        lastName: "Wilson",
        email: "robert.wilson@example.com",
        password: await hashPassword("instructor123"),
        phoneNumber: "+1234567894",
        instructorClass: "C",
        age: 52,
        rating: randomRating(),
        cv: "https://example.com/cv3.pdf",
        profilePicture: "https://example.com/instructor3.jpg",
        bio: "Data scientist and machine learning researcher",
        specialization: "Data Science & ML",
        experience: 20,
      },
    }),
  ]);

  // Create Course Providers
  console.log("🏢 Creating course providers...");
  const courseProviders = await Promise.all([
    prisma.courseProvider.create({
      data: {
        companyName: "TechEd Solutions",
        companyDescription:
          "Leading provider of technology education and professional development courses",
        website: "https://techedsolutions.com",
        email: "info@techedsolutions.com",
        password: await hashPassword("provider123"),
        phoneNumber: "+1234567800",
        address: "123 Tech Street, Silicon Valley",
        city: "San Francisco",
        country: "USA",
        logo: "https://example.com/teched-logo.png",
        coverImage: "https://example.com/teched-cover.jpg",
        established: new Date(2018, 0, 1),
        socialMediaLinks: {
          linkedin: "https://linkedin.com/company/techedsolutions",
          twitter: "https://twitter.com/techedsolutions",
          facebook: "https://facebook.com/techedsolutions",
          youtube: "https://youtube.com/techedsolutions",
        },
        businessLicense: "BL2018-TECH-001",
        taxId: "TX-789123456",
        rating: 4.8,
        totalStudents: 2500,
        totalCourses: 15,
        verified: true,
        status: "APPROVED",
        approvedBy: { connect: { id: admins[0].id } },
      },
    }),
    prisma.courseProvider.create({
      data: {
        companyName: "DataScience Academy",
        companyDescription:
          "Specialized training institute for data science and analytics professionals",
        website: "https://datascienceacademy.com",
        email: "contact@datascienceacademy.com",
        password: await hashPassword("provider123"),
        phoneNumber: "+1234567801",
        address: "456 Analytics Ave, Tech District",
        city: "Boston",
        country: "USA",
        logo: "https://example.com/datasci-logo.png",
        coverImage: "https://example.com/datasci-cover.jpg",
        established: new Date(2020, 5, 15),
        socialMediaLinks: {
          linkedin: "https://linkedin.com/company/datascienceacademy",
          twitter: "https://twitter.com/datascienceacad",
          instagram: "https://instagram.com/datascienceacademy",
        },
        businessLicense: "BL2020-DATA-002",
        taxId: "TX-456789123",
        rating: 4.6,
        totalStudents: 1200,
        totalCourses: 8,
        verified: true,
        status: "APPROVED",
        approvedBy: { connect: { id: admins[1].id } },
      },
    }),
    prisma.courseProvider.create({
      data: {
        companyName: "Mobile Dev Institute",
        companyDescription:
          "Premier mobile application development training center",
        website: "https://mobiledevinstitute.com",
        email: "hello@mobiledevinstitute.com",
        password: await hashPassword("provider123"),
        phoneNumber: "+1234567802",
        address: "789 Mobile Plaza, Innovation Hub",
        city: "Austin",
        country: "USA",
        logo: "https://example.com/mobile-logo.png",
        coverImage: "https://example.com/mobile-cover.jpg",
        established: new Date(2019, 8, 20),
        socialMediaLinks: {
          linkedin: "https://linkedin.com/company/mobiledevinstitute",
          twitter: "https://twitter.com/mobiledevinst",
          youtube: "https://youtube.com/mobiledevinstitute",
        },
        businessLicense: "BL2019-MOB-003",
        taxId: "TX-123456789",
        rating: 4.4,
        totalStudents: 800,
        totalCourses: 6,
        verified: false,
        status: "PENDING",
      },
    }),
  ]);

  // Update some instructors to belong to course providers
  console.log("🔗 Assigning instructors to course providers...");
  await prisma.instructor.update({
    where: { id: instructors[0].id },
    data: { courseProviderId: courseProviders[0].id },
  });

  await prisma.instructor.update({
    where: { id: instructors[1].id },
    data: { courseProviderId: courseProviders[0].id },
  });

  await prisma.instructor.update({
    where: { id: instructors[2].id },
    data: { courseProviderId: courseProviders[1].id },
  });

  // Create additional independent instructor
  const independentInstructor = await prisma.instructor.create({
    data: {
      firstName: "Sarah",
      lastName: "Thompson",
      email: "sarah.thompson@example.com",
      password: await hashPassword("instructor123"),
      phoneNumber: "+1234567899",
      instructorClass: "A",
      age: 35,
      rating: randomRating(),
      cv: "https://example.com/cv4.pdf",
      profilePicture: "https://example.com/instructor4.jpg",
      bio: "Independent mobile development consultant",
      specialization: "Mobile Development",
      experience: 10,
      // No courseProviderId - independent instructor
    },
  });

  // Add independent instructor to instructors array
  instructors.push(independentInstructor);

  // Create Users
  console.log("👥 Creating users...");
  const users = await Promise.all([
    prisma.user.create({
      data: {
        firstName: "Alice",
        lastName: "Smith",
        email: "alice.smith@example.com",
        password: await hashPassword("user123"),
        phoneNumber: "+1234567895",
        age: 22,
        bio: "Computer Science student passionate about web development",
        profilePhoto: "https://example.com/user1.jpg",
      },
    }),
    prisma.user.create({
      data: {
        firstName: "Bob",
        lastName: "Brown",
        email: "bob.brown@example.com",
        password: await hashPassword("user123"),
        phoneNumber: "+1234567896",
        age: 25,
        bio: "Software engineer looking to expand my skills",
        profilePhoto: "https://example.com/user2.jpg",
        isAssistant: true,
      },
    }),
    prisma.user.create({
      data: {
        firstName: "Carol",
        lastName: "Jones",
        email: "carol.jones@example.com",
        password: await hashPassword("user123"),
        phoneNumber: "+1234567897",
        age: 28,
        bio: "Data analyst transitioning to machine learning",
        profilePhoto: "https://example.com/user3.jpg",
      },
    }),
    prisma.user.create({
      data: {
        firstName: "David",
        lastName: "Miller",
        email: "david.miller@example.com",
        password: await hashPassword("user123"),
        phoneNumber: "+1234567898",
        age: 24,
        bio: "Recent graduate interested in full-stack development",
        profilePhoto: "https://example.com/user4.jpg",
      },
    }),
    prisma.user.create({
      data: {
        firstName: "Eva",
        lastName: "Garcia",
        email: "eva.garcia@example.com",
        password: await hashPassword("user123"),
        phoneNumber: "+1234567899",
        age: 26,
        bio: "UX designer learning frontend development",
        profilePhoto: "https://example.com/user5.jpg",
      },
    }),
  ]);

  // Create Education records
  console.log("🎓 Creating education records...");
  await Promise.all([
    prisma.education.create({
      data: {
        userId: users[0].id,
        university: "MIT",
        college: "School of Engineering",
        department: "Computer Science",
        yearOfGraduation: 2023,
        degree: "Bachelor of Science",
        universityId: "MIT001",
        photo: "https://example.com/degree1.jpg",
      },
    }),
    prisma.education.create({
      data: {
        userId: users[1].id,
        university: "Stanford University",
        college: "School of Engineering",
        department: "Software Engineering",
        yearOfGraduation: 2021,
        degree: "Master of Science",
        universityId: "STAN001",
        photo: "https://example.com/degree2.jpg",
      },
    }),
    prisma.education.create({
      data: {
        userId: users[2].id,
        university: "UC Berkeley",
        college: "College of Computing",
        department: "Data Science",
        yearOfGraduation: 2020,
        degree: "Bachelor of Science",
        universityId: "UCB001",
        photo: "https://example.com/degree3.jpg",
      },
    }),
  ]);

  // Create Certificates
  console.log("📜 Creating certificates...");
  await Promise.all([
    prisma.certificate.create({
      data: {
        userId: users[0].id,
        name: "AWS Certified Solutions Architect",
        file: "https://example.com/cert1.pdf",
        issueDate: randomDate(new Date(2023, 0, 1), new Date()),
        institute: "Amazon Web Services",
      },
    }),
    prisma.certificate.create({
      data: {
        userId: users[1].id,
        name: "Google Cloud Professional Developer",
        file: "https://example.com/cert2.pdf",
        issueDate: randomDate(new Date(2023, 0, 1), new Date()),
        institute: "Google Cloud",
      },
    }),
    prisma.certificate.create({
      data: {
        userId: users[2].id,
        name: "Microsoft Azure Fundamentals",
        file: "https://example.com/cert3.pdf",
        issueDate: randomDate(new Date(2023, 0, 1), new Date()),
        institute: "Microsoft",
      },
    }),
  ]);

  // Create Roadmaps
  console.log("🗺️ Creating roadmaps...");
  const roadmaps = await Promise.all([
    prisma.roadmap.create({
      data: {
        title: "Full Stack Web Development",
        description: "Complete roadmap for becoming a full-stack web developer",
        adminId: admins[0].id,
        status: "APPROVED",
        instructors: {
          connect: [{ id: instructors[0].id }, { id: instructors[1].id }],
        },
        students: {
          connect: [
            { id: users[0].id },
            { id: users[1].id },
            { id: users[3].id },
          ],
        },
      },
    }),
    prisma.roadmap.create({
      data: {
        title: "Data Science & Machine Learning",
        description: "Comprehensive path to master data science and ML",
        adminId: admins[1].id,
        status: "APPROVED",
        instructors: {
          connect: [{ id: instructors[2].id }],
        },
        students: {
          connect: [{ id: users[2].id }, { id: users[4].id }],
        },
      },
    }),
    prisma.roadmap.create({
      data: {
        title: "Mobile App Development",
        description: "Learn to build mobile applications for iOS and Android",
        adminId: admins[0].id,
        status: "PENDING",
        instructors: {
          connect: [{ id: instructors[1].id }],
        },
        students: {
          connect: [{ id: users[1].id }, { id: users[4].id }],
        },
      },
    }),
  ]);

  // Create Courses
  console.log("📚 Creating courses...");
  const courses = await Promise.all([
    prisma.course.create({
      data: {
        title: "JavaScript Fundamentals",
        description: "Learn the basics of JavaScript programming",
        instructorId: instructors[0].id,
        courseProviderId: courseProviders[0].id,
        roadmapId: roadmaps[0].id,
        adminId: admins[0].id,
        status: "PUBLISHED",
        enrolledStudents: {
          connect: [{ id: users[0].id }, { id: users[1].id }],
        },
      },
    }),
    prisma.course.create({
      data: {
        title: "React Development",
        description: "Build modern web applications with React",
        instructorId: instructors[1].id,
        courseProviderId: courseProviders[0].id,
        roadmapId: roadmaps[0].id,
        adminId: admins[0].id,
        status: "PUBLISHED",
        enrolledStudents: {
          connect: [{ id: users[0].id }, { id: users[3].id }],
        },
      },
    }),
    prisma.course.create({
      data: {
        title: "Node.js Backend Development",
        description: "Create robust backend applications with Node.js",
        instructorId: instructors[0].id,
        courseProviderId: courseProviders[0].id,
        roadmapId: roadmaps[0].id,
        adminId: admins[0].id,
        status: "APPROVED",
        enrolledStudents: {
          connect: [{ id: users[1].id }, { id: users[3].id }],
        },
      },
    }),
    prisma.course.create({
      data: {
        title: "Python for Data Science",
        description: "Learn Python programming for data analysis",
        instructorId: instructors[2].id,
        courseProviderId: courseProviders[1].id,
        roadmapId: roadmaps[1].id,
        adminId: admins[1].id,
        status: "PUBLISHED",
        enrolledStudents: {
          connect: [{ id: users[2].id }, { id: users[4].id }],
        },
      },
    }),
    prisma.course.create({
      data: {
        title: "Machine Learning Algorithms",
        description: "Understanding and implementing ML algorithms",
        instructorId: instructors[2].id,
        courseProviderId: courseProviders[1].id,
        roadmapId: roadmaps[1].id,
        adminId: admins[1].id,
        status: "PENDING",
        enrolledStudents: {
          connect: [{ id: users[2].id }],
        },
      },
    }),
    prisma.course.create({
      data: {
        title: "iOS Development with Swift",
        description: "Create native iOS applications using Swift",
        instructorId: instructors[3].id, // Independent instructor
        // No courseProviderId - independent course
        roadmapId: roadmaps[2].id,
        adminId: admins[0].id,
        status: "PUBLISHED",
        enrolledStudents: {
          connect: [{ id: users[1].id }, { id: users[4].id }],
        },
      },
    }),
  ]);

  // Create Course Requests
  console.log("📋 Creating course requests...");
  await Promise.all([
    prisma.courseRequest.create({
      data: {
        title: "Advanced React Patterns",
        description: "Deep dive into advanced React concepts and patterns",
        roadmapName: "Full Stack Web Development",
        duration: 8,
        courseOutline:
          "Week 1: Higher-Order Components\nWeek 2: Render Props\nWeek 3: Hooks Patterns\nWeek 4: Context API\nWeek 5: Performance Optimization\nWeek 6: Testing Strategies\nWeek 7: State Management\nWeek 8: Project Implementation",
        location: "Online",
        startDate: new Date(2024, 8, 15), // September 15, 2024
        courseImage: "https://example.com/course1.jpg",
        numberOfSessions: 16,
        sessionDuration: 90,
        instructorId: instructors[1].id,
        status: "PENDING",
      },
    }),
    prisma.courseRequest.create({
      data: {
        title: "Deep Learning with TensorFlow",
        description: "Build neural networks and deep learning models",
        roadmapName: "Data Science & Machine Learning",
        duration: 12,
        courseOutline:
          "Introduction to Deep Learning\nNeural Networks Fundamentals\nConvolutional Neural Networks\nRecurrent Neural Networks\nTransformer Models\nModel Deployment",
        location: "Hybrid",
        startDate: new Date(2024, 9, 1), // October 1, 2024
        courseImage: "https://example.com/course2.jpg",
        numberOfSessions: 24,
        sessionDuration: 120,
        instructorId: instructors[2].id,
        status: "ACCEPTED",
      },
    }),
    prisma.courseRequest.create({
      data: {
        title: "Flutter Mobile Development",
        description: "Create cross-platform mobile applications with Flutter",
        roadmapName: "Mobile App Development",
        duration: 10,
        courseOutline:
          "Flutter Fundamentals\nDart Programming\nWidgets and Layouts\nState Management\nAPI Integration\nApp Store Deployment",
        location: "In-person",
        startDate: new Date(2024, 10, 1), // November 1, 2024
        courseImage: "https://example.com/course3.jpg",
        numberOfSessions: 20,
        sessionDuration: 180,
        instructorId: instructors[3].id, // Independent instructor
        status: "REJECTED",
      },
    }),
  ]);

  // Create Assistant Applications
  console.log("🤝 Creating assistant applications...");
  await Promise.all([
    prisma.assistant.create({
      data: {
        studentId: users[1].id, // Bob (isAssistant: true)
        courseId: courses[0].id, // JavaScript Fundamentals
        status: "APPROVED",
        reviewedBy: { connect: { id: admins[0].id } },
        rating: randomRating(),
      },
    }),
    prisma.assistant.create({
      data: {
        studentId: users[1].id, // Bob
        courseId: courses[1].id, // React Development
        status: "APPROVED",
        reviewedBy: { connect: { id: admins[0].id } },
        rating: randomRating(),
      },
    }),
    prisma.assistant.create({
      data: {
        studentId: users[0].id, // Alice
        courseId: courses[0].id, // JavaScript Fundamentals
        status: "PENDING",
      },
    }),
    prisma.assistant.create({
      data: {
        studentId: users[2].id, // Carol
        courseId: courses[3].id, // Python for Data Science
        status: "REJECTED",
        reviewedBy: { connect: { id: admins[1].id } },
        rating: 0.0,
      },
    }),
  ]);

  console.log("✅ Database seeding completed successfully!");
  console.log("\n📊 Summary:");
  console.log(`- Admins: ${admins.length}`);
  console.log(`- Instructors: ${instructors.length}`);
  console.log(`- Users: ${users.length}`);
  console.log(`- Roadmaps: ${roadmaps.length}`);
  console.log(`- Courses: ${courses.length}`);
  console.log(`- Education records: 3`);
  console.log(`- Certificates: 3`);
  console.log(`- Course requests: 3`);
  console.log(`- Assistant applications: 4`);

  console.log("\n🔐 Default login credentials:");
  console.log("Admin: john.admin@example.com / admin123");
  console.log("Instructor: michael.johnson@example.com / instructor123");
  console.log("User: alice.smith@example.com / user123");
}

main()
  .catch((e) => {
    console.error("❌ Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
