
import { useState } from "react";
import Navbar from "@/components/Navbar";
import DepositMatcher from "@/components/BankReconciliation/DepositMatcher";
import { bankDeposits, transactions } from "@/utils/demoData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Transaction } from "@/types";

const BankReconciliation = () => {
  const unmatchedTransactions = transactions.filter(
    (t) => t.status === "unmatched" && t.paymentMethod === "bank_deposit"
  );

  // This would typically connect to an API to perform the matching
  const handleMatch = (depositId: string, transactionIds: string[]) => {
    console.log(`Matching deposit ${depositId} with transactions:`, transactionIds);
  };

  // This would typically upload a bank statement to the API for processing
  const handleStatementUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Uploading bank statement:", file.name);
      // API call would go here
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Bank Reconciliation</h1>
        </div>

        <Tabs defaultValue="matcher">
          <TabsList className="mb-4">
            <TabsTrigger value="matcher">Deposit Matcher</TabsTrigger>
            <TabsTrigger value="statements">Bank Statements</TabsTrigger>
            <TabsTrigger value="rules">Matching Rules</TabsTrigger>
          </TabsList>

          <TabsContent value="matcher">
            <DepositMatcher
              bankDeposits={bankDeposits}
              unmatchedTransactions={unmatchedTransactions}
              onMatch={handleMatch}
            />
          </TabsContent>

          <TabsContent value="statements">
            <Card>
              <CardHeader>
                <CardTitle>Upload Bank Statement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Upload your bank statement in CSV, XLS, or PDF format. We'll automatically process
                    and match transactions.
                  </p>
                  <div className="flex items-center gap-4">
                    <input
                      type="file"
                      id="statement-upload"
                      className="hidden"
                      accept=".csv,.xls,.xlsx,.pdf"
                      onChange={handleStatementUpload}
                    />
                    <Button asChild>
                      <label htmlFor="statement-upload">Select Statement File</label>
                    </Button>
                    <span id="file-name" className="text-sm text-gray-500">
                      No file selected
                    </span>
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="font-medium mb-2">Previously Uploaded Statements</h3>
                    <div className="rounded-md border">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Filename
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Upload Date
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          <tr>
                            <td className="px-4 py-3 whitespace-nowrap">statement-apr-2024.csv</td>
                            <td className="px-4 py-3 whitespace-nowrap">April 20, 2024</td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                Processed
                              </span>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                              <a href="#" className="text-blue-600 hover:underline">View</a>
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 whitespace-nowrap">statement-mar-2024.xlsx</td>
                            <td className="px-4 py-3 whitespace-nowrap">March 15, 2024</td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                Processed
                              </span>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                              <a href="#" className="text-blue-600 hover:underline">View</a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rules">
            <Card>
              <CardHeader>
                <CardTitle>Automatic Matching Rules</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Configure rules to automatically match bank deposits with transactions.
                </p>
                
                <div className="space-y-4">
                  <div className="rounded-md border p-4">
                    <h3 className="font-medium mb-2">Rule #1: Amount Match</h3>
                    <p className="text-sm text-gray-500">
                      When bank deposit amount exactly matches a transaction amount within 3 days, automatically match them.
                    </p>
                    <div className="flex justify-end mt-2">
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                  </div>
                  
                  <div className="rounded-md border p-4">
                    <h3 className="font-medium mb-2">Rule #2: Reference Number</h3>
                    <p className="text-sm text-gray-500">
                      When bank reference number contains an order ID, automatically match with corresponding transaction.
                    </p>
                    <div className="flex justify-end mt-2">
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-4">
                    <Button>Add New Rule</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default BankReconciliation;
