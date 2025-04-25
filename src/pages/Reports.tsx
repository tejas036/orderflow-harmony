import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

const Reports = () => {
  // Dummy data for the pie charts
  const statusData = [
    { name: "Reconciled", value: 42, color: "#10b981" },
    { name: "Matched", value: 18, color: "#3b82f6" },
    { name: "Unmatched", value: 12, color: "#f59e0b" },
    { name: "Exceptions", value: 5, color: "#ef4444" },
  ];

  const methodData = [
    { name: "Bank Deposit", value: 32, color: "#8b5cf6" },
    { name: "Online Payment", value: 24, color: "#3b82f6" },
    { name: "UPI", value: 12, color: "#06b6d4" },
    { name: "Credit Card", value: 8, color: "#f43f5e" },
    { name: "Wallet", value: 6, color: "#14b8a6" },
    { name: "PFMS", value: 5, color: "#0ea5e9" },
    { name: "Cash Wallet", value: 4, color: "#8bc34a" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Reconciliation Reports</h1>
          <div className="flex items-center space-x-4">
            <Select defaultValue="month">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Last 7 Days</SelectItem>
                <SelectItem value="month">Last 30 Days</SelectItem>
                <SelectItem value="quarter">Last Quarter</SelectItem>
                <SelectItem value="year">Last Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">Export</Button>
          </div>
        </div>

        <Tabs defaultValue="summary" className="mb-6">
          <TabsList>
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="detailed">Detailed</TabsTrigger>
            <TabsTrigger value="custom">Custom Reports</TabsTrigger>
            <TabsTrigger value="cash-wallet">Cash Wallet</TabsTrigger>
          </TabsList>
          
          <TabsContent value="summary">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Value Reconciled
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹4,25,780.50</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    +12% from previous period
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Pending Reconciliation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹58,250.25</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    -8% from previous period
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Exceptions Value
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹12,375.00</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    +4% from previous period
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Reconciliation Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">86%</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    +2% from previous period
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Transactions by Status</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={statusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {statusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Transactions by Payment Method</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={methodData}
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {methodData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="detailed">
            <Card>
              <CardHeader>
                <CardTitle>Detailed Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="rounded-md border p-4 hover:bg-gray-50 cursor-pointer">
                    <h3 className="font-medium">Daily Reconciliation Summary</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Detailed day-by-day report of all reconciliation activities
                    </p>
                    <div className="flex justify-end mt-2">
                      <Button variant="outline" size="sm">Generate</Button>
                    </div>
                  </div>
                  
                  <div className="rounded-md border p-4 hover:bg-gray-50 cursor-pointer">
                    <h3 className="font-medium">Unmatched Transactions</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      List of all transactions that have not been matched or reconciled
                    </p>
                    <div className="flex justify-end mt-2">
                      <Button variant="outline" size="sm">Generate</Button>
                    </div>
                  </div>
                  
                  <div className="rounded-md border p-4 hover:bg-gray-50 cursor-pointer">
                    <h3 className="font-medium">Exception Report</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Detailed analysis of all transactions marked as exceptions
                    </p>
                    <div className="flex justify-end mt-2">
                      <Button variant="outline" size="sm">Generate</Button>
                    </div>
                  </div>
                  
                  <div className="rounded-md border p-4 hover:bg-gray-50 cursor-pointer">
                    <h3 className="font-medium">Payment Method Analysis</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Breakdown of transactions by payment methods with reconciliation status
                    </p>
                    <div className="flex justify-end mt-2">
                      <Button variant="outline" size="sm">Generate</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="custom">
            <Card>
              <CardHeader>
                <CardTitle>Create Custom Report</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-gray-500">
                    Design your own report by selecting the data points, filters, and format you need.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Report Name</label>
                      <input
                        type="text"
                        className="w-full rounded-md border border-gray-300 p-2"
                        placeholder="Enter report name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Date Range</label>
                      <Select defaultValue="30days">
                        <SelectTrigger>
                          <SelectValue placeholder="Select date range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="7days">Last 7 Days</SelectItem>
                          <SelectItem value="30days">Last 30 Days</SelectItem>
                          <SelectItem value="90days">Last 90 Days</SelectItem>
                          <SelectItem value="custom">Custom Range</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Include Data</label>
                    <div className="grid grid-cols-2 gap-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" defaultChecked />
                        Transaction Details
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" defaultChecked />
                        Payment Methods
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" defaultChecked />
                        Reconciliation Status
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        Customer Information
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        Discrepancy Analysis
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        Charts and Graphs
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Format</label>
                    <div className="flex space-x-4">
                      <label className="flex items-center">
                        <input type="radio" name="format" className="mr-2" defaultChecked />
                        PDF
                      </label>
                      <label className="flex items-center">
                        <input type="radio" name="format" className="mr-2" />
                        Excel
                      </label>
                      <label className="flex items-center">
                        <input type="radio" name="format" className="mr-2" />
                        CSV
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex justify-end pt-4">
                    <Button variant="outline" className="mr-2">Save Template</Button>
                    <Button>Generate Report</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="cash-wallet">
            <Card>
              <CardHeader>
                <CardTitle>Cash Wallet Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="rounded-md border p-4 hover:bg-gray-50 cursor-pointer">
                    <h3 className="font-medium">Prefunded Deposits Report</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Track all prefunded deposits made to the cash wallet
                    </p>
                    <div className="flex justify-end mt-2">
                      <Button variant="outline" size="sm">Generate</Button>
                    </div>
                  </div>
                  
                  <div className="rounded-md border p-4 hover:bg-gray-50 cursor-pointer">
                    <h3 className="font-medium">Cash Collections Report</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Details of all cash collections with customer information
                    </p>
                    <div className="flex justify-end mt-2">
                      <Button variant="outline" size="sm">Generate</Button>
                    </div>
                  </div>
                  
                  <div className="rounded-md border p-4 hover:bg-gray-50 cursor-pointer">
                    <h3 className="font-medium">QR Payment Collections</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      All payments collected via dynamic QR codes
                    </p>
                    <div className="flex justify-end mt-2">
                      <Button variant="outline" size="sm">Generate</Button>
                    </div>
                  </div>
                  
                  <div className="rounded-md border p-4 hover:bg-gray-50 cursor-pointer">
                    <h3 className="font-medium">Cash Wallet Balance History</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Track cash wallet balance changes over time
                    </p>
                    <div className="flex justify-end mt-2">
                      <Button variant="outline" size="sm">Generate</Button>
                    </div>
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

export default Reports;
