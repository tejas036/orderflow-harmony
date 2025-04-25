
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building } from "lucide-react";

interface BankChallanDisplayProps {
  challanData: {
    payerName: string;
    amount: string;
    virtualAccountNumber: string;
    mobileNumber: string;
    email: string;
    purpose: string;
  };
}

export const BankChallanDisplay = ({ challanData }: BankChallanDisplayProps) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="border-2 print:border-black">
        <CardHeader className="text-center border-b">
          <div className="flex justify-center mb-4">
            <Building className="h-12 w-12 text-blue-600" />
          </div>
          <CardTitle className="text-2xl">Bank of Maharashtra Payment Challan</CardTitle>
          <CardDescription>Virtual Account Payment</CardDescription>
        </CardHeader>
        <CardContent className="mt-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Payer Name</p>
              <p className="font-medium">{challanData.payerName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Amount</p>
              <p className="font-medium">₹{challanData.amount}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Virtual Account Number</p>
              <p className="font-mono font-medium">{challanData.virtualAccountNumber}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Mobile Number</p>
              <p className="font-medium">{challanData.mobileNumber}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{challanData.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Purpose</p>
              <p className="font-medium">{challanData.purpose}</p>
            </div>
          </div>

          <div className="mt-8 border-t pt-6 space-y-4">
            <h3 className="font-semibold">Payment Instructions:</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Log in to your bank's Net Banking portal</li>
              <li>Select NEFT/RTGS or Fund Transfer option</li>
              <li>Add the Virtual Account Number as beneficiary</li>
              <li>Enter the exact amount mentioned in the challan</li>
              <li>Complete the transaction using NEFT or RTGS</li>
            </ol>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 flex justify-end print:hidden">
        <Button onClick={handlePrint}>
          Print Challan
        </Button>
      </div>
    </div>
  );
};

