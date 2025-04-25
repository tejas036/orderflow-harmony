
import { useState } from "react";
import { PaymentCollectionForm } from "@/components/PaymentCollection/PaymentCollectionForm";
import { QRCodeDisplay } from "@/components/PaymentCollection/QRCodeDisplay";

interface PaymentData {
  payerName: string;
  amount: string;
  mobileNumber: string;
  reference: string;
}

export default function PaymentCollection() {
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);

  const handleFormSubmit = (data: PaymentData) => {
    setPaymentData(data);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Payment Collection</h1>
      <div className="max-w-2xl mx-auto">
        {!paymentData ? (
          <PaymentCollectionForm onSubmit={handleFormSubmit} />
        ) : (
          <QRCodeDisplay paymentData={paymentData} />
        )}
      </div>
    </div>
  );
}
