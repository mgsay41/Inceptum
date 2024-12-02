import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role, studentsData } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Eye, Trash2, FileUser } from "lucide-react";
import { FaSortAmountDown, FaPlus } from "react-icons/fa";
import { RiFilter2Line } from "react-icons/ri";
import FormModal from "@/components/FormModal";

type Teacher = {
  id: number;
  teacherID: string;
  name: string;
  photo: string;
  phone: string;
  email: string;
  subject: string[];
  classes: string[];
};

const columns = [
  {
    header: "Info",
    accessor: "info",
  },
  {
    header: "Teacher ID",
    accessor: "teacherID",
  },
  {
    header: "Subjects",
    accessor: "subjects",
  },
  {
    header: "Classes",
    accessor: "classes",
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
    header: "Action",
    accessor: "action",
  },
];

const SubAdminListPage = () => {
  const renderRow = (items: Teacher) => {
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
        <td className="hidden md:table-cell">{items.teacherID}</td>
        <td className="hidden md:table-cell">{items.subject}</td>
        {/*Professional level*/}
        <td className="hidden md:table-cell">{items.classes}</td> {/*rating*/}
        <td className="hidden md:table-cell">{items.classes}</td> {/*rating*/}
        <td className="hidden md:table-cell">{items.phone}</td> {/*cv*/}
        <td>
          <div className="flex items-center gap-2">
            <Link href={`/list/SubAdmins/${items.id}`}>
              <FormModal table="assistants" type="view" />
            </Link>
            {role === "admin" && <FormModal table="assistants" type="delete" />}
            <FormModal table="assistants" type="CV" />
          </div>
        </td>
      </tr>
    );
  };

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP SECTION */}

      <div className="flex items-center justify-between">
        <h1 className="text-lg hidden md:block font-semibold">
          {" "}
          All SubAdmins
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
        <Table columns={columns} renderRow={renderRow} data={studentsData} />
      </div>

      {/* PAGINATION SECTION */}
      <Pagination />
    </div>
  );
};

export default SubAdminListPage;
