"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long!" })
    .max(20, { message: "Username must be at most 20 characters long!" }),

  email: z.string().email({ message: "Please enter a valid email!" }),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long!" }),

  confirmPassword: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long!" }),

  firstName: z
    .string()
    .min(3, { message: "First name must be at least 3 characters long!" }),
  lastName: z
    .string()
    .min(3, { message: "Last name must be at least 3 characters long!" }),
  Phone: z.string().min(1, { message: "Phone number is required!" }),
  address: z.string().min(1, { message: "Address is required!" }),
  birthday: z
    .date()
    .min(new Date(1900, 0, 1), { message: "Birthday is required!" })
    .max(new Date(), { message: "Birthday cannot be in the future!" }),
  gender: z.enum(["male", "female"], { message: "Gender is required!" }),
  image: z.instanceof(File, { message: "Image is required!" }),
});

const InstructorForm = ({
  type,
  data,
}: {
  type: "create" | "update";
  data?: any;
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: zodResolver(schema) });

  return <form>InstructorForm</form>;
};

export default InstructorForm;
