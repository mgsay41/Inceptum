"use client";

import { useRouter } from "next/navigation";
import React from "react";

const Pagination = ({ page, count }: { page: number; count: number }) => {
  const router = useRouter();

  const hasPrev = 10 * (page - 1) > 0;
  const hasNext = 10 * (page - 1) + 10 < count;

  const changePage = (newPage: number) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("page", newPage.toString());
    const newPathname = `${window.location.pathname}?${searchParams.toString()}`;
    router.push(newPathname);
  };
  return (
    <div className="p-4 flex items-center justify-between text-gray-500">
      <button
        disabled={!hasPrev}
        className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:cursor-not-allowed disabled:opacity-50"
        onClick={() => changePage(page - 1)}
      >
        Prev
      </button>
      <div className="flex items-center gap-2 text-sm">
        {Array.from({ length: Math.ceil(count / 10) }, (_, index) => {
          const pageIndex = index + 1;
          return (
            <button
              key={pageIndex}
              className={`px-2 rounded-sm ${page === pageIndex ? "bg-pink-100" : ""}`}
              onClick={() => changePage(pageIndex)}
            >
              {pageIndex}
            </button>
          );
        })}
      </div>
      <button
        className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:cursor-not-allowed disabled:opacity-50"
        onClick={() => changePage(page + 1)}
        disabled={!hasNext}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
