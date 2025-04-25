
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Transactions from "./pages/Transactions";
import BankReconciliation from "./pages/BankReconciliation";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";
import CounterSale from "./pages/CounterSale";
import OnlinePayments from "./pages/OnlinePayments";
import CashWallet from "./pages/CashWallet";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/bank-reconciliation" element={<BankReconciliation />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/payment-collection" element={<CounterSale />} />
          <Route path="/bank-payment" element={<OnlinePayments />} />
          <Route path="/cash-wallet" element={<CashWallet />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
