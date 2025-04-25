
import { useState } from "react";
import { OnlinePaymentForm } from "@/components/OnlinePayment/OnlinePaymentForm";
import { OnlinePaymentGateway } from "@/components/OnlinePayment/OnlinePaymentGateway";
import { QRCodeDisplay } from "@/components/PaymentCollection/QRCodeDisplay";
import Navbar from "@/components/Navbar";

interface PaymentData {
  payerName: string;
  amount: string;
  mobileNumber: string;
  reference: string;
  purpose: string;
}

type PaymentMethod = "gateway" | "qr" | null;

export default function OnlinePayments() {
  const [paymentData, setPaymentData] = useState<PaymentData>({
    payerName: "John Doe", // Pre-populated data
    amount: "1000",
    mobileNumber: "9876543210",
    reference: "ORD" + Math.floor(10000 + Math.random() * 90000),
    purpose: "Book Purchase", // Pre-populated purpose
  });
  
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null);

  const handleFormSubmit = (data: PaymentData) => {
    setPaymentData(data);
  };

  const handleGatewayPayment = () => {
    setPaymentMethod("gateway");
  };

  const handleQRPayment = () => {
    setPaymentMethod("qr");
  };

  const resetFlow = () => {
    setPaymentMethod(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Online Payments</h1>
        
        <div className="max-w-2xl mx-auto">
          {paymentMethod === "gateway" ? (
            <OnlinePaymentGateway paymentData={paymentData} onComplete={resetFlow} />
          ) : paymentMethod === "qr" ? (
            <div className="space-y-6">
              <QRCodeDisplay paymentData={paymentData} />
              <div className="flex justify-center">
                <button 
                  onClick={resetFlow}
                  className="px-4 py-2 bg-slate-100 rounded-md hover:bg-slate-200"
                >
                  Back to Payment Options
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-blue-700 text-sm">
                  Note: The form below is pre-populated with data from online websites. 
                  You can modify the details if needed before proceeding with the payment.
                </p>
              </div>
              
              <OnlinePaymentForm 
                initialData={paymentData} 
                onSubmit={handleFormSubmit} 
                onGatewayPayment={handleGatewayPayment}
                onQRPayment={handleQRPayment}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
