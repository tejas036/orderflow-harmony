
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ReconciliationStatus } from "@/components/Transactions/ReconciliationStatus";
import { BankDeposit, Transaction } from "@/types";

interface DepositMatcherProps {
  bankDeposits: BankDeposit[];
  unmatchedTransactions: Transaction[];
  onMatch: (depositId: string, transactionIds: string[]) => void;
}

const DepositMatcher = ({ 
  bankDeposits, 
  unmatchedTransactions, 
  onMatch 
}: DepositMatcherProps) => {
  const [selectedDeposit, setSelectedDeposit] = useState<string | null>(null);
  const [selectedTransactions, setSelectedTransactions] = useState<string[]>([]);

  const handleDepositSelect = (depositId: string) => {
    setSelectedDeposit(depositId === selectedDeposit ? null : depositId);
    setSelectedTransactions([]);
  };

  const handleTransactionSelect = (transactionId: string) => {
    setSelectedTransactions(prev => 
      prev.includes(transactionId)
        ? prev.filter(id => id !== transactionId)
        : [...prev, transactionId]
    );
  };

  const handleMatch = () => {
    if (selectedDeposit && selectedTransactions.length > 0) {
      onMatch(selectedDeposit, selectedTransactions);
      setSelectedDeposit(null);
      setSelectedTransactions([]);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const selectedDepositAmount = selectedDeposit 
    ? bankDeposits.find(d => d.id === selectedDeposit)?.amount || 0 
    : 0;
  
  const selectedTransactionsTotal = unmatchedTransactions
    .filter(t => selectedTransactions.includes(t.id))
    .reduce((sum, t) => sum + t.amount, 0);
  
  const discrepancy = selectedDepositAmount - selectedTransactionsTotal;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Bank Deposits</CardTitle>
          <CardDescription>
            Select a bank deposit to match with transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Reference</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Bank</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bankDeposits.map((deposit) => (
                  <TableRow 
                    key={deposit.id} 
                    className={selectedDeposit === deposit.id ? "bg-blue-50" : ""}
                    onClick={() => handleDepositSelect(deposit.id)}
                  >
                    <TableCell className="font-medium">{deposit.reference}</TableCell>
                    <TableCell>{formatDate(deposit.date)}</TableCell>
                    <TableCell>{deposit.bankName}</TableCell>
                    <TableCell className="text-right">{formatCurrency(deposit.amount)}</TableCell>
                    <TableCell>
                      <ReconciliationStatus status={deposit.status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Unmatched Transactions</CardTitle>
          <CardDescription>
            Select one or more transactions to match with the deposit
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {unmatchedTransactions.map((transaction) => (
                  <TableRow 
                    key={transaction.id} 
                    className={selectedTransactions.includes(transaction.id) ? "bg-blue-50" : ""}
                    onClick={() => handleTransactionSelect(transaction.id)}
                  >
                    <TableCell className="font-medium">{transaction.orderId}</TableCell>
                    <TableCell>{formatDate(transaction.date)}</TableCell>
                    <TableCell>{transaction.customerName}</TableCell>
                    <TableCell className="text-right">{formatCurrency(transaction.amount)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {selectedDeposit && (
            <div className="mt-4">
              <div className="flex justify-between items-center mb-2">
                <span>Deposit Amount:</span>
                <span className="font-bold">{formatCurrency(selectedDepositAmount)}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span>Selected Transactions:</span>
                <span className="font-bold">{formatCurrency(selectedTransactionsTotal)}</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span>Discrepancy:</span>
                <span className={`font-bold ${discrepancy !== 0 ? "text-red-500" : "text-green-500"}`}>
                  {formatCurrency(Math.abs(discrepancy))} {discrepancy < 0 ? "(Under)" : discrepancy > 0 ? "(Over)" : ""}
                </span>
              </div>
              <Button 
                onClick={handleMatch} 
                className="w-full" 
                disabled={!selectedDeposit || selectedTransactions.length === 0}
              >
                Match Selected
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DepositMatcher;
