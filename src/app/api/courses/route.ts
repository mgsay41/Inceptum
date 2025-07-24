import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const courses = await prisma.course.findMany({
    include: {
      courseProvider: {
        select: { companyName: true, logo: true },
      },
      instructor: {
        select: { firstName: true, lastName: true, profilePicture: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(courses);
}
