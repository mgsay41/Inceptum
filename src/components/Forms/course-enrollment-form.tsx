import { useState } from 'react';
import { useUser } from '@clerk/nextjs';

type EnrollmentFormProps = {
  courseId: number;
  onSuccess: () => void;
  onCancel: () => void;
};

const CourseEnrollmentForm = ({ courseId, onSuccess, onCancel }: EnrollmentFormProps) => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://tariky-backend-o26r.vercel.app';
      const response = await fetch(
        `${apiUrl}/api/courses/${courseId}/enroll`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ clerkId: user?.id })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to enroll');
      }

      // Enrollment successful - redirect to payment if link exists
      if (data.data?.course?.paymentLink) {
        window.location.href = data.data.course.paymentLink;
      } else {
        // Fallback if no payment link
        onSuccess();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Enrollment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold">Confirm Enrollment</h2>
      <p className="text-sm text-gray-600">
        You will be redirected to the payment page after confirming enrollment.
      </p>

      <div className="bg-blue-50 border border-blue-200 p-4 rounded-md">
        <p className="text-sm text-blue-800">
          <strong>Name:</strong> {user?.fullName}<br/>
          <strong>Email:</strong> {user?.primaryEmailAddress?.emailAddress}
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
          {error}
        </div>
      )}

      <div className="flex justify-end gap-3 mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-md hover:bg-teal-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Enroll & Pay'}
        </button>
      </div>
    </form>
  );
};

export default CourseEnrollmentForm;