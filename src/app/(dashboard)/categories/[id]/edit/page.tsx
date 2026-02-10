import { notFound } from "next/navigation";
import CategoryForm from "../../_components/CategoryForm";
import { getCategory, updateCategory } from "../../actions";

interface EditCategoryPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditCategoryPage({
  params,
}: EditCategoryPageProps) {
  const { id } = await params;
  const category = await getCategory(id);

  if (!category) {
    notFound();
  }

  // Bind the ID to the update action
  const updateCategoryWithId = updateCategory.bind(null, id);

  return (
    <div className="space-y-4">
      <CategoryForm
        title="Edit Category"
        initialData={category}
        action={updateCategoryWithId}
      />
    </div>
  );
}
