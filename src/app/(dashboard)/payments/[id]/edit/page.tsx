import { notFound } from "next/navigation";
import PaymentForm from "@/components/organisms/PaymentForm";
import { getPayment, updatePayment } from "../../actions";

interface EditPaymentPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPaymentPage({
  params,
}: EditPaymentPageProps) {
  const { id } = await params;
  const payment = await getPayment(id);

  if (!payment) {
    notFound();
  }

  const updatePaymentWithId = updatePayment.bind(null, id);

  return (
    <div className="space-y-4">
      <PaymentForm
        title="Edit Payment"
        initialData={payment}
        action={updatePaymentWithId}
      />
    </div>
  );
}
