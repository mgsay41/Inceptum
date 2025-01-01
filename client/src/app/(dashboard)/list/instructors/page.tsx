import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role, studentsData } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Eye, Trash2, FileUser } from "lucide-react";
import { FaPlus, FaSortAmountDown } from "react-icons/fa";
import { RiFilter2Line } from "react-icons/ri";
import FormModal from "@/components/FormModal";
import { Course, Instructor, Prisma, User } from "@prisma/client";
import prisma from "@/lib/prisma";

type InstructorList = Instructor & {
  courses: Course[];
};

const columns = [
  {
    header: "Info",
    accessor: "info",
  },
  {
    header: "Instructor ID",
    accessor: "InstructorID",
  },
  {
    header: "Courses",
    accessor: "courses",
  },
  {
    header: "Rating",
    accessor: "rating",
  },
  {
    header: "Action",
    accessor: "action",
  },
];

const renderRow = (items: InstructorList) => {
  return (
    <tr
      key={items.id}
      className="text-left text-xs text-gray-500 font-semibold border-b border-gray-200 even:bg-slate-50 hover:bg-slate-100 "
    >
      <td className="flex items-center gap-2 p-4">
        <Image
          src={items.profilePicture || "/avatar.png"}
          alt="user"
          width={40}
          height={40}
          className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h3 className="font-bold text-base text-black/80">
            {items.firstName} {items.lastName}
          </h3>
          <h4 className="text-xs text-gray-500">{items?.email}</h4>
        </div>
      </td>
      <td className="hidden md:table-cell text-center">{items.instructorId}</td>
      <td className="hidden md:table-cell text-center">
        {items.courses.length > 2
          ? items.courses
              .slice(0, 2)
              .map((course) => course.title)
              .join(", ") + ",..."
          : items.courses.map((course) => course.title).join(", ")}
      </td>

      <td className="hidden md:table-cell text-center">{items.rating}</td>
      <td className="flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Link href={`/list/instructors/${items.id}`}>
            <FormModal table="instructor" type="view" />
          </Link>
          {role === "admin" && <FormModal table="instructor" type="delete" />}
          <FormModal table="instructor" type="CV" />
        </div>
      </td>
    </tr>
  );
};

const InstructorListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page, ...queryParams } = searchParams;

  const p = page ? parseInt(page) : 1;

  const query: Prisma.InstructorWhereInput = {};

  // if (queryParams) {
  //   for(const [key,value] of Object.entries(queryParams)){
  //     if(value !== undefined){
  //       switch(key){
  //         case "InstructorID":
  //           query.courses = {
  //             some: {
  //               courseId: parseInt(value);
  //             }
  //           }
  //       }
  //   }

  // }}

  const [InstructorsData, count] = await prisma.$transaction([
    prisma.instructor.findMany({
      include: {
        courses: true,
      },
      take: 10,
      skip: (p - 1) * 10,
    }),
    prisma.instructor.count(),
  ]);

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP SECTION */}

      <div className="flex items-center justify-between">
        <h1 className="text-lg hidden md:block font-semibold">
          {" "}
          All Instructors
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <FormModal table="assistants" type="filter" />
            <FormModal table="assistants" type="sort" />
          </div>
        </div>
      </div>

      {/* LIST SECTION */}

      <div className="">
        <Table columns={columns} renderRow={renderRow} data={InstructorsData} />
      </div>

      {/* PAGINATION SECTION */}
      <Pagination page={p} count={count} />
    </div>
  );
};

export default InstructorListPage;
