"use client";

import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Clock, Users, BookOpen } from "lucide-react";
import { useEffect, useState } from "react";

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  students: number;
  image: string;
  syllabus: string[];
  prerequisites: string;
  price: string;
}

const CourseDetails = () => {
  const params = useParams();
  const [course, setCourse] = useState<Course | null>(null);
  const [courseNotFound, setCourseNotFound] = useState(false);

  useEffect(() => {
    // List of available courses (you can replace this with real API data)
    const availableCourses: Course[] = [
      {
        id: "1",
        title: "Presentation Skills and Public Speaking",
        description:
          "Learn to deliver engaging and impactful presentations with confidence and professionalism.",
        instructor: "Ahmed Khaled",
        duration: "1 month",
        students: 0,
        image:
          "https://cdn.elearningindustry.com/wp-content/uploads/2020/02/what-to-check-before-an-online-course-purchase.png",
        syllabus: [
          "Structuring your presentation effectively",
          "Developing storytelling techniques for better audience engagement",
          "Overcoming stage fright and building confidence",
          "Using visual aids (PowerPoint, Canva) to support your ideas",
          "Mastering voice modulation and body language",
        ],
        prerequisites: "None",
        price: "1200 EGP",
      },
      {
        id: "2",
        title: "CV Writing and Personal Branding",
        description:
          "Learn how to craft a professional CV and establish a strong personal brand for career success.",
        instructor: "Layla Hassan",
        duration: "2 weeks",
        students: 0,
        image:
          "https://cdn.elearningindustry.com/wp-content/uploads/2020/02/what-to-check-before-an-online-course-purchase.png",
        syllabus: [
          "Writing an ATS-optimized CV for better job opportunities",
          "Building an impressive LinkedIn profile",
          "Developing a personal branding strategy",
          "Tips for professional photography and social media presence",
          "Building a digital portfolio using Canva or Google Sites",
        ],
        prerequisites: "None",
        price: "1000 EGP",
      },
      {
        id: "3",
        title: "Leadership and Teamwork",
        description:
          "Develop the skills needed to lead teams effectively and foster collaboration.",
        instructor: "Omar Youssef",
        duration: "1 month",
        students: 0,
        image:
          "https://cdn.elearningindustry.com/wp-content/uploads/2020/02/what-to-check-before-an-online-course-purchase.png",
        syllabus: [
          "Understanding leadership styles and finding your own",
          "Strategies for motivating team members",
          "Conflict resolution within teams",
          "Leading virtual teams using collaboration tools",
          "Assessing and improving team performance",
        ],
        prerequisites: "None",
        price: "1200 EGP",
      },
      {
        id: "4",
        title: "Communication Skills and Emotional Intelligence",
        description:
          "Master interpersonal communication and learn to manage emotions effectively in professional settings.",
        instructor: "Fatima Ali",
        duration: "1 month",
        students: 0,
        image:
          "https://cdn.elearningindustry.com/wp-content/uploads/2020/02/what-to-check-before-an-online-course-purchase.png",
        syllabus: [
          "Basics of verbal and non-verbal communication",
          "Active listening techniques",
          "Building rapport with colleagues and clients",
          "Understanding and improving emotional intelligence",
          "Practicing feedback and assertiveness in conversations",
        ],
        prerequisites: "None",
        price: "1200 EGP",
      },
      {
        id: "5",
        title: "Problem-Solving and Creative Thinking",
        description:
          "Learn methods for solving problems creatively and thinking outside the box.",
        instructor: "Tamer Nasser",
        duration: "1 month",
        students: 0,
        image:
          "https://cdn.elearningindustry.com/wp-content/uploads/2020/02/what-to-check-before-an-online-course-purchase.png",
        syllabus: [
          "Identifying and analyzing problems effectively",
          "Brainstorming techniques and ideation frameworks",
          "Using tools like mind maps and fishbone diagrams",
          "Case studies and hands-on exercises",
          "Applying creative thinking in real-world situations",
        ],
        prerequisites: "None",
        price: "1200 EGP",
      },
      {
        id: "6",
        title: "Time Management and Decision-Making",
        description:
          "Develop strategies for managing time effectively and making sound decisions.",
        instructor: "Yasmin Kareem",
        duration: "2 weeks",
        students: 0,
        image:
          "https://cdn.elearningindustry.com/wp-content/uploads/2020/02/what-to-check-before-an-online-course-purchase.png",
        syllabus: [
          "Identifying time-wasters and improving productivity",
          "Creating daily and weekly schedules",
          "Decision-making models (pros and cons, SWOT analysis)",
          "Tools for task management and prioritization",
          "Practical applications through exercises and scenarios",
        ],
        prerequisites: "None",
        price: "1000 EGP",
      },
      {
        id: "7",
        title: "Negotiation and Conflict Management",
        description:
          "Build skills for negotiating successfully and managing conflicts professionally.",
        instructor: "Ibrahim Zaid",
        duration: "1 month",
        students: 0,
        image:
          "https://cdn.elearningindustry.com/wp-content/uploads/2020/02/what-to-check-before-an-online-course-purchase.png",
        syllabus: [
          "Understanding the principles of negotiation",
          "Strategies for finding win-win solutions",
          "Dealing with difficult personalities",
          "Conflict resolution frameworks (Thomas-Kilmann model, active listening)",
          "Role-playing exercises for practice",
        ],
        prerequisites: "None",
        price: "1200 EGP",
      },
      {
        id: "8",
        title: "Cybersecurity Fundamentals",
        description:
          "Learn the essentials of securing systems, networks, and data from cyber threats.",
        instructor: "Hana Tariq",
        duration: "2 months",
        students: 0,
        image:
          "https://cdn.elearningindustry.com/wp-content/uploads/2020/02/what-to-check-before-an-online-course-purchase.png",
        syllabus: [
          "Introduction to cybersecurity and its importance",
          "Network security basics and tools like Wireshark",
          "Identifying and mitigating common cyber threats",
          "Cryptography and encryption techniques",
          "Basics of ethical hacking and penetration testing with Kali Linux",
          "Final project - Securing a mock network",
        ],
        prerequisites: "None",
        price: "3000 EGP",
      },
      {
        id: "9",
        title: "Data Science with Python",
        description:
          "Learn how to analyze data and build predictive models using Python.",
        instructor: "Amina Faris",
        duration: "2 months",
        students: 0,
        image:
          "https://cdn.elearningindustry.com/wp-content/uploads/2020/02/what-to-check-before-an-online-course-purchase.png",
        syllabus: [
          "Basics of Python, libraries like Pandas, NumPy",
          "Data visualization with Matplotlib and Seaborn",
          "Introduction to machine learning with Scikit-learn",
          "Building end-to-end data science projects",
        ],
        prerequisites: "None",
        price: "3000 EGP",
      },
      {
        id: "10",
        title: "Full-Stack Web Development",
        description:
          "Build complete web applications using modern frameworks and tools.",
        instructor: "Nasser Adel",
        duration: "2 months",
        students: 0,
        image:
          "https://cdn.elearningindustry.com/wp-content/uploads/2020/02/what-to-check-before-an-online-course-purchase.png",
        syllabus: [
          "Basics of HTML, CSS, and JavaScript",
          "React.js fundamentals and building dynamic UIs",
          "Backend development with Node.js and Express",
          "MongoDB integration and deploying apps to Heroku",
        ],
        prerequisites: "None",
        price: "3000 EGP",
      },
      {
        id: "11",
        title: "Artificial Intelligence and Machine Learning",
        description:
          "Dive into AI and ML, learning algorithms and building intelligent systems.",
        instructor: "Rami Wael",
        duration: "2 months",
        students: 0,
        image:
          "https://cdn.elearningindustry.com/wp-content/uploads/2020/02/what-to-check-before-an-online-course-purchase.png",
        syllabus: [
          "Basics of AI and ML with Python",
          "Supervised and unsupervised learning algorithms",
          "Neural networks with TensorFlow/Keras",
          "Building and deploying AI projects",
        ],
        prerequisites: "None",
        price: "3000 EGP",
      },
      {
        id: "12",
        title: "Embedded Systems with IoT",
        description:
          "Learn how to design and develop IoT-based embedded systems.",
        instructor: "Huda Sami",
        duration: "2 months",
        students: 0,
        image:
          "https://cdn.elearningindustry.com/wp-content/uploads/2020/02/what-to-check-before-an-online-course-purchase.png",
        syllabus: [
          "Introduction to IoT and microcontrollers",
          "Programming Arduino and sensor interfacing",
          "Using Raspberry Pi for IoT applications",
          "Cloud integration with AWS IoT or Firebase",
        ],
        prerequisites: "None",
        price: "3000 EGP",
      },
      {
        id: "13",
        title: "Mobile App Development with Flutter",
        description:
          "Build cross-platform mobile apps with Google's Flutter framework.",
        instructor: "Khaled Majed",
        duration: "2 months",
        students: 0,
        image:
          "https://cdn.elearningindustry.com/wp-content/uploads/2020/02/what-to-check-before-an-online-course-purchase.png",
        syllabus: [
          "Flutter and Dart basics",
          "Designing responsive UIs",
          "Working with REST APIs and Firebase integration",
          "Deploying mobile apps to stores",
        ],
        prerequisites: "None",
        price: "3000 EGP",
      },
      {
        id: "14",
        title: "Software Testing and Quality Assurance",
        description:
          "Master the techniques and tools for testing software and ensuring quality.",
        instructor: "Mariam Tamer",
        duration: "1 month",
        students: 0,
        image:
          "https://cdn.elearningindustry.com/wp-content/uploads/2020/02/what-to-check-before-an-online-course-purchase.png",
        syllabus: [
          "Introduction to software testing and QA principles",
          "Writing test cases and performing manual testing",
          "Test automation with Selenium",
          "Performance testing with Jmeter",
        ],
        prerequisites: "None",
        price: "2000 EGP",
      },
      {
        id: "15",
        title: "Digital Marketing Essentials",
        description:
          "Learn how to build and execute digital marketing strategies that drive business growth.",
        instructor: "Ahmed Bassel",
        duration: "1.5 months",
        students: 0,
        image:
          "https://cdn.elearningindustry.com/wp-content/uploads/2020/02/what-to-check-before-an-online-course-purchase.png",
        syllabus: [
          "Introduction to digital marketing and SEO basics",
          "Social media marketing and Google Ads campaign creation",
          "Email marketing strategies and analytics tracking",
        ],
        prerequisites: "None",
        price: "2500 EGP",
      },
      {
        id: "16",
        title: "Sales Strategy and CRM Management",
        description:
          "Learn how to create sales strategies and manage customer relationships effectively.",
        instructor: "Salma Saeed",
        duration: "1 month",
        students: 0,
        image:
          "https://cdn.elearningindustry.com/wp-content/uploads/2020/02/what-to-check-before-an-online-course-purchase.png",
        syllabus: [
          "Fundamentals of sales strategy and pipeline management",
          "Sales negotiation techniques and client relationship building",
          "CRM tools like Salesforce for sales tracking and lead management",
          "Evaluating and improving sales performance",
        ],
        prerequisites: "None",
        price: "2000 EGP",
      },
      {
        id: "17",
        title: "Content Marketing and Copywriting",
        description:
          "Create compelling content that drives traffic and engages audiences.",
        instructor: "Anas Hadi",
        duration: "1.5 months",
        students: 0,
        image:
          "https://cdn.elearningindustry.com/wp-content/uploads/2020/02/what-to-check-before-an-online-course-purchase.png",
        syllabus: [
          "Basics of content marketing and storytelling",
          "Writing optimized SEO content and advertising copy",
          "Tools like Canva, Grammarly, and Ahrefs for content creation and performance tracking",
        ],
        prerequisites: "None",
        price: "2500 EGP",
      },
      {
        id: "18",
        title: "Social Media Marketing and Influencer Strategies",
        description:
          "Master social media platforms and leverage influencer marketing to boost brands.",
        instructor: "Rania Omar",
        duration: "1.5 months",
        students: 0,
        image:
          "https://cdn.elearningindustry.com/wp-content/uploads/2020/02/what-to-check-before-an-online-course-purchase.png",
        syllabus: [
          "Understanding different social media platforms and algorithms",
          "Influencer outreach and collaboration strategies",
          "Tools for scheduling, analytics, and content creation",
        ],
        prerequisites: "None",
        price: "2500 EGP",
      },
      {
        id: "19",
        title: "Business Development Essentials",
        description:
          "Learn the fundamental skills to identify growth opportunities, build strategies, and expand businesses.",
        instructor: "Zainab Faisal",
        duration: "2 months",
        students: 0,
        image:
          "https://cdn.elearningindustry.com/wp-content/uploads/2020/02/what-to-check-before-an-online-course-purchase.png",
        syllabus: [
          "Introduction to business development and market research",
          "Understanding customer needs and value propositions",
          "Building partnerships and strategic alliances",
          "Revenue generation strategies and KPIs",
          "Case studies and practical applications",
        ],
        prerequisites: "None",
        price: "3000 EGP",
      },
      {
        id: "20",
        title: "Accounting for Beginners",
        description:
          "Understand the basics of accounting principles, financial statements, and bookkeeping techniques.",
        instructor: "Sara Amr",
        duration: "1 month",
        students: 0,
        image:
          "https://cdn.elearningindustry.com/wp-content/uploads/2020/02/what-to-check-before-an-online-course-purchase.png",
        syllabus: [
          "Introduction to accounting principles and terminologies",
          "Understanding the balance sheet and income statement",
          "Basics of bookkeeping and journal entries",
          "Recording transactions and reconciling accounts",
          "Using accounting software for practice",
        ],
        prerequisites: "None",
        price: "2000 EGP",
      },
      {
        id: "21",
        title: "Effective Business Communication",
        description:
          "Enhance your professional communication skills for meetings, presentations, and negotiations.",
        instructor: "Reem Ibrahim",
        duration: "1 month",
        students: 0,
        image:
          "https://cdn.elearningindustry.com/wp-content/uploads/2020/02/what-to-check-before-an-online-course-purchase.png",
        syllabus: [
          "Basics of professional communication",
          "Effective email and report writing",
          "Interpersonal communication in teams",
          "Presentation skills for business settings",
          "Negotiation techniques and conflict resolution",
        ],
        prerequisites: "None",
        price: "2000 EGP",
      },
      {
        id: "22",
        title: "Digital Marketing for Businesses",
        description:
          "Master the skills needed to market your business effectively online and grow your audience.",
        instructor: "Youssef Adel",
        duration: "2 months",
        students: 0,
        image:
          "https://cdn.elearningindustry.com/wp-content/uploads/2020/02/what-to-check-before-an-online-course-purchase.png",
        syllabus: [
          "Introduction to digital marketing and SEO",
          "Social media marketing and content creation",
          "Email marketing and lead generation",
          "Analyzing and optimizing marketing campaigns",
          "Tools and platforms for effective marketing",
        ],
        prerequisites: "None",
        price: "3000 EGP",
      },
      {
        id: "23",
        title: "Entrepreneurship and Business Strategy",
        description:
          "Learn how to launch a startup and build sustainable business strategies.",
        instructor: "Noor Khaled",
        duration: "2 months",
        students: 0,
        image:
          "https://cdn.elearningindustry.com/wp-content/uploads/2020/02/what-to-check-before-an-online-course-purchase.png",
        syllabus: [
          "Introduction to entrepreneurship and startup ecosystems",
          "Developing a business model and value proposition",
          "Market analysis and competitor research",
          "Building a team and securing funding",
          "Scaling and sustaining a business",
        ],
        prerequisites: "None",
        price: "3000 EGP",
      },
      {
        id: "24",
        title: "Graphic Design Fundamentals",
        description:
          "Learn the basics of graphic design, including typography, color theory, and design software.",
        instructor: "Hadi Layla",
        duration: "2 months",
        students: 0,
        image:
          "https://cdn.elearningindustry.com/wp-content/uploads/2020/02/what-to-check-before-an-online-course-purchase.png",
        syllabus: [
          "Introduction to graphic design and design principles",
          "Typography basics and font selection",
          "Color theory and application",
          "Using Adobe Photoshop and Illustrator",
          "Creating visual content for social media",
        ],
        prerequisites: "None",
        price: "3000 EGP",
      },
      {
        id: "25",
        title: "Motion Graphics Essentials",
        description:
          "Explore the art of creating motion graphics using industry-standard tools and techniques.",
        instructor: "Amal Anas",
        duration: "2 months",
        students: 0,
        image:
          "https://cdn.elearningindustry.com/wp-content/uploads/2020/02/what-to-check-before-an-online-course-purchase.png",
        syllabus: [
          "Introduction to motion graphics and animation",
          "Working with Adobe After Effects",
          "Keyframe animation techniques",
          "Creating title sequences and transitions",
          "Exporting and optimizing motion graphics",
        ],
        prerequisites: "None",
        price: "3000 EGP",
      },
      {
        id: "26",
        title: "Photography Basics",
        description:
          "Master the fundamentals of photography, including camera settings, composition, and editing.",
        instructor: "Malak Hassan",
        duration: "1 month",
        students: 0,
        image:
          "https://cdn.elearningindustry.com/wp-content/uploads/2020/02/what-to-check-before-an-online-course-purchase.png",
        syllabus: [
          "Understanding camera settings: ISO, aperture, and shutter speed",
          "Composition and framing techniques",
          "Lighting and exposure control",
          "Post-processing using Adobe Lightroom",
          "Practical photography projects",
        ],
        prerequisites: "None",
        price: "2000 EGP",
      },
      {
        id: "27",
        title: "Videography and Video Editing",
        description:
          "Learn how to shoot and edit professional-quality videos for different purposes.",
        instructor: "Wael Tamer",
        duration: "2 months",
        students: 0,
        image:
          "https://cdn.elearningindustry.com/wp-content/uploads/2020/02/what-to-check-before-an-online-course-purchase.png",
        syllabus: [
          "Introduction to videography and equipment",
          "Storyboarding and planning a shoot",
          "Shooting techniques and angles",
          "Video editing with Adobe Premiere Pro",
          "Adding effects and transitions to videos",
        ],
        prerequisites: "None",
        price: "3000 EGP",
      },
      {
        id: "28",
        title: "Content Creation for Social Media",
        description:
          "Develop skills to create engaging and professional content for social media platforms.",
        instructor: "Aisha Nasser",
        duration: "1 month",
        students: 0,
        image:
          "https://cdn.elearningindustry.com/wp-content/uploads/2020/02/what-to-check-before-an-online-course-purchase.png",
        syllabus: [
          "Understanding social media platforms and audiences",
          "Creating visually appealing posts and videos",
          "Using Canva and mobile editing apps",
          "Writing compelling captions and headlines",
          "Analyzing engagement and optimizing content",
        ],
        prerequisites: "None",
        price: "2000 EGP",
      },
      {
        id: "29",
        title: "Startup Fundamentals",
        description:
          "Learn the essential steps to launch and manage a successful startup.",
        instructor: "Jafar Ali",
        duration: "2 months",
        students: 0,
        image:
          "https://cdn.elearningindustry.com/wp-content/uploads/2020/02/what-to-check-before-an-online-course-purchase.png",
        syllabus: [
          "Introduction to entrepreneurship and startup culture",
          "Market research and idea validation",
          "Building a business model canvas",
          "Creating a minimum viable product (MVP)",
          "Startup funding and pitching to investors",
        ],
        prerequisites: "None",
        price: "3000 EGP",
      },
      {
        id: "30",
        title: "Business Model Innovation",
        description:
          "Discover how to design innovative and sustainable business models.",
        instructor: "Lina Zaid",
        duration: "1 month",
        students: 0,
        image:
          "https://cdn.elearningindustry.com/wp-content/uploads/2020/02/what-to-check-before-an-online-course-purchase.png",
        syllabus: [
          "Understanding business model frameworks",
          "Customer segmentation and value proposition design",
          "Revenue streams and cost structure",
          "Case studies of successful business models",
          "Creating and testing your business model",
        ],
        prerequisites: "None",
        price: "2000 EGP",
      },
      {
        id: "31",
        title: "Leadership for Entrepreneurs",
        description:
          "Develop leadership skills to inspire and manage your team effectively.",
        instructor: "Iman Kareem",
        duration: "1 month",
        students: 0,
        image:
          "https://cdn.elearningindustry.com/wp-content/uploads/2020/02/what-to-check-before-an-online-course-purchase.png",
        syllabus: [
          "Defining leadership in the entrepreneurial context",
          "Building and motivating a team",
          "Effective communication and decision-making",
          "Handling conflicts and challenges",
          "Creating a vision and setting goals",
        ],
        prerequisites: "None",
        price: "2000 EGP",
      },
      {
        id: "32",
        title: "Financial Management for Startups",
        description:
          "Master the basics of financial planning and management for startups.",
        instructor: "Bassel Tariq",
        duration: "2 months",
        students: 0,
        image:
          "https://cdn.elearningindustry.com/wp-content/uploads/2020/02/what-to-check-before-an-online-course-purchase.png",
        syllabus: [
          "Understanding startup finances and accounting basics",
          "Budgeting and forecasting",
          "Managing cash flow effectively",
          "Financial metrics and KPIs for startups",
          "Attracting investors and managing funding",
        ],
        prerequisites: "None",
        price: "3000 EGP",
      },
      {
        id: "33",
        title: "Marketing for Entrepreneurs",
        description:
          "Learn how to create effective marketing strategies for your startup.",
        instructor: "Hana Sami",
        duration: "1 month",
        students: 0,
        image:
          "https://cdn.elearningindustry.com/wp-content/uploads/2020/02/what-to-check-before-an-online-course-purchase.png",
        syllabus: [
          "Basics of marketing and branding",
          "Creating a marketing plan",
          "Digital marketing channels and tools",
          "Social media and content marketing strategies",
          "Measuring and optimizing marketing efforts",
        ],
        prerequisites: "None",
        price: "2000 EGP",
      },
      {
        id: "34",
        title: "Data Science and Analytics",
        description:
          "Learn to analyze, visualize, and interpret data for decision-making using Python.",
        instructor: "Samira Ahmed",
        duration: "2 months",
        students: 0,
        image:
          "https://cdn.elearningindustry.com/wp-content/uploads/2020/02/what-to-check-before-an-online-course-purchase.png",
        syllabus: [
          "Basics of Python and data libraries (Pandas, NumPy)",
          "Data visualization techniques",
          "Introduction to machine learning with Scikit-learn",
          "Final projects and data storytelling",
        ],
        prerequisites: "None",
        price: "3000 EGP",
      },
      {
        id: "35",
        title: "Cloud Computing with AWS",
        description:
          "Gain expertise in cloud computing and master AWS services for deployment and scaling.",
        instructor: "Joud Omar",
        duration: "2 months",
        students: 0,
        image:
          "https://cdn.elearningindustry.com/wp-content/uploads/2020/02/what-to-check-before-an-online-course-purchase.png",
        syllabus: [
          "Introduction to cloud computing and AWS",
          "Managing AWS services (EC2, S3, RDS)",
          "Deployment and scaling strategies",
          "Hands-on project deployment",
        ],
        prerequisites: "None",
        price: "3000 EGP",
      },
      {
        id: "36",
        title: "Blockchain Development",
        description:
          "Learn the fundamentals of blockchain and how to develop decentralized applications (dApps).",
        instructor: "Faris Khaled",
        duration: "2 months",
        students: 0,
        image:
          "https://cdn.elearningindustry.com/wp-content/uploads/2020/02/what-to-check-before-an-online-course-purchase.png",
        syllabus: [
          "Blockchain fundamentals and Ethereum basics",
          "Writing smart contracts with Solidity",
          "Building and deploying dApps",
          "Exploring DeFi and final projects",
        ],
        prerequisites: "None",
        price: "3000 EGP",
      },
      {
        id: "37",
        title: "Robotics and Automation",
        description:
          "Design and build robots while learning about automation technologies.",
        instructor: "Khadija Adel",
        duration: "2 months",
        students: 0,
        image:
          "https://cdn.elearningindustry.com/wp-content/uploads/2020/02/what-to-check-before-an-online-course-purchase.png",
        syllabus: [
          "Robotics fundamentals and mechanical design",
          "Programming robots using Arduino",
          "Sensor integration and automation",
          "Final robot building and testing",
        ],
        prerequisites: "None",
        price: "3000 EGP",
      },
      {
        id: "38",
        title: "DevOps and CI/CD Pipelines",
        description:
          "Learn DevOps practices and tools to streamline software delivery and operations.",
        instructor: "Tamer Mariam",
        duration: "2 months",
        students: 0,
        image:
          "https://cdn.elearningindustry.com/wp-content/uploads/2020/02/what-to-check-before-an-online-course-purchase.png",
        syllabus: [
          "Introduction to DevOps and CI/CD basics",
          "Working with Docker and containers",
          "Kubernetes and orchestration",
          "Monitoring and maintaining environments",
        ],
        prerequisites: "None",
        price: "3000 EGP",
      },
      {
        id: "39",
        title: "Cybersecurity Advanced Techniques",
        description:
          "Advance your knowledge in cybersecurity by mastering penetration testing and threat analysis.",
        instructor: "Suha Anas",
        duration: "2 months",
        students: 0,
        image:
          "https://cdn.elearningindustry.com/wp-content/uploads/2020/02/what-to-check-before-an-online-course-purchase.png",
        syllabus: [
          "Advanced penetration testing methods",
          "Network and application security analysis",
          "Malware analysis techniques",
          "Hands-on security case studies",
        ],
        prerequisites: "None",
        price: "3000 EGP",
      },
      {
        id: "40",
        title: "AI and Machine Learning",
        description:
          "Master AI concepts and build machine learning models for real-world applications.",
        instructor: "Leen Nasser",
        duration: "2 months",
        students: 0,
        image:
          "https://cdn.elearningindustry.com/wp-content/uploads/2020/02/what-to-check-before-an-online-course-purchase.png",
        syllabus: [
          "Basics of AI and ML with Python",
          "Supervised and unsupervised learning algorithms",
          "Neural networks with TensorFlow/Keras",
          "Building and deploying AI projects",
        ],
        prerequisites: "None",
        price: "3000 EGP",
      },
      {
        id: "41",
        title: "Mobile App Development with Flutter",
        description:
          "Develop cross-platform mobile apps using Flutter and Dart.",
        instructor: "Bushra Hadi",
        duration: "2 months",
        students: 0,
        image:
          "https://cdn.elearningindustry.com/wp-content/uploads/2020/02/what-to-check-before-an-online-course-purchase.png",
        syllabus: [
          "Flutter and Dart basics",
          "Designing responsive UIs",
          "Working with REST APIs and Firebase integration",
          "Deploying mobile apps to stores",
        ],
        prerequisites: "None",
        price: "3000 EGP",
      },
      {
        id: "42",
        title: "IoT and Smart Devices",
        description:
          "Explore the world of IoT by designing smart devices and integrating them with the cloud.",
        instructor: "Amina Wael",
        duration: "2 months",
        students: 0,
        image:
          "https://cdn.elearningindustry.com/wp-content/uploads/2020/02/what-to-check-before-an-online-course-purchase.png",
        syllabus: [
          "Introduction to IoT and microcontrollers",
          "Programming Arduino and sensor interfacing",
          "Using Raspberry Pi for IoT applications",
          "Cloud integration with AWS IoT or Firebase",
        ],
        prerequisites: "None",
        price: "3000 EGP",
      },
      {
        id: "43",
        title: "Full-Stack Web Development",
        description:
          "Learn to build responsive web applications with modern technologies.",
        instructor: "Reem Bassel",
        duration: "2 months",
        students: 0,
        image:
          "https://cdn.elearningindustry.com/wp-content/uploads/2020/02/what-to-check-before-an-online-course-purchase.png",
        syllabus: [
          "Basics of HTML, CSS, and JavaScript",
          "React.js fundamentals and building dynamic UIs",
          "Backend development with Node.js and Express",
          "MongoDB integration and deploying apps to Heroku",
        ],
        prerequisites: "None",
        price: "3000 EGP",
      },
      {
        id: "44",
        title: "Data Visualization with Tableau",
        description:
          "Learn to visualize and communicate data insights effectively using Tableau.",
        instructor: "Ali Salem",
        duration: "1.5 months",
        students: 0,
        image:
          "https://cdn.elearningindustry.com/wp-content/uploads/2020/02/what-to-check-before-an-online-course-purchase.png",
        syllabus: [
          "Introduction to Tableau and its interface",
          "Creating interactive dashboards",
          "Advanced visualization techniques",
          "Final project: Building a comprehensive data dashboard",
        ],
        prerequisites: "None",
        price: "2500 EGP",
      },
      {
        id: "45",
        title: "Cybersecurity Fundamentals",
        description:
          "Understand the basics of cybersecurity to protect systems and data.",
        instructor: "Yasmin Huda",
        duration: "2 months",
        students: 0,
        image:
          "https://cdn.elearningindustry.com/wp-content/uploads/2020/02/what-to-check-before-an-online-course-purchase.png",
        syllabus: [
          "Introduction to cybersecurity and its importance",
          "Network security basics and tools like Wireshark",
          "Cryptography and encryption techniques",
          "Basics of ethical hacking with Kali Linux",
        ],
        prerequisites: "None",
        price: "3000 EGP",
      },
      {
        id: "46",
        title: "Software Testing and QA",
        description:
          "Learn software testing principles and ensure the quality of applications.",
        instructor: "Zaid Tamer",
        duration: "1 month",
        students: 0,
        image:
          "https://cdn.elearningindustry.com/wp-content/uploads/2020/02/what-to-check-before-an-online-course-purchase.png",
        syllabus: [
          "Fundamentals of software testing and QA principles",
          "Writing test cases and performing manual testing",
          "Test automation with Selenium",
          "Performance testing with JMeter",
        ],
        prerequisites: "None",
        price: "2000 EGP",
      },
      {
        id: "47",
        title: "Digital Marketing Strategies",
        description:
          "Master digital marketing tools and techniques to grow online presence.",
        instructor: "Kareem Rami",
        duration: "1.5 months",
        students: 0,
        image:
          "https://cdn.elearningindustry.com/wp-content/uploads/2020/02/what-to-check-before-an-online-course-purchase.png",
        syllabus: [
          "Introduction to digital marketing and SEO basics",
          "Social media marketing and Google Ads campaign creation",
          "Email marketing strategies and analytics tracking",
        ],
        prerequisites: "None",
        price: "2500 EGP",
      },
      {
        id: "48",
        title: "UI/UX Design Principles",
        description:
          "Learn to design intuitive and user-friendly digital interfaces.",
        instructor: "Noor Ahmed",
        duration: "2 months",
        students: 0,
        image:
          "https://cdn.elearningindustry.com/wp-content/uploads/2020/02/what-to-check-before-an-online-course-purchase.png",
        syllabus: [
          "Basics of UI/UX design and user psychology",
          "Wireframing and prototyping using Figma",
          "Testing and iterating on user interfaces",
          "Designing complete web and mobile experiences",
        ],
        prerequisites: "None",
        price: "3000 EGP",
      },
      {
        id: "49",
        title: "Big Data Analytics",
        description:
          "Understand big data tools and techniques to process and analyze large datasets.",
        instructor: "Omar Hana",
        duration: "2 months",
        students: 0,
        image:
          "https://cdn.elearningindustry.com/wp-content/uploads/2020/02/what-to-check-before-an-online-course-purchase.png",
        syllabus: [
          "Introduction to big data and Hadoop ecosystem",
          "Processing data with Apache Spark",
          "Data storage and retrieval with HDFS",
          "Hands-on projects in big data analytics",
        ],
        prerequisites: "None",
        price: "3000 EGP",
      },
      {
        id: "50",
        title: "Augmented and Virtual Reality",
        description: "Learn to create immersive AR and VR experiences.",
        instructor: "Salma Faris",
        duration: "2 months",
        students: 0,
        image:
          "https://cdn.elearningindustry.com/wp-content/uploads/2020/02/what-to-check-before-an-online-course-purchase.png",
        syllabus: [
          "Basics of AR and VR technologies",
          "Designing AR experiences with Unity",
          "Building VR environments for gaming and simulations",
          "Publishing AR/VR applications",
        ],
        prerequisites: "None",
        price: "3000 EGP",
      },
      {
        id: "51",
        title: "Networking Fundamentals",
        description: "Understand networking concepts and technologies.",
        instructor: "Sara Iman",
        duration: "1.5 months",
        students: 0,
        image:
          "https://cdn.elearningindustry.com/wp-content/uploads/2020/02/what-to-check-before-an-online-course-purchase.png",
        syllabus: [
          "Basics of computer networks and protocols",
          "Configuring routers and switches",
          "Understanding network security principles",
          "Hands-on labs with Cisco Packet Tracer",
        ],
        prerequisites: "None",
        price: "2500 EGP",
      },
    ];

    // Check if the course ID exists in the available courses list
    const courseFound = availableCourses.find(
      (course) => course.id === params.id
    );

    if (courseFound) {
      setCourse(courseFound);
      setCourseNotFound(false);
    } else {
      setCourseNotFound(true);
    }
  }, [params.id]);

  if (courseNotFound) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-gray-500">Course not found</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-gray-500">Loading course details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 max-w-5xl mx-auto pb-10">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Course Details Section */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-[400px] object-cover rounded-lg shadow-lg mb-8"
            />

            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {course.title}
            </h1>
            <p className="text-lg text-gray-600 mb-8">{course.description}</p>

            <div className="flex items-center gap-8 mb-8">
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-[#ff005c] mr-2" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center">
                <Users className="h-5 w-5 text-[#ff005c] mr-2" />
                <span>{course.students} students</span>
              </div>
              <div className="flex items-center">
                <BookOpen className="h-5 w-5 text-[#ff005c] mr-2" />
                <span>{course.instructor}</span>
              </div>
            </div>

            {/* Course Syllabus */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Course Syllabus</h2>
              <ul className="space-y-3">
                {course.syllabus.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-[#ff005c]/10 text-[#ff005c] text-sm mr-3">
                      {index + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Prerequisites */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Prerequisites</h2>
              <p className="text-gray-600">{course.prerequisites}</p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-lg sticky top-8">
              <div className="text-3xl font-bold text-primary mb-6">
                {course.price}
              </div>
              <Button className="w-full mb-4">Enroll Now</Button>
              <p className="text-sm text-gray-500 text-center">
                14-day money-back guarantee
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
