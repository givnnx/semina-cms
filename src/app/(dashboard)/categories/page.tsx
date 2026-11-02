import Link from "next/link";
import { getCategories, deleteCategory } from "./actions";
import { Button } from "@/components/atoms/Button";
import { DeleteButton } from "@/components/molecules/DeleteButton";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/Card";

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Categories</h1>
        <Link
          href="/categories/create"
          className="inline-flex items-center justify-center rounded-md font-medium text-sm h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary-hover shadow-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Add Category
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>List of Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm text-left">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th className="h-12 px-4 align-middle font-medium text-muted">
                    Name
                  </th>
                  <th className="h-12 px-4 align-middle font-medium text-muted text-right">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <tr
                      key={category._id}
                      className="border-b border-border transition-colors hover:bg-muted-bg"
                    >
                      <td className="p-4 align-middle">{category.name}</td>
                      <td className="p-4 align-middle text-right space-x-2">
                        <Link
                          href={`/categories/${category._id}/edit`}
                          className="inline-flex items-center justify-center rounded-md font-medium text-xs h-8 px-3 bg-success text-success-foreground hover:bg-success-hover shadow-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                        >
                          Edit
                        </Link>

                        <DeleteButton
                          action={deleteCategory}
                          id={category._id!}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={2} className="p-8 text-center text-muted">
                      No categories have been created yet.{" "}
                      <Link
                        href="/categories/create"
                        className="text-primary hover:underline font-medium ml-1"
                      >
                        Create your first category
                      </Link>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
