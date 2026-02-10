import TalentForm from "@/components/organisms/TalentForm";
import { createTalent } from "../actions";

export default function CreateTalentPage() {
  return (
    <div className="space-y-4">
      <TalentForm title="Create Talent" action={createTalent} />
    </div>
  );
}
