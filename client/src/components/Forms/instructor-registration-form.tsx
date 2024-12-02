"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MultiSelect } from "../multi-select";
import { FileUpload } from "../file-upload";

const formSchema = z
  .object({
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().optional(),
    profilePicture: z.any().optional(),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    expertise: z
      .array(z.string())
      .min(1, "Select at least one area of expertise"),
    education: z.string().min(2, "Education is required"),
    certifications: z.string().optional(),
    workExperience: z.string().min(2, "Work experience is required"),
    resume: z.any(),
    accountType: z.string().optional(),
    yearsOfExperience: z
      .number()
      .min(0, "Years of experience must be a positive number"),
    teachingExperience: z.string().optional(),
    agreeToTerms: z
      .boolean()
      .refine(
        (val) => val === true,
        "You must agree to the terms and conditions"
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const expertiseOptions = [
  { value: "web-development", label: "Web Development" },
  { value: "data-science", label: "Data Science" },
  { value: "machine-learning", label: "Machine Learning" },
  { value: "ui-ux-design", label: "UI/UX Design" },
  { value: "project-management", label: "Project Management" },
];

export default function InstructorRegistrationForm() {
  const [step, setStep] = useState(1);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      profilePicture: null,
      password: "",
      confirmPassword: "",
      expertise: [],
      education: "",
      certifications: "",
      workExperience: "",
      resume: null,
      yearsOfExperience: 0,
      teachingExperience: "",
      agreeToTerms: false,
      accountType: "instructor",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Here you would typically send the form data to your backend
  }

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <Card className="w-full bg-white shadow-md rounded-lg overflow-hidden">
      <CardHeader className="bg-gray-50 border-b border-gray-200 p-6">
        <CardTitle className="text-2xl font-semibold text-gray-900">
          Instructor Registration
        </CardTitle>
        <CardDescription>Join our team of expert instructors</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {step === 1 && (
              <>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your first name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your last name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter your email address"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="Enter your phone number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="profilePicture"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Profile Picture (Optional)</FormLabel>
                      <FormControl>
                        <FileUpload
                          accept="image/*"
                          maxSize={5 * 1024 * 1024} // 5MB
                          onFileSelect={(file) => field.onChange(file)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            {step === 2 && (
              <>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter your password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Confirm your password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="accountType"
                  render={() => (
                    <FormItem>
                      <FormLabel>Account Type</FormLabel>
                      <FormControl>
                        <Input value="Instructor" disabled />
                      </FormControl>
                      <FormDescription>
                        Your account type is set to Instructor
                      </FormDescription>
                    </FormItem>
                  )}
                />
              </>
            )}
            {step === 3 && (
              <>
                <FormField
                  control={form.control}
                  name="expertise"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expertise/Skills</FormLabel>
                      <FormControl>
                        <MultiSelect
                          options={expertiseOptions}
                          selected={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="education"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Education (Degree and Institution)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your degree and institution"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="certifications"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Certifications & Achievements (Optional)
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter certifications or professional achievements"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="workExperience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Work Experience</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter relevant work experience"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="resume"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Upload CV/Resume</FormLabel>
                      <FormControl>
                        <FileUpload
                          accept=".pdf,.doc,.docx"
                          maxSize={10 * 1024 * 1024} // 10MB
                          onFileSelect={(file) => field.onChange(file)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="yearsOfExperience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Years of Experience</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter your years of experience"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value, 10) || 0)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="teachingExperience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Teaching Experience (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter your teaching experience"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            {step === 4 && (
              <FormField
                control={form.control}
                name="agreeToTerms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        I agree to the Terms of Service and Privacy Policy
                      </FormLabel>
                      <FormDescription>
                        You must agree to our terms to create an account.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            )}
            <div className="flex justify-between mt-8">
              {step > 1 && (
                <Button type="button" variant="outline" onClick={prevStep}>
                  Previous
                </Button>
              )}
              {step < 4 ? (
                <Button type="button" onClick={nextStep}>
                  Next
                </Button>
              ) : (
                <Button type="submit">Submit Application</Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
