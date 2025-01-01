"use client";

import React, { useState } from "react";
import { FaPlus, FaSortAmountDown } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import { LuEye } from "react-icons/lu";
import { MdOutlineDeleteForever } from "react-icons/md";
import { RiFileUserLine, RiFilter2Line } from "react-icons/ri";
import DeleteConfirmationPopup from "./delete-confirmation-popup";
import InstructorRegistrationForm from "./Forms/instructor-registration-form";

// Define prop types
type TableType =
  | "assistants"
  | "instructor"
  | "student"
  | "course"
  | "subAdmin"
  | "announcement"
  | "message";

type ActionType =
  | "create"
  | "update"
  | "delete"
  | "view"
  | "sort"
  | "filter"
  | "CV";

interface FormModalProps {
  table: TableType;
  type: ActionType;
  data?: any;
  id?: string;
}

const FormModal: React.FC<FormModalProps> = ({ table, type, data, id }) => {
  // Define icon mapping
  const icons: Record<ActionType, JSX.Element> = {
    create: <FaPlus className="mr-2" />,
    sort: <FaSortAmountDown className="mr-2 " />,
    filter: <RiFilter2Line className="mr-2 " />,
    update: <FaPlus className="mr-2 " />,
    delete: <MdOutlineDeleteForever className="mr-2 w-7 h-7" />,
    view: <LuEye className="mr-2 w-7 h-7" />,
    CV: <RiFileUserLine className="mr-2 w-7 h-7" />,
  };

  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    console.log("Item deleted!");
    setOpen(false);
  };

  const Form = () => {
    return type === "delete" && id ? (
      <DeleteConfirmationPopup
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={handleDelete}
        itemName="this important file"
      />
    ) : (
      <div className="h-[80%] w-[40%] overflow-y-auto">
        <InstructorRegistrationForm />
      </div>
    );
  };

  return (
    <div>
      <button
        className="w-6 h-6 flex items-center justify-center rounded-full text-gray-500"
        onClick={() => setOpen(true)}
      >
        {icons[type] || <span>Unknown</span>}
      </button>
      {open && (
        <div
          className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-60 flex items-center justify-center z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setOpen(false);
            }
          }}
        >
          <Form />
        </div>
      )}
    </div>
  );
};

export default FormModal;
