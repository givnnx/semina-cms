import EventForm from "@/components/organisms/EventForm";
import { createEvent } from "../actions";
import { getCategories } from "../../categories/actions";
import { getTalents } from "../../talents/actions";

export default async function CreateEventPage() {
  const categories = await getCategories();
  const talents = await getTalents();

  const categoriesOptions = categories.map((c) => ({
    value: c._id!,
    label: c.name,
  }));
  const talentsOptions = talents.map((t) => ({ value: t._id!, label: t.name }));

  // Helper for create action wrapper to match signature if needed or use bind
  // For now passing direct action ref standard way

  return (
    <div className="space-y-4">
      <EventForm
        title="Create Event"
        action={createEvent}
        categories={categoriesOptions}
        talents={talentsOptions}
      />
    </div>
  );
}
