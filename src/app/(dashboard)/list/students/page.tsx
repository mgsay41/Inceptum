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
import prisma from "@/lib/prisma";
import { Course, User } from "@prisma/client";

type StudentsList = User & {
  enrolledCourses: Course[];
};

const columns = [
  {
    header: "Info",
    accessor: "info",
  },
  {
    header: "Inceptum ID",
    accessor: "inceptumID",
  },
  {
    header: "Is Assistant?",
    accessor: "assistant",
  },
  {
    header: "Courses",
    accessor: "courses",
  },
  {
    header: "Action",
    accessor: "action",
  },
];

const renderRow = (items: StudentsList) => {
  return (
    <tr
      key={items.id}
      className="text-left text-xs text-gray-500 font-semibold border-b border-gray-200 even:bg-slate-50 hover:bg-slate-100 "
    >
      <td className="flex items-center gap-2 p-4">
        <Image
          src={items.profilePhoto || "/avatar.png"}
          alt="user"
          width={40}
          height={40}
          className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold">
            {items.firstName} {items.lastName}
          </h3>
          <h4 className="text-xs text-gray-500">{items?.email}</h4>
        </div>
      </td>
      <td className="hidden md:table-cell text-center">{items.inceptumId}</td>
      <td className="hidden md:table-cell text-center">
        {items.isAssistant === true ? "Assistant" : "Not Assistant"}
      </td>{" "}
      {/*cv*/}
      <td className="hidden md:table-cell text-center">
        {items.enrolledCourses.length > 2
          ? items.enrolledCourses
              .slice(0, 2)
              .map((course) => course.title)
              .join(", ") + ",..."
          : items.enrolledCourses.map((course) => course.title).join(", ")}
      </td>
      <td className="flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Link href={`/list/students/${items.id}`}>
            <FormModal table="assistants" type="view" />
          </Link>
          {role === "admin" && (
            <FormModal table="assistants" type="delete" id={items.id} />
          )}
          <FormModal table="assistants" type="CV" />
        </div>
      </td>
    </tr>
  );
};

const StudentListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page, ...queryParams } = searchParams;

  const p = page ? parseInt(page) : 1;

  const [StudentsData, count] = await prisma.$transaction([
    prisma.user.findMany({
      include: {
        enrolledCourses: true,
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
        <h1 className="text-lg hidden md:block font-semibold"> All Students</h1>
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
        <Table columns={columns} renderRow={renderRow} data={StudentsData} />
      </div>

      {/* PAGINATION SECTION */}
      <Pagination page={p} count={count} />
    </div>
  );
};

export default StudentListPage;
