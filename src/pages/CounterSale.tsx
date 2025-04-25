
import { useState } from "react";
import { CounterSaleForm } from "@/components/CounterSale/CounterSaleForm";
import { QRCodeDisplay } from "@/components/PaymentCollection/QRCodeDisplay";
import { CashPaymentForm } from "@/components/CounterSale/CashPaymentForm";
import Navbar from "@/components/Navbar";

interface PaymentData {
  payerName: string;
  amount: string;
  mobileNumber: string;
  reference: string;
  description: string;
}

type PaymentMethod = "qr" | "cash" | null;

export default function CounterSale() {
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null);

  const handleFormSubmit = (data: PaymentData) => {
    setPaymentData(data);
  };

  const handleQRCodeSubmit = () => {
    if (paymentData) {
      setPaymentMethod("qr");
    }
  };

  const handleCashSubmit = () => {
    if (paymentData) {
      setPaymentMethod("cash");
    }
  };

  const resetFlow = () => {
    setPaymentMethod(null);
    setPaymentData(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Counter Sale</h1>
        <div className="max-w-2xl mx-auto">
          {!paymentData ? (
            <CounterSaleForm onSubmit={handleFormSubmit} />
          ) : paymentMethod === "qr" ? (
            <div className="space-y-6">
              <QRCodeDisplay paymentData={paymentData} />
              <div className="flex justify-center">
                <button 
                  onClick={resetFlow}
                  className="px-4 py-2 bg-slate-100 rounded-md hover:bg-slate-200"
                >
                  Start New Sale
                </button>
              </div>
            </div>
          ) : paymentMethod === "cash" ? (
            <CashPaymentForm paymentData={paymentData} onComplete={resetFlow} />
          ) : (
            <div className="space-y-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Payment Summary</h2>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-gray-500">Customer Name</p>
                    <p className="font-medium">{paymentData.payerName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Amount</p>
                    <p className="font-medium">₹{paymentData.amount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Mobile Number</p>
                    <p className="font-medium">{paymentData.mobileNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Reference</p>
                    <p className="font-medium">{paymentData.reference}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-gray-500">Description</p>
                    <p className="font-medium">{paymentData.description}</p>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-4">
                  <div>
                    <button
                      onClick={handleQRCodeSubmit}
                      className="w-full bg-blue-600 text-white px-4 py-3 rounded-md hover:bg-blue-700 flex items-center justify-center"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                      </svg>
                      Via QR Code
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={handleCashSubmit}
                      className="w-full bg-green-600 text-white px-4 py-3 rounded-md hover:bg-green-700 flex items-center justify-center"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Via Cash/Cheque
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
