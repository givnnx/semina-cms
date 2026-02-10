import { notFound } from "next/navigation";
import TalentForm from "@/components/organisms/TalentForm";
import { getTalent, updateTalent } from "../../actions";

interface EditTalentPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditTalentPage({ params }: EditTalentPageProps) {
  const { id } = await params;
  const talent = await getTalent(id);

  if (!talent) {
    notFound();
  }

  // Bind the ID to the update action
  const updateTalentWithId = updateTalent.bind(null, id);

  return (
    <div className="space-y-4">
      <TalentForm
        title="Edit Talent"
        initialData={talent}
        action={updateTalentWithId}
      />
    </div>
  );
}
