
import { useState } from "react";
import Navbar from "@/components/Navbar";
import TransactionTable from "@/components/Transactions/TransactionTable";
import { transactions } from "@/utils/demoData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Globe, Link } from "lucide-react";
import { PaymentSource } from "@/types";

const Transactions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState<string>("all_dates");
  const [methodFilter, setMethodFilter] = useState<string>("all_methods");
  const [sourceFilter, setSourceFilter] = useState<PaymentSource | "all">('all');

  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch =
      searchTerm === "" ||
      tx.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.challanNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.customerName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDate = dateFilter === "all_dates" || tx.date === dateFilter;

    const matchesMethod =
      methodFilter === "all_methods" || tx.paymentMethod === methodFilter;

    const matchesSource = 
      sourceFilter === "all" || tx.source === sourceFilter;

    return matchesSearch && matchesDate && matchesMethod && matchesSource;
  });

  const getSourceIcon = (source: PaymentSource) => {
    switch (source) {
      case "amazon":
        return <Globe className="h-4 w-4" />;
      case "flipkart":
        return <Globe className="h-4 w-4" />;
      case "kindle":
        return <Globe className="h-4 w-4" />;
      case "google":
        return <Globe className="h-4 w-4" />;
      case "dpd_website":
        return <Link className="h-4 w-4" />;
      case "en_website":
        return <Link className="h-4 w-4" />;
      default:
        return <Globe className="h-4 w-4" />;
    }
  };

  const handleReconcile = (id: string) => {
    console.log(`Reconciling transaction: ${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Transactions</h1>
          <div className="flex items-center space-x-4">
            <Button variant="outline">Export</Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Import Challans</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Import Challans</DialogTitle>
                  <DialogDescription>
                    Upload a CSV file containing challan data for bulk import.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Input id="file" type="file" className="col-span-4" />
                  </div>
                  <div className="flex justify-end">
                    <Button>Upload</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Search & Filter</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="col-span-2">
                <Input
                  placeholder="Search by Order ID, Challan or Customer..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div>
                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all_dates">All Dates</SelectItem>
                    <SelectItem value="2024-04-21">April 21, 2024</SelectItem>
                    <SelectItem value="2024-04-20">April 20, 2024</SelectItem>
                    <SelectItem value="2024-04-19">April 19, 2024</SelectItem>
                    <SelectItem value="2024-04-18">April 18, 2024</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select value={methodFilter} onValueChange={setMethodFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all_methods">All Methods</SelectItem>
                    <SelectItem value="bank_deposit">Bank Deposit</SelectItem>
                    <SelectItem value="online_payment">Online Payment</SelectItem>
                    <SelectItem value="credit_card">Credit Card</SelectItem>
                    <SelectItem value="upi">UPI</SelectItem>
                    <SelectItem value="wallet">Wallet</SelectItem>
                    <SelectItem value="pfms">PFMS</SelectItem>
                    <SelectItem value="cash_wallet">Cash Wallet</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select value={sourceFilter} onValueChange={(value: PaymentSource | "all") => setSourceFilter(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sources</SelectItem>
                    <SelectItem value="amazon">
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        Amazon
                      </div>
                    </SelectItem>
                    <SelectItem value="flipkart">
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        Flipkart
                      </div>
                    </SelectItem>
                    <SelectItem value="kindle">
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        Kindle
                      </div>
                    </SelectItem>
                    <SelectItem value="google">
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        Google
                      </div>
                    </SelectItem>
                    <SelectItem value="dpd_website">
                      <div className="flex items-center gap-2">
                        <Link className="h-4 w-4" />
                        DPD Website
                      </div>
                    </SelectItem>
                    <SelectItem value="en_website">
                      <div className="flex items-center gap-2">
                        <Link className="h-4 w-4" />
                        EN Website
                      </div>
                    </SelectItem>
                    <SelectItem value="direct">Direct</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <TransactionTable
          transactions={filteredTransactions}
          onReconcile={handleReconcile}
        />
      </main>
    </div>
  );
};

export default Transactions;
