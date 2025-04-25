import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CashWalletDepositFormProps {
  onSubmit: (data: {
    date: string;
    amount: string;
    bankBranch: string;
  }) => void;
}

const CashWalletDepositForm = ({ onSubmit }: CashWalletDepositFormProps) => {
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [bankBranch, setBankBranch] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    const newErrors: Record<string, string> = {};
    if (!date) newErrors.date = "Date is required";
    if (!amount) newErrors.amount = "Amount is required";
    else if (isNaN(parseFloat(amount)) || parseFloat(amount) <= 0)
      newErrors.amount = "Amount must be a positive number";
    if (!bankBranch) newErrors.bankBranch = "Bank branch is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit({ date, amount, bankBranch });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pt-4">
      <div className="space-y-2">
        <Label htmlFor="date">Date of Deposit</Label>
        <Input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        {errors.date && <p className="text-sm text-red-500">{errors.date}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="amount">Amount ₹</Label>
        <Input
          id="amount"
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        {errors.amount && (
          <p className="text-sm text-red-500">{errors.amount}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="bankBranch">Outlet </Label>
        <select
          id="bankBranch"
          className="w-full p-2 border border-gray-300 rounded-md"
          value={bankBranch}
          onChange={(e) => setBankBranch(e.target.value)}
        >
          <option value="" disabled>
            Select an outlet
          </option>
          <option value="Outlet 1">Outlet 1</option>
          <option value="Outlet 2">Outlet 2</option>
          <option value="Outlet 3">Outlet 3</option>
        </select>
        {errors.bankBranch && (
          <p className="text-sm text-red-500">{errors.bankBranch}</p>
        )}
      </div>

      <div className="flex justify-end">
        <Button type="submit">Add Deposit</Button>
      </div>
    </form>
  );
};

export default CashWalletDepositForm;
