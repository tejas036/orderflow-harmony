
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

interface CashCollectionFormProps {
  onSubmit: (data: {
    amount: string;
    customerName: string;
    challanNumber: string;
  }) => void;
}

const CashCollectionForm = ({ onSubmit }: CashCollectionFormProps) => {
  const { toast } = useToast();
  const [amount, setAmount] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [challanNumber, setChallanNumber] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    const newErrors: Record<string, string> = {};
    if (!amount) newErrors.amount = "Amount is required";
    else if (isNaN(parseFloat(amount)) || parseFloat(amount) <= 0)
      newErrors.amount = "Amount must be a positive number";
    if (!customerName) newErrors.customerName = "Customer name is required";
    if (!challanNumber) newErrors.challanNumber = "Challan number is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit({ amount, customerName, challanNumber });
    
    // Reset form
    setAmount("");
    setCustomerName("");
    setChallanNumber("");
  };

  const generateChallan = () => {
    const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    const newChallan = `CH${randomNum}`;
    setChallanNumber(newChallan);
    toast({
      title: "Challan Generated",
      description: `New challan number: ${newChallan}`,
    });
  };

  return (
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
        <div className="flex justify-between items-center">
          <Label htmlFor="challanNumber">Challan Number</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={generateChallan}
          >
            Generate
          </Button>
        </div>
        <Input
          id="challanNumber"
          placeholder="Enter challan number"
          value={challanNumber}
          onChange={(e) => setChallanNumber(e.target.value)}
        />
        {errors.challanNumber && (
          <p className="text-sm text-red-500">{errors.challanNumber}</p>
        )}
      </div>

      <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200">
        <h3 className="font-medium text-yellow-800">Collection Instructions</h3>
        <ul className="list-disc list-inside text-sm text-yellow-700 mt-2">
          <li>Verify the customer's identity before accepting payment</li>
          <li>Count the cash amount twice to ensure accuracy</li>
          <li>Issue a receipt to the customer</li>
          <li>Store cash in designated secure location</li>
        </ul>
      </div>

      <div className="flex justify-end">
        <Button type="submit">Record Collection</Button>
      </div>
    </form>
  );
};

export default CashCollectionForm;
