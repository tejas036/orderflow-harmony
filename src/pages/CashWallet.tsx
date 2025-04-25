
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CashWalletSummaryCards from "@/components/CashWallet/CashWalletSummaryCards";
import CashWalletTransactionTable from "@/components/CashWallet/CashWalletTransactionTable";
import CashWalletDepositForm from "@/components/CashWallet/CashWalletDepositForm";
import CashCollectionForm from "@/components/CashWallet/CashCollectionForm";
import QRCollectionForm from "@/components/CashWallet/QRCollectionForm";
import { cashWalletTransactions, cashWalletSummary } from "@/utils/demoData";
import { useToast } from "@/components/ui/use-toast";

const CashWallet = () => {
  const { toast } = useToast();
  const [transactions, setTransactions] = useState(cashWalletTransactions);
  const [summary, setSummary] = useState(cashWalletSummary);
  const [depositDate, setDepositDate] = useState("");
  const [depositAmount, setDepositAmount] = useState("");
  const [bankBranch, setBankBranch] = useState("");

  const handleAddDeposit = (formData: {
    date: string;
    amount: string;
    bankBranch: string;
  }) => {
    // In a real app, this would call an API to add the deposit
    const newDeposit = {
      id: `cw-${Math.random().toString(36).substring(2, 10)}`,
      date: formData.date,
      type: "deposit" as const,
      amount: parseFloat(formData.amount),
      reference: `DEP-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      bankBranch: formData.bankBranch
    };

    setTransactions([newDeposit, ...transactions]);

    // Update summary
    const newBalance = summary.balance + parseFloat(formData.amount);
    setSummary({
      ...summary,
      lastDepositDate: formData.date,
      lastDepositAmount: parseFloat(formData.amount),
      balance: newBalance,
    });

    toast({
      title: "Deposit Added",
      description: `₹${parseFloat(formData.amount).toLocaleString('en-IN')} has been added to your cash wallet.`,
    });
  };

  const handleAddCollection = (formData: {
    amount: string;
    customerName: string;
    challanNumber: string;
  }) => {
    // In a real app, this would call an API to add the collection
    const newCollection = {
      id: `cw-${Math.random().toString(36).substring(2, 10)}`,
      date: new Date().toISOString().slice(0, 10),
      type: "collection" as const,
      amount: parseFloat(formData.amount),
      customerName: formData.customerName,
      challanNumber: formData.challanNumber,
    };

    setTransactions([newCollection, ...transactions]);

    // Update summary
    const newTotalCollection = summary.totalCollectionSinceDeposit + parseFloat(formData.amount);
    const newBalance = summary.balance - parseFloat(formData.amount);
    setSummary({
      ...summary,
      totalCollectionSinceDeposit: newTotalCollection,
      balance: newBalance,
    });

    toast({
      title: "Collection Recorded",
      description: `₹${parseFloat(formData.amount).toLocaleString('en-IN')} collected from ${formData.customerName}.`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Cash Wallet</h1>
          <div className="flex space-x-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button>Log Deposit</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Log Pre-funded Deposit</DialogTitle>
                </DialogHeader>
                <CashWalletDepositForm onSubmit={handleAddDeposit} />
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Export Report</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Export Cash Wallet Report</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Start Date</Label>
                      <Input type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label>End Date</Label>
                      <Input type="date" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Report Type</Label>
                    <select className="w-full p-2 border rounded">
                      <option>All Transactions</option>
                      <option>Deposits Only</option>
                      <option>Collections Only</option>
                    </select>
                  </div>
                  <div className="flex justify-end">
                    <Button>Generate Report</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <CashWalletSummaryCards summary={summary} />

        <Tabs defaultValue="transactions" className="mt-6">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="cash-collection">Cash Collection</TabsTrigger>
            <TabsTrigger value="qr-collection">QR Collection</TabsTrigger>
          </TabsList>

          <TabsContent value="transactions">
            <Card>
              <CardHeader>
                <CardTitle>Cash Wallet Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <CashWalletTransactionTable transactions={transactions} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cash-collection">
            <Card>
              <CardHeader>
                <CardTitle>Collect Cash Payment</CardTitle>
              </CardHeader>
              <CardContent>
                <CashCollectionForm onSubmit={handleAddCollection} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="qr-collection">
            <Card>
              <CardHeader>
                <CardTitle>Collect via QR Code</CardTitle>
              </CardHeader>
              <CardContent>
                <QRCollectionForm />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default CashWallet;
