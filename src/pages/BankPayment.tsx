
import { useState } from "react";
import { BankPaymentForm } from "@/components/PaymentCollection/BankPaymentForm";
import { BankChallanDisplay } from "@/components/PaymentCollection/BankChallanDisplay";
import Navbar from "@/components/Navbar";

interface ChallanData {
  payerName: string;
  amount: string;
  virtualAccountNumber: string;
  mobileNumber: string;
  email: string;
  purpose: string;
}

export default function BankPayment() {
  const [challanData, setChallanData] = useState<ChallanData | null>(null);

  const handleFormSubmit = (data: any) => {
    // Generate a random 16-digit virtual account number
    const virtualAccountNumber = Math.floor(Math.random() * 10000000000000000).toString().padStart(16, '0');
    
    setChallanData({
      ...data,
      virtualAccountNumber,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Bank Payment</h1>
        <div className="max-w-2xl mx-auto">
          {!challanData ? (
            <BankPaymentForm onSubmit={handleFormSubmit} />
          ) : (
            <BankChallanDisplay challanData={challanData} />
          )}
        </div>
      </div>
    </div>
  );
}
