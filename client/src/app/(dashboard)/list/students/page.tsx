import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role, studentsData } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Eye, Trash2, FileUser } from "lucide-react";

type Student = {
  id: number;
  studentID: string;
  name: string;
  photo: string;
  phone: string;
  email: string;
  grade: number;
};

const columns = [
  {
    header: "Info",
    accessor: "info",
  },
  {
    header: "Student ID",
    accessor: "studentID",
  },
  {
    header: "Phone",
    accessor: "phone",
  },
  {
    header: "Email",
    accessor: "email",
  },
  {
    header: "Grade",
    accessor: "grade",
  },
  {
    header: "Action",
    accessor: "action",
  },
];

const StudentListPage = () => {
  const renderRow = (items: Student) => {
    return (
      <tr
        key={items.id}
        className="text-left text-xs text-gray-500 font-semibold border-b border-gray-200 even:bg-slate-50 hover:bg-slate-100 "
      >
        <td className="flex items-center gap-2 p-4">
          <Image
            src={items.photo}
            alt="user"
            width={40}
            height={40}
            className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <h3 className="font-semibold">{items.name}</h3>
            <h4 className="text-xs text-gray-500">{items?.email}</h4>
          </div>
        </td>
        <td className="hidden md:table-cell">{items.studentID}</td>
        <td className="hidden md:table-cell">{items.phone}</td> {/*cv*/}
        <td className="hidden md:table-cell">{items.email}</td> {/*cv*/}
        <td className="hidden md:table-cell">{items.grade}</td>
        <td>
          <div className="flex items-center gap-2">
            <Link href={`/list/teachers/${items.id}`}>
              <button className="w-7 h-7 flex items-center justify-center rounded-full ">
                <Eye width={16} height={16} />
              </button>
            </Link>
            {role === "admin" && (
              <button className="w-7 h-7 flex items-center justify-center rounded-full ">
                <Trash2 width={16} height={16} />
              </button>
            )}
            <button className="w-7 h-7 flex items-center justify-center rounded-full ">
              <FileUser width={16} height={16} />
            </button>
          </div>
        </td>
      </tr>
    );
  };

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP SECTION */}

      <div className="flex items-center justify-between">
        <h1 className="text-lg hidden md:block font-semibold"> All Students</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full ">
              <Image
                src="/filter.png"
                alt="filter"
                width={14}
                height={14}
                className="mr-2"
              />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full ">
              <Image
                src="/sort.png"
                alt="sort"
                width={14}
                height={14}
                className="mr-2"
              />
            </button>
            {role === "admin" && (
              <button className="w-8 h-8 flex items-center justify-center rounded-full ">
                <Image
                  src="/plus.png"
                  alt="plus"
                  width={14}
                  height={14}
                  className="mr-2"
                />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* LIST SECTION */}

      <div className="">
        <Table columns={columns} renderRow={renderRow} data={studentsData} />
      </div>

      {/* PAGINATION SECTION */}
      <Pagination />
    </div>
  );
};

export default StudentListPage;
