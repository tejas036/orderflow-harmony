
export type TransactionStatus = 
  | "matched" 
  | "unmatched" 
  | "partially_matched" 
  | "reconciled" 
  | "exception";

export type PaymentMethod = 
  | "bank_deposit" 
  | "online_payment" 
  | "credit_card" 
  | "upi" 
  | "wallet"
  | "pfms"
  | "cash_wallet";

export type PaymentSource = 
  | "amazon"
  | "flipkart"
  | "kindle"
  | "google"
  | "direct"
  | "dpd_website"
  | "en_website";

export interface Transaction {
  id: string;
  orderId: string;
  gemId?: string;
  vendorId?: string;
  challanNumber: string;
  date: string;
  amount: number;
  paymentMethod: PaymentMethod;
  status: TransactionStatus;
  customerName: string;
  bankReference?: string;
  paymentReference?: string;
  source: PaymentSource;
  matchedWith?: string[];
  discrepancy?: number;
  poCode?: string;  // New field for PO code
  ddaCode?: string; // New field for DDA code
}

export interface BankDeposit {
  id: string;
  reference: string;
  date: string;
  amount: number;
  accountNumber: string;
  bankName: string;
  status: TransactionStatus;
  matchedWith?: string[];
}

export interface OnlinePayment {
  id: string;
  reference: string;
  date: string;
  amount: number;
  gateway: string;
  status: TransactionStatus;
  matchedWith?: string[];
}

export interface ReconciliationSummary {
  totalTransactions: number;
  matchedTransactions: number;
  unmatchedTransactions: number;
  partiallyMatchedTransactions: number;
  reconciledTransactions: number;
  exceptions: number;
  totalValue: number;
  unmatchedValue: number;
  discrepancyValue: number;
}

export interface ReconciliationTrend {
  date: string;
  matched: number;
  unmatched: number;
  exceptions: number;
}

export interface CashWalletTransaction {
  id: string;
  date: string;
  type: "deposit" | "collection";
  amount: number;
  reference?: string;
  bankBranch?: string;
  customerName?: string;
  challanNumber?: string;
}

export interface CashWalletSummary {
  lastDepositDate: string;
  lastDepositAmount: number;
  totalCollectionSinceDeposit: number;
  balance: number;
}
