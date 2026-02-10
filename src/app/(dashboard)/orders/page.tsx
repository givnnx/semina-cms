import { getOrders } from "./actions";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/Card";
import { Pagination } from "@/components/molecules/Pagination";
import { Input } from "@/components/atoms/Input";
import { Button } from "@/components/atoms/Button";
import Link from "next/link";

interface OrdersPageProps {
  searchParams?: Promise<{
    page?: string;
    startDate?: string;
    endDate?: string;
  }>;
}

export default async function OrdersPage({ searchParams }: OrdersPageProps) {
  const params = await searchParams;
  const currentPage = Number(params?.page) || 1;
  const startDate = params?.startDate || "";
  const endDate = params?.endDate || "";

  const { data: orders, pages } = await getOrders(
    currentPage,
    10,
    startDate,
    endDate,
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Orders</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filter Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex gap-4 items-end">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Start Date</label>
              <Input type="date" name="startDate" defaultValue={startDate} />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">End Date</label>
              <Input type="date" name="endDate" defaultValue={endDate} />
            </div>
            <Button type="submit">Filter</Button>
            {(startDate || endDate) && (
              <Button variant="outline">
                <Link href="/orders">Reset</Link>
              </Button>
            )}
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm text-left">
              <thead className="[&_tr]:border-b">
                <tr className="border-b hover:bg-muted/50">
                  <th className="h-12 px-4 align-middle font-medium text-muted-foreground">
                    Name
                  </th>
                  <th className="h-12 px-4 align-middle font-medium text-muted-foreground">
                    Email
                  </th>
                  <th className="h-12 px-4 align-middle font-medium text-muted-foreground">
                    Event Title
                  </th>
                  <th className="h-12 px-4 align-middle font-medium text-muted-foreground">
                    Event Date
                  </th>
                  <th className="h-12 px-4 align-middle font-medium text-muted-foreground">
                    Order Date
                  </th>
                  <th className="h-12 px-4 align-middle font-medium text-muted-foreground">
                    Venue
                  </th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <tr
                      key={order._id}
                      className="border-b transition-colors hover:bg-gray-50"
                    >
                      <td className="p-4 align-middle">
                        {order.personalDetail.firstName}{" "}
                        {order.personalDetail.lastName}
                      </td>
                      <td className="p-4 align-middle">
                        {order.personalDetail.email}
                      </td>
                      <td className="p-4 align-middle">
                        {order.historyEvent.title}
                      </td>
                      <td className="p-4 align-middle">
                        {new Date(order.historyEvent.date).toLocaleDateString()}
                      </td>
                      <td className="p-4 align-middle">
                        {new Date(order.date).toLocaleDateString()}
                      </td>
                      <td className="p-4 align-middle">
                        {order.historyEvent.venueName}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="p-4 text-center text-gray-500">
                      No orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <Pagination
            totalPages={pages}
            currentPage={currentPage}
            baseUrl="/orders"
            searchParams={{ startDate, endDate }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
