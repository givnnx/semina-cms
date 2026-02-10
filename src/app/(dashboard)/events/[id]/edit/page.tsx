import { notFound } from "next/navigation";
import EventForm from "@/components/organisms/EventForm";
import { getEvent, updateEvent } from "@/app/(dashboard)/events/actions";
import { getCategories } from "@/app/(dashboard)/categories/actions";
import { getTalents } from "@/app/(dashboard)/talents/actions";

interface EditEventPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditEventPage({ params }: EditEventPageProps) {
  const { id } = await params;
  const event = await getEvent(id);
  const categories = await getCategories();
  const talents = await getTalents();

  if (!event) {
    notFound();
  }

  const categoriesOptions = categories.map((c) => ({
    value: c._id!,
    label: c.name,
  }));
  const talentsOptions = talents.map((t) => ({ value: t._id!, label: t.name }));

  const updateEventWithId = updateEvent.bind(null, id);

  return (
    <div className="space-y-4">
      <EventForm
        title="Edit Event"
        initialData={event}
        action={updateEventWithId}
        categories={categoriesOptions}
        talents={talentsOptions}
      />
    </div>
  );
}
