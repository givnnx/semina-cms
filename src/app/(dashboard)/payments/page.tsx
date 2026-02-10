import Link from "next/link";
import { getPayments, deletePayment } from "./actions";
import { Button } from "@/components/atoms/Button";
import { DeleteButton } from "@/components/molecules/DeleteButton";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/Card";

export default async function PaymentsPage() {
  const payments = await getPayments();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Payments</h1>
        <Link href="/payments/create">
          <Button>Add Payment</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>List of Payments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm text-left">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th className="h-12 px-4 align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                    Type
                  </th>
                  <th className="h-12 px-4 align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                    Avatar
                  </th>
                  <th className="h-12 px-4 align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 text-right">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {payments.length > 0 ? (
                  payments.map((payment) => (
                    <tr
                      key={payment._id}
                      className="border-b transition-colors hover:bg-gray-50"
                    >
                      <td className="p-4 align-middle">{payment.type}</td>
                      <td className="p-4 align-middle">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={payment.image || "https://placehold.co/40"}
                          alt={payment.type}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      </td>
                      <td className="p-4 align-middle text-right space-x-2">
                        <Link href={`/payments/${payment._id}/edit`}>
                          <Button
                            size="sm"
                            variant="primary"
                            className="bg-green-600 hover:bg-green-700"
                          >
                            Edit
                          </Button>
                        </Link>

                        <DeleteButton
                          action={deletePayment}
                          id={payment._id!}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="p-4 text-center text-gray-500">
                      No payments found.
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
