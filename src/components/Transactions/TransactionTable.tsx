
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ReconciliationStatus } from "@/components/Transactions/ReconciliationStatus";
import { Transaction } from "@/types";
import { useState } from "react";

interface TransactionTableProps {
  transactions: Transaction[];
  onReconcile?: (id: string) => void;
}

const TransactionTable = ({ transactions, onReconcile }: TransactionTableProps) => {
  const [filteredStatus, setFilteredStatus] = useState<string | null>(null);
  const [filteredSource, setFilteredSource] = useState<string | null>(null);

  const filteredTransactions = transactions.filter(t => {
    const matchesStatus = !filteredStatus || t.status === filteredStatus;
    const matchesSource = !filteredSource || t.source === filteredSource;
    return matchesStatus && matchesSource;
  });

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

  const handleFilterClick = (status: string | null) => {
    setFilteredStatus(status === filteredStatus ? null : status);
  };

  const handleSourceFilterClick = (source: string | null) => {
    setFilteredSource(source === filteredSource ? null : source);
  };

  return (
    <div>
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">Filter by status:</span>
          <Badge 
            variant={filteredStatus === "matched" ? "default" : "outline"} 
            className="cursor-pointer"
            onClick={() => handleFilterClick("matched")}
          >
            Matched
          </Badge>
          <Badge 
            variant={filteredStatus === "unmatched" ? "default" : "outline"} 
            className="cursor-pointer"
            onClick={() => handleFilterClick("unmatched")}
          >
            Unmatched
          </Badge>
          <Badge 
            variant={filteredStatus === "partially_matched" ? "default" : "outline"} 
            className="cursor-pointer"
            onClick={() => handleFilterClick("partially_matched")}
          >
            Partially Matched
          </Badge>
          <Badge 
            variant={filteredStatus === "reconciled" ? "default" : "outline"} 
            className="cursor-pointer"
            onClick={() => handleFilterClick("reconciled")}
          >
            Reconciled
          </Badge>
          <Badge 
            variant={filteredStatus === "exception" ? "default" : "outline"} 
            className="cursor-pointer"
            onClick={() => handleFilterClick("exception")}
          >
            Exception
          </Badge>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">Filter by source:</span>
          <Badge 
            variant={filteredSource === "website" ? "default" : "outline"} 
            className="cursor-pointer"
            onClick={() => handleSourceFilterClick("website")}
          >
            Website
          </Badge>
          <Badge 
            variant={filteredSource === "cash_wallet" ? "default" : "outline"} 
            className="cursor-pointer"
            onClick={() => handleSourceFilterClick("cash_wallet")}
          >
            Cash Wallet
          </Badge>
          <Badge 
            variant={filteredSource === "marketplace" ? "default" : "outline"} 
            className="cursor-pointer"
            onClick={() => handleSourceFilterClick("marketplace")}
          >
            Marketplace
          </Badge>
        </div>
      </div>

      <div className="rounded-md border mt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>GEM ID</TableHead>
              <TableHead>Vendor ID</TableHead>
              <TableHead>PO Code</TableHead>
              <TableHead>DDA Code</TableHead>
              <TableHead>Challan #</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Payment Method</TableHead>
              <TableHead>Reference</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="font-medium">{transaction.orderId}</TableCell>
                <TableCell>{transaction.gemId || "-"}</TableCell>
                <TableCell>{transaction.vendorId || "-"}</TableCell>
                <TableCell>{transaction.poCode || "-"}</TableCell>
                <TableCell>{transaction.ddaCode || "-"}</TableCell>
                <TableCell>{transaction.challanNumber}</TableCell>
                <TableCell>{formatDate(transaction.date)}</TableCell>
                <TableCell>{transaction.customerName}</TableCell>
                <TableCell className="text-right">
                  {formatCurrency(transaction.amount)}
                  {transaction.discrepancy && (
                    <span className="block text-xs text-red-500">
                      Discrepancy: {formatCurrency(transaction.discrepancy)}
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="capitalize">
                    {transaction.paymentMethod.replace("_", " ")}
                  </Badge>
                </TableCell>
                <TableCell>
                  {transaction.bankReference || transaction.paymentReference || "-"}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="capitalize">
                    {transaction.source || "unknown"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <ReconciliationStatus status={transaction.status} />
                </TableCell>
                <TableCell className="text-right">
                  {transaction.status !== "reconciled" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onReconcile && onReconcile(transaction.id)}
                    >
                      {transaction.status === "matched" ? "Reconcile" : "Match"}
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TransactionTable;
