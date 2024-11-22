import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex">
      {/*LEFT SIDEBAR*/}
      <div className="w-1/6 md:w-1/12 lg:w-1/6 xl:w-1/6">
        <Link href="/" className="flex items-center justify-start pt-3 px-4">
          <Image
            src="/logo.png"
            alt="logo"
            width={150}
            height={150}
            className="hidden lg:block"
          />
        </Link>
        <Link href="/" className="flex items-center justify-center pt-3 px-4">
          <Image
            src="/logo2.png"
            alt="logo"
            width={50}
            height={50}
            className="block lg:hidden"
          />
        </Link>
        <Menu />
      </div>
      {/*MAIN CONTENT*/}
      <div className="w-5/6 bg-[#F7F8FA] md:w-11/12 lg:w-5/6 xl:w-5/6 overflow-scroll">
        <Navbar />
        {children}
      </div>
    </div>
  );
}
