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
        <Link href="/categories/create">
          <Button>Add Category</Button>
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
                  <th className="h-12 px-4 align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                    Name
                  </th>
                  <th className="h-12 px-4 align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 text-right">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <tr
                      key={category._id}
                      className="border-b transition-colors hover:bg-gray-50"
                    >
                      <td className="p-4 align-middle">{category.name}</td>
                      <td className="p-4 align-middle text-right space-x-2">
                        <Link href={`/categories/${category._id}/edit`}>
                          <Button
                            size="sm"
                            variant="primary"
                            className="bg-green-600 hover:bg-green-700"
                          >
                            Edit
                          </Button>
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
                    <td colSpan={2} className="p-4 text-center text-gray-500">
                      No categories found.
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
