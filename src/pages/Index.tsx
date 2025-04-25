
import { useState } from "react";
import Navbar from "@/components/Navbar";
import ReconciliationMetrics from "@/components/Dashboard/ReconciliationMetrics";
import ReconciliationChart from "@/components/Dashboard/ReconciliationChart";
import TransactionTable from "@/components/Transactions/TransactionTable";
import { transactions, reconciliationSummary, reconciliationTrend } from "@/utils/demoData";

const Index = () => {
  const [recentTransactions] = useState(transactions.slice(0, 5));

  // This would typically connect to an API to perform the reconciliation
  const handleReconcile = (id: string) => {
    console.log(`Reconciling transaction: ${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Reconciliation Dashboard</h1>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Last updated: Today, 10:45 AM</span>
            <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M21 2v6h-6M3 12a9 9 0 0 1 15-6.7L21 8M3 22v-6h6M21 12a9 9 0 0 1-15 6.7L3 16" />
              </svg>
            </button>
          </div>
        </div>

        <ReconciliationMetrics summary={reconciliationSummary} />

        <div className="grid gap-4 mt-6 grid-cols-1">
          <ReconciliationChart data={reconciliationTrend} />
        </div>

        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Recent Transactions</h2>
            <a href="/transactions" className="text-blue-600 hover:underline text-sm">
              View All Transactions →
            </a>
          </div>
          <TransactionTable 
            transactions={recentTransactions} 
            onReconcile={handleReconcile}
          />
        </div>
      </main>
    </div>
  );
};

export default Index;
