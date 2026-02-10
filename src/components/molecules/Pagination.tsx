import { Button } from "@/components/atoms/Button";
import Link from "next/link";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  baseUrl: string;
  searchParams?: Record<string, string | number>;
}

export function Pagination({
  totalPages,
  currentPage,
  baseUrl,
  searchParams,
}: PaginationProps) {
  const createQueryString = (page: number) => {
    const params = new URLSearchParams();
    if (searchParams) {
      Object.entries(searchParams).forEach(([key, value]) => {
        if (value) params.set(key, String(value));
      });
    }
    params.set("page", String(page));
    return params.toString();
  };

  return (
    <div className="flex items-center justify-center space-x-2 mt-4">
      <Button variant="outline" size="sm" disabled={currentPage <= 1}>
        <Link href={`${baseUrl}?${createQueryString(currentPage - 1)}`}>
          Previous
        </Link>
      </Button>

      <span className="text-sm text-gray-600">
        Page {currentPage} of {totalPages}
      </span>

      <Button variant="outline" size="sm" disabled={currentPage >= totalPages}>
        <Link href={`${baseUrl}?${createQueryString(currentPage + 1)}`}>
          Next
        </Link>
      </Button>
    </div>
  );
}
