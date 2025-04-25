
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { ReconciliationSummary } from "@/types";

interface ReconciliationMetricsProps {
  summary: ReconciliationSummary;
}

const ReconciliationMetrics = ({ summary }: ReconciliationMetricsProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2
    }).format(amount);
  };

  const getMatchPercentage = () => {
    if (summary.totalTransactions === 0) return 0;
    const matched = summary.matchedTransactions + summary.reconciledTransactions;
    return Math.round((matched / summary.totalTransactions) * 100);
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Match Rate
          </CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{getMatchPercentage()}%</div>
          <p className="text-xs text-muted-foreground">
            {summary.matchedTransactions + summary.reconciledTransactions} out of {summary.totalTransactions} transactions matched
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Unmatched Transactions
          </CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2m5.66 0H14a2 2 0 0 1 2 2v3.34" />
            <path d="M14 3v4a1 1 0 0 0 1 1h4" />
            <path d="M21 16v5a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2v-5" />
            <path d="M21 10V8a2 2 0 0 0-2-2h-7a2 2 0 0 0-2 2v2" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{summary.unmatchedTransactions}</div>
          <p className="text-xs text-muted-foreground">
            {formatCurrency(summary.unmatchedValue)} value unmatched
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Exceptions
          </CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{summary.exceptions}</div>
          <p className="text-xs text-muted-foreground">
            Issues requiring manual intervention
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Discrepancy
          </CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${summary.discrepancyValue < 0 ? 'text-red-500' : 'text-green-500'}`}>
            {formatCurrency(Math.abs(summary.discrepancyValue))}
          </div>
          <p className="text-xs text-muted-foreground">
            {summary.discrepancyValue < 0 ? 'Under-reported' : 'Over-reported'}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReconciliationMetrics;
