"use client";

import { useActionState, useState } from "react";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { Select } from "@/components/atoms/Select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/Card";
import { FormField } from "@/components/molecules/FormField";
import { ActionState } from "@/app/(dashboard)/events/actions";
// Using explicit any for simplicity in this complex form replication, ideally strict types.
// import { CategoryData } from "../../categories/actions"
// import { TalentData } from "../../talents/actions"

interface EventFormProps {
  initialData?: any; // Typed as any to speed up replication, should be EventData
  action: (state: ActionState, payload: FormData) => Promise<ActionState>;
  categories: { value: string; label: string }[];
  talents: { value: string; label: string }[];
  title: string;
}

export default function EventForm({
  initialData,
  action,
  categories,
  talents,
  title,
}: EventFormProps) {
  const [state, formAction, isPending] = useActionState(action, {
    success: false,
    message: "",
  });

  // Dynamic Fields State
  const [keyPoints, setKeyPoints] = useState<string[]>(
    initialData?.keyPoint || [""],
  );
  const [tickets, setTickets] = useState<any[]>(
    initialData?.tickets || [
      { type: "", price: 0, stock: 0, statusTicketCategories: "true" },
    ],
  );
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialData?.avatar ? `/${initialData.avatar}` : null,
  );

  // Handlers for KeyPoints
  const addKeyPoint = () => setKeyPoints([...keyPoints, ""]);
  const removeKeyPoint = (index: number) =>
    setKeyPoints(keyPoints.filter((_, i) => i !== index));
  const changeKeyPoint = (index: number, value: string) => {
    const newPoints = [...keyPoints];
    newPoints[index] = value;
    setKeyPoints(newPoints);
  };

  // Handlers for Tickets
  const addTicket = () =>
    setTickets([
      ...tickets,
      { type: "", price: 0, stock: 0, statusTicketCategories: "true" },
    ]);
  const removeTicket = (index: number) =>
    setTickets(tickets.filter((_, i) => i !== index));
  const changeTicket = (index: number, field: string, value: any) => {
    const newTickets = [...tickets];
    newTickets[index] = { ...newTickets[index], [field]: value };
    setTickets(newTickets);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-6">
          {state?.message && !state.success && (
            <div
              role="alert"
              className="p-3 rounded-md text-sm font-medium bg-alert-danger-bg text-destructive border border-alert-danger-border"
            >
              {state.message}
            </div>
          )}

          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              id="title"
              name="title"
              label="Title"
              defaultValue={initialData?.title}
              required
            />
            <FormField
              id="tagline"
              name="tagline"
              label="Tagline"
              defaultValue={initialData?.tagline}
              required
            />
            <FormField
              id="date"
              name="date"
              label="Date"
              type="datetime-local"
              defaultValue={initialData?.date}
              required
            />
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Select
                name="category"
                options={categories}
                defaultValue={initialData?.category}
                placeholder="Select Category"
              />
            </div>
            <FormField
              id="about"
              name="about"
              label="About"
              defaultValue={initialData?.about}
              required
            />
            <FormField
              id="venueName"
              name="venueName"
              label="Venue Name"
              defaultValue={initialData?.venueName}
              required
            />
          </div>

          {/* Talent & Image */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Talent</label>
              <Select
                name="talent"
                options={talents}
                defaultValue={initialData?.talent}
                placeholder="Select Talent"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Cover Image</label>
              <div className="flex items-center gap-4">
                {imagePreview && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={imagePreview}
                    alt="Cover"
                    className="h-20 w-32 object-cover rounded border"
                  />
                )}
                <Input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <input
                  type="hidden"
                  name="avatarDisplay"
                  value={imagePreview || ""}
                />
              </div>
            </div>
          </div>

          {/* Key Points */}
          <div className="space-y-2 border p-4 rounded-md">
            <label className="text-sm font-medium">Key Points</label>
            {keyPoints.map((point, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={point}
                  onChange={(e) => changeKeyPoint(index, e.target.value)}
                  placeholder="Enter key point"
                  name="keyPoints[]" // Naive form handling, in server action need to getAll('keyPoints[]') or use serialization
                />
                {keyPoints.length > 1 && (
                  <Button
                    type="button"
                    variant="danger"
                    size="sm"
                    onClick={() => removeKeyPoint(index)}
                  >
                    X
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={addKeyPoint}
            >
              Add Key Point
            </Button>
            {/* Hidden input to pass serialized keypoints to robustly handle in server action if needed, or rely on naming */}
            <input
              type="hidden"
              name="keyPointsSerialized"
              value={JSON.stringify(keyPoints)}
            />
          </div>

          {/* Tickets */}
          <div className="space-y-2 border p-4 rounded-md">
            <label className="text-sm font-medium">Tickets</label>
            {tickets.map((ticket, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-4 gap-2 border-b pb-2 mb-2"
              >
                <Input
                  value={ticket.type}
                  onChange={(e) => changeTicket(index, "type", e.target.value)}
                  placeholder="Type"
                />
                <Input
                  type="number"
                  value={ticket.price}
                  onChange={(e) => changeTicket(index, "price", e.target.value)}
                  placeholder="Price"
                />
                <Input
                  type="number"
                  value={ticket.stock}
                  onChange={(e) => changeTicket(index, "stock", e.target.value)}
                  placeholder="Stock"
                />
                <div className="flex gap-2">
                  <Select
                    value={ticket.statusTicketCategories}
                    onChange={(e) =>
                      changeTicket(
                        index,
                        "statusTicketCategories",
                        e.target.value,
                      )
                    }
                    options={[
                      { label: "Active", value: "true" },
                      { label: "Inactive", value: "false" },
                    ]}
                  />
                  {tickets.length > 1 && (
                    <Button
                      type="button"
                      variant="danger"
                      size="sm"
                      onClick={() => removeTicket(index)}
                    >
                      X
                    </Button>
                  )}
                </div>
              </div>
            ))}
            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={addTicket}
            >
              Add Ticket
            </Button>
            <input
              type="hidden"
              name="ticketsSerialized"
              value={JSON.stringify(tickets)}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
