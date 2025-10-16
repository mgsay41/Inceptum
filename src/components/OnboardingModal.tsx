"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserResource } from '@clerk/types';

interface OnboardingModalProps {
  clerkUser: UserResource;
  onComplete: () => void;
}

const onboardingSchema = z.object({
  phoneNumber: z.string()
    .regex(/^\+20[0-9]{10}$/, "Invalid Egyptian phone number. Format: +201234567890"),
  university: z.string().min(2, "University name is required"),
  college: z.string().min(2, "College name is required"),
  semester: z.string().min(1, "Semester is required")
});

type OnboardingFormData = z.infer<typeof onboardingSchema>;

const OnboardingModal = ({ clerkUser, onComplete }: OnboardingModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OnboardingFormData>({
    resolver: zodResolver(onboardingSchema),
  });

  const onSubmit = async (data: OnboardingFormData) => {
    setIsSubmitting(true);
    setError('');

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://tariky-backend-o26r.vercel.app';
      const response = await fetch(
        `${apiUrl}/api/users/complete-onboarding/${clerkUser.id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to complete onboarding');
      }

      onComplete();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to complete onboarding. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-[500px]" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Complete Your Profile</DialogTitle>
          <DialogDescription className="text-gray-600">
            We need a few more details to set up your account and help you get started.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="phoneNumber" className="text-sm font-medium">
              Phone Number (WhatsApp) <span className="text-red-500">*</span>
            </Label>
            <Input
              id="phoneNumber"
              type="tel"
              placeholder="+201234567890"
              {...register('phoneNumber')}
              className={errors.phoneNumber ? 'border-red-500' : ''}
            />
            {errors.phoneNumber && (
              <p className="text-sm text-red-500">{errors.phoneNumber.message}</p>
            )}
            <p className="text-xs text-gray-500">Enter your Egyptian phone number starting with +20</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="university" className="text-sm font-medium">
              University <span className="text-red-500">*</span>
            </Label>
            <Input
              id="university"
              type="text"
              placeholder="e.g., Addis Ababa University"
              {...register('university')}
              className={errors.university ? 'border-red-500' : ''}
            />
            {errors.university && (
              <p className="text-sm text-red-500">{errors.university.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="college" className="text-sm font-medium">
              College/Faculty <span className="text-red-500">*</span>
            </Label>
            <Input
              id="college"
              type="text"
              placeholder="e.g., Computer Science"
              {...register('college')}
              className={errors.college ? 'border-red-500' : ''}
            />
            {errors.college && (
              <p className="text-sm text-red-500">{errors.college.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="semester" className="text-sm font-medium">
              Current Semester <span className="text-red-500">*</span>
            </Label>
            <Input
              id="semester"
              type="text"
              placeholder="e.g., Year 3, Semester 1"
              {...register('semester')}
              className={errors.semester ? 'border-red-500' : ''}
            />
            {errors.semester && (
              <p className="text-sm text-red-500">{errors.semester.message}</p>
            )}
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}

          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              className="bg-teal-600 hover:bg-teal-700 text-white px-6"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Complete Profile'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingModal;
