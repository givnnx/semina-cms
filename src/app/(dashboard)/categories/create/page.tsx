import CategoryForm from "../_components/CategoryForm";
import { createCategory } from "../actions";

export default function CreateCategoryPage() {
  return (
    <div className="space-y-4">
      <CategoryForm title="Create Category" action={createCategory} />
    </div>
  );
}
