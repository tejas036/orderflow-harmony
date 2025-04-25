
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CashWalletSummary } from "@/types";
import { Wallet } from "lucide-react";

interface CashWalletSummaryCardsProps {
  summary: CashWalletSummary;
}

const CashWalletSummaryCards = ({ summary }: CashWalletSummaryCardsProps) => {
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
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50">
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-medium">Pre-funded Amount</CardTitle>
          <Wallet className="h-5 w-5 text-blue-700" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-700">
            {formatCurrency(summary.lastDepositAmount)}
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Last deposit on {formatDate(summary.lastDepositDate)}
          </p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-green-50 to-emerald-50">
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-medium">Cash Collected</CardTitle>
          <Wallet className="h-5 w-5 text-green-700" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-700">
            {formatCurrency(summary.totalCollectionSinceDeposit)}
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Since last deposit
          </p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-purple-50 to-violet-50">
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-medium">Balance Remaining</CardTitle>
          <Wallet className="h-5 w-5 text-purple-700" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-purple-700">
            {formatCurrency(summary.balance)}
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Available for collections
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CashWalletSummaryCards;
