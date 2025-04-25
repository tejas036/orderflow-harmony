
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCode } from "lucide-react";

interface QRCodeDisplayProps {
  paymentData: {
    payerName: string;
    amount: string;
    mobileNumber: string;
    reference: string;
  };
}

export function QRCodeDisplay({ paymentData }: QRCodeDisplayProps) {
  // In a real app, this would be your UPI URL or payment gateway QR code
  const qrData = `upi://pay?pa=merchant@upi&pn=${paymentData.payerName}&am=${paymentData.amount}&tr=${paymentData.reference}&cu=INR`;

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center flex items-center justify-center gap-2">
          <QrCode className="h-6 w-6" />
          Scan to Pay
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          {/* This is a placeholder for the QR code. In a real app, you'd use a QR code library */}
          <div className="w-64 h-64 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-500">
              <p className="mb-2">Amount: ₹{paymentData.amount}</p>
              <p>Reference: {paymentData.reference}</p>
            </div>
          </div>
        </div>
        <div className="text-sm text-gray-500 text-center">
          <p>Scan this QR code using any PSP app to complete the payment</p>
        </div>
      </CardContent>
    </Card>
  );
}
