import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role, studentsData } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Eye, Trash2, FileUser } from "lucide-react";
import { FaPlus, FaSortAmountDown } from "react-icons/fa";
import FormModal from "@/components/FormModal";
import prisma from "@/lib/prisma";
import { Assistant, Course, User } from "@prisma/client";

type AssistantsList = Assistant & {
  course: Course; // Change "Course" to "course"
} & { student: User };

const columns = [
  {
    header: "Info",
    accessor: "info",
  },
  {
    header: "Assistant ID",
    accessor: "assistantID",
  },
  {
    header: "Course",
    accessor: "course",
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
const renderRow = (items: AssistantsList) => {
  return (
    <tr
      key={items.id}
      className="text-left text-xs text-gray-500 font-semibold border-b border-gray-200 even:bg-slate-50 hover:bg-slate-100 "
    >
      <td className="flex items-center gap-2 p-4">
        <Image
          src={items.student.profilePhoto || "/avatar.png"}
          alt="user"
          width={40}
          height={40}
          className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold">
            {items.student.firstName} {items.student.lastName}
          </h3>
          <h4 className="text-xs text-gray-500">{items.student?.email}</h4>
        </div>
      </td>
      <td className="hidden md:table-cell text-center">
        {items.student.inceptumId}
      </td>
      <td className="hidden md:table-cell text-center">
        {items.course?.title || "No Course"}
      </td>
      <td className="hidden md:table-cell text-center">{items.rating}</td>
      <td className="flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Link href={`/list/assistants/${items.id}`}>
            <FormModal table="assistants" type="view" />
          </Link>
          {role === "admin" && <FormModal table="assistants" type="delete" />}
          <FormModal table="assistants" type="CV" />
        </div>
      </td>
    </tr>
  );
};
const AssistantListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page, ...queryParams } = searchParams;

  const p = page ? parseInt(page) : 1;

  const [AssistantData, count] = await prisma.$transaction([
    prisma.assistant.findMany({
      include: {
        student: true,
        course: true,
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
          All Assistants
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
        <Table columns={columns} renderRow={renderRow} data={AssistantData} />
      </div>

      {/* PAGINATION SECTION */}
      <Pagination page={p} count={count} />
    </div>
  );
};

export default AssistantListPage;
