import Link from "next/link";
import { getEvents, deleteEvent } from "./actions";
import { Button } from "@/components/atoms/Button";
import { DeleteButton } from "@/components/molecules/DeleteButton";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/Card";

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Events</h1>
        <Link href="/events/create">
          <Button>Add Event</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>List of Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm text-left">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th className="h-12 px-4 align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                    Title
                  </th>
                  <th className="h-12 px-4 align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                    Date
                  </th>
                  <th className="h-12 px-4 align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                    Venue
                  </th>
                  <th className="h-12 px-4 align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 text-right">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {events.length > 0 ? (
                  events.map((event) => (
                    <tr
                      key={event._id}
                      className="border-b transition-colors hover:bg-gray-50"
                    >
                      <td className="p-4 align-middle">{event.title}</td>
                      <td className="p-4 align-middle">
                        {new Date(event.date).toLocaleDateString()}
                      </td>
                      <td className="p-4 align-middle">{event.venueName}</td>
                      <td className="p-4 align-middle text-right space-x-2">
                        <Link href={`/events/${event._id}/edit`}>
                          <Button
                            size="sm"
                            variant="primary"
                            className="bg-green-600 hover:bg-green-700"
                          >
                            Edit
                          </Button>
                        </Link>

                        <DeleteButton action={deleteEvent} id={event._id!} />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="p-4 text-center text-gray-500">
                      No events found.
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
