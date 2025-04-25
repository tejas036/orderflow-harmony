
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QRCodeDisplay } from "@/components/PaymentCollection/QRCodeDisplay";

const QRCollectionForm = () => {
  const [amount, setAmount] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [reference, setReference] = useState("");
  const [showQR, setShowQR] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    const newErrors: Record<string, string> = {};
    if (!amount) newErrors.amount = "Amount is required";
    else if (isNaN(parseFloat(amount)) || parseFloat(amount) <= 0)
      newErrors.amount = "Amount must be a positive number";
    if (!customerName) newErrors.customerName = "Customer name is required";
    if (!mobileNumber) newErrors.mobileNumber = "Mobile number is required";
    else if (!/^\d{10}$/.test(mobileNumber))
      newErrors.mobileNumber = "Enter a valid 10-digit mobile number";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Generate a reference if empty
    if (!reference) {
      const newRef = `QR${Date.now().toString().slice(-8)}`;
      setReference(newRef);
    }

    setShowQR(true);
  };

  const resetForm = () => {
    setAmount("");
    setCustomerName("");
    setMobileNumber("");
    setReference("");
    setShowQR(false);
    setErrors({});
  };

  return (
    <div className="space-y-4">
      {!showQR ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            {errors.amount && <p className="text-sm text-red-500">{errors.amount}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="customerName">Customer Name</Label>
            <Input
              id="customerName"
              placeholder="Enter customer name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
            {errors.customerName && (
              <p className="text-sm text-red-500">{errors.customerName}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="mobileNumber">Mobile Number</Label>
            <Input
              id="mobileNumber"
              placeholder="Enter 10-digit mobile number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
            {errors.mobileNumber && (
              <p className="text-sm text-red-500">{errors.mobileNumber}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="reference">Reference (Optional)</Label>
            <Input
              id="reference"
              placeholder="Enter reference"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit">Generate QR Code</Button>
          </div>
        </form>
      ) : (
        <div className="space-y-6">
          <QRCodeDisplay
            paymentData={{
              payerName: customerName,
              amount: amount,
              mobileNumber: mobileNumber,
              reference: reference,
            }}
          />
          <div className="flex justify-center">
            <Button onClick={resetForm} variant="outline">
              Generate New QR
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QRCollectionForm;
