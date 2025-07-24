import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;

  const course = await prisma.course.findFirst({
    where: { slug },
    include: {
      courseProvider: { select: { companyName: true, logo: true } },
      instructor: {
        select: { firstName: true, lastName: true, profilePicture: true },
      },
    },
  });

  if (!course) {
    return NextResponse.json({ error: "Course not found" }, { status: 404 });
  }

  return NextResponse.json(course);
}
