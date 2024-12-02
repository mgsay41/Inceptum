import InstructorRegistrationForm from "@/components/Forms/instructor-registration-form";

const Homepage = () => {
  return (
    <main className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Instructor Registration
        </h1>
        <InstructorRegistrationForm />
      </div>
    </main>
  );
};

export default Homepage;
