import PaymentForm from "@/components/organisms/PaymentForm";
import { createPayment } from "../actions";

export default function CreatePaymentPage() {
  return (
    <div className="space-y-4">
      <PaymentForm title="Create Payment" action={createPayment} />
    </div>
  );
}
