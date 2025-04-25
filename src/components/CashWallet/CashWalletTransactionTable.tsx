
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CashWalletTransaction } from "@/types";

interface CashWalletTransactionTableProps {
  transactions: CashWalletTransaction[];
}

const CashWalletTransactionTable = ({
  transactions,
}: CashWalletTransactionTableProps) => {
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

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Reference/Customer</TableHead>
            <TableHead>Bank Branch/Challan</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{formatDate(transaction.date)}</TableCell>
              <TableCell>
                <Badge
                  variant={transaction.type === "deposit" ? "outline" : "secondary"}
                  className="capitalize"
                >
                  {transaction.type}
                </Badge>
              </TableCell>
              <TableCell className="font-medium">
                {formatCurrency(transaction.amount)}
              </TableCell>
              <TableCell>
                {transaction.type === "deposit"
                  ? transaction.reference
                  : transaction.customerName}
              </TableCell>
              <TableCell>
                {transaction.type === "deposit"
                  ? transaction.bankBranch
                  : transaction.challanNumber}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CashWalletTransactionTable;
