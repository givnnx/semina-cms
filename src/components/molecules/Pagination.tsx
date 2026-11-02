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

  const linkButtonClasses =
    "inline-flex items-center justify-center rounded-md font-medium text-xs h-8 px-3 transition-colors border border-input-border bg-surface hover:bg-muted-bg text-foreground cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

  return (
    <div className="flex items-center justify-center space-x-2 mt-4">
      {currentPage <= 1 ? (
        <Button variant="outline" size="sm" disabled>
          Previous
        </Button>
      ) : (
        <Link
          href={`${baseUrl}?${createQueryString(currentPage - 1)}`}
          className={linkButtonClasses}
        >
          Previous
        </Link>
      )}

      <span className="text-sm font-medium text-muted">
        Page {currentPage} of {totalPages}
      </span>

      {currentPage >= totalPages ? (
        <Button variant="outline" size="sm" disabled>
          Next
        </Button>
      ) : (
        <Link
          href={`${baseUrl}?${createQueryString(currentPage + 1)}`}
          className={linkButtonClasses}
        >
          Next
        </Link>
      )}
    </div>
  );
}
