import { 
  Transaction, 
  BankDeposit, 
  OnlinePayment, 
  ReconciliationSummary,
  ReconciliationTrend,
  CashWalletTransaction,
  CashWalletSummary 
} from "@/types";

// Helper for generating random IDs
const generateId = () => Math.random().toString(36).substring(2, 10);

// Demo Transactions
export const transactions: Transaction[] = [
  {
    id: "tx-" + generateId(),
    orderId: "ORD-20240421-001",
    gemId: "GEM-001",
    vendorId: "VND-123",
    challanNumber: "CH001245",
    date: "2024-04-21",
    amount: 15725.50,
    paymentMethod: "bank_deposit",
    status: "matched",
    customerName: "Acme Corp",
    bankReference: "ACMEBK00123",
    source: "amazon",
    matchedWith: ["bd-abcdef12"],
    poCode: "PO47893",
    ddaCode: "DDA78521"
  },
  {
    id: "tx-" + generateId(),
    orderId: "ORD-20240421-002",
    gemId: "GEM-002",
    vendorId: "VND-456",
    challanNumber: "CH001246",
    date: "2024-04-21",
    amount: 8250.75,
    paymentMethod: "online_payment",
    status: "reconciled",
    customerName: "TechSolutions Inc",
    paymentReference: "PAY-12345678",
    source: "flipkart",
    matchedWith: ["op-abcd1234"],
    poCode: "PO32156",
    ddaCode: "DDA41278"
  },
  {
    id: "tx-" + generateId(),
    orderId: "ORD-20240420-015",
    challanNumber: "CH001230",
    date: "2024-04-20",
    amount: 32500.00,
    paymentMethod: "bank_deposit",
    status: "unmatched",
    customerName: "Global Industries Ltd",
    source: "kindle",
    poCode: "PO98752",
    ddaCode: "DDA14569"
  },
  {
    id: "tx-" + generateId(),
    orderId: "ORD-20240420-016",
    challanNumber: "CH001231",
    date: "2024-04-20",
    amount: 9750.25,
    paymentMethod: "upi",
    status: "partially_matched",
    customerName: "Innovate Systems",
    paymentReference: "UPI-987654321",
    source: "direct",
    matchedWith: ["op-efgh5678"],
    discrepancy: -250.25,
    poCode: "PO12345",
    ddaCode: "DDA56789"
  },
  {
    id: "tx-" + generateId(),
    orderId: "ORD-20240419-008",
    challanNumber: "CH001215",
    date: "2024-04-19",
    amount: 5125.00,
    paymentMethod: "credit_card",
    status: "exception",
    customerName: "Prime Enterprises",
    paymentReference: "CC-TX-789012",
    source: "direct",
    poCode: "PO78945",
    ddaCode: "DDA36925"
  },
  {
    id: "tx-" + generateId(),
    orderId: "ORD-20240419-009",
    challanNumber: "CH001216",
    date: "2024-04-19",
    amount: 18750.50,
    paymentMethod: "bank_deposit",
    status: "matched",
    customerName: "Stellar Group",
    bankReference: "STLBNK00456",
    source: "dpd_website",
    matchedWith: ["bd-ghijk789"],
    poCode: "PO45678",
    ddaCode: "DDA14785"
  },
  {
    id: "tx-" + generateId(),
    orderId: "ORD-20240418-027",
    challanNumber: "CH001200",
    date: "2024-04-18",
    amount: 12350.75,
    paymentMethod: "pfms",
    status: "reconciled",
    customerName: "Quantum Dynamics",
    paymentReference: "PFMS-2468135",
    source: "en_website",
    poCode: "PO36985",
    ddaCode: "DDA25814"
  },
  {
    id: "tx-" + generateId(),
    orderId: "ORD-20240418-028",
    challanNumber: "CH001201",
    date: "2024-04-18",
    amount: 7825.25,
    paymentMethod: "online_payment",
    status: "matched",
    customerName: "Pinnacle Services",
    paymentReference: "PAY-87654321",
    source: "en_website",
    matchedWith: ["op-ijkl9012"],
    poCode: "PO15975",
    ddaCode: "DDA75395"
  },
  {
    id: "tx-" + generateId(),
    orderId: "ORD-20240417-030",
    challanNumber: "CH001195",
    date: "2024-04-17",
    amount: 3500.00,
    paymentMethod: "cash_wallet",
    status: "reconciled",
    customerName: "Local Customer",
    paymentReference: "CASH-123456",
    source: "direct",
    poCode: "PO25896",
    ddaCode: "DDA74125"
  }
];

// Demo Bank Deposits
export const bankDeposits: BankDeposit[] = [
  {
    id: "bd-abcdef12",
    reference: "ACMEBK00123",
    date: "2024-04-21",
    amount: 15725.50,
    accountNumber: "112233445566",
    bankName: "State Bank",
    status: "matched",
    matchedWith: ["tx-" + transactions[0].id]
  },
  {
    id: "bd-ghijk789",
    reference: "STLBNK00456",
    date: "2024-04-19",
    amount: 18750.50,
    accountNumber: "998877665544",
    bankName: "City Bank",
    status: "matched",
    matchedWith: ["tx-" + transactions[5].id]
  },
  {
    id: "bd-" + generateId(),
    reference: "GLBIND00789",
    date: "2024-04-20",
    amount: 32650.00,
    accountNumber: "112233445566",
    bankName: "State Bank",
    status: "unmatched"
  },
  {
    id: "bd-" + generateId(),
    reference: "UNKNOWN-DEPOSIT",
    date: "2024-04-20",
    amount: 7500.00,
    accountNumber: "998877665544",
    bankName: "City Bank",
    status: "unmatched"
  },
  {
    id: "bd-" + generateId(),
    reference: "BATCH-TRANSFER-42",
    date: "2024-04-17",
    amount: 45250.75,
    accountNumber: "112233445566",
    bankName: "State Bank",
    status: "partially_matched"
  }
];

// Demo Online Payments
export const onlinePayments: OnlinePayment[] = [
  {
    id: "op-abcd1234",
    reference: "PAY-12345678",
    date: "2024-04-21",
    amount: 8250.75,
    gateway: "PaySecure",
    status: "reconciled",
    matchedWith: ["tx-" + transactions[1].id]
  },
  {
    id: "op-efgh5678",
    reference: "UPI-987654321",
    date: "2024-04-20",
    amount: 9500.00,
    gateway: "QuickPay UPI",
    status: "partially_matched",
    matchedWith: ["tx-" + transactions[3].id]
  },
  {
    id: "op-ijkl9012",
    reference: "PAY-87654321",
    date: "2024-04-18",
    amount: 7825.25,
    gateway: "PaySecure",
    status: "matched",
    matchedWith: ["tx-" + transactions[7].id]
  },
  {
    id: "op-" + generateId(),
    reference: "WAL-2468135",
    date: "2024-04-18",
    amount: 12350.75,
    gateway: "SuperWallet",
    status: "reconciled",
    matchedWith: ["tx-" + transactions[6].id]
  },
  {
    id: "op-" + generateId(),
    reference: "CC-TX-789012",
    date: "2024-04-19",
    amount: 5000.00,
    gateway: "SecureCards",
    status: "exception",
    matchedWith: ["tx-" + transactions[4].id]
  }
];

// Demo Cash Wallet Transactions
export const cashWalletTransactions: CashWalletTransaction[] = [
  {
    id: "cw-" + generateId(),
    date: "2024-04-15",
    type: "deposit",
    amount: 50000.00,
    reference: "DEP-20240415-001",
    bankBranch: "Central Branch"
  },
  {
    id: "cw-" + generateId(),
    date: "2024-04-16",
    type: "collection",
    amount: 3500.00,
    customerName: "Local Customer",
    challanNumber: "CH001195"
  },
  {
    id: "cw-" + generateId(),
    date: "2024-04-17",
    type: "collection",
    amount: 4200.00,
    customerName: "Walk-in Customer",
    challanNumber: "CH001196"
  },
  {
    id: "cw-" + generateId(),
    date: "2024-04-18",
    type: "collection",
    amount: 2850.00,
    customerName: "Regular Client",
    challanNumber: "CH001197"
  },
  {
    id: "cw-" + generateId(),
    date: "2024-04-22",
    type: "deposit",
    amount: 25000.00,
    reference: "DEP-20240422-002",
    bankBranch: "North Branch"
  }
];

// Cash Wallet Summary
export const cashWalletSummary: CashWalletSummary = {
  lastDepositDate: "2024-04-22",
  lastDepositAmount: 25000.00,
  totalCollectionSinceDeposit: 0.00,
  balance: 64450.00 // Initial deposit + second deposit - all collections
};

// Reconciliation Summary
export const reconciliationSummary: ReconciliationSummary = {
  totalTransactions: transactions.length,
  matchedTransactions: transactions.filter(t => t.status === "matched").length,
  unmatchedTransactions: transactions.filter(t => t.status === "unmatched").length,
  partiallyMatchedTransactions: transactions.filter(t => t.status === "partially_matched").length,
  reconciledTransactions: transactions.filter(t => t.status === "reconciled").length,
  exceptions: transactions.filter(t => t.status === "exception").length,
  totalValue: transactions.reduce((sum, t) => sum + t.amount, 0),
  unmatchedValue: transactions.filter(t => t.status === "unmatched").reduce((sum, t) => sum + t.amount, 0),
  discrepancyValue: transactions
    .filter(t => t.discrepancy)
    .reduce((sum, t) => sum + (t.discrepancy || 0), 0)
};

// Reconciliation Trend (7-day)
export const reconciliationTrend: ReconciliationTrend[] = [
  {
    date: "2024-04-15",
    matched: 12,
    unmatched: 4,
    exceptions: 1
  },
  {
    date: "2024-04-16",
    matched: 15,
    unmatched: 3,
    exceptions: 0
  },
  {
    date: "2024-04-17",
    matched: 10,
    unmatched: 5,
    exceptions: 2
  },
  {
    date: "2024-04-18",
    matched: 18,
    unmatched: 2,
    exceptions: 1
  },
  {
    date: "2024-04-19",
    matched: 14,
    unmatched: 4,
    exceptions: 1
  },
  {
    date: "2024-04-20",
    matched: 16,
    unmatched: 3,
    exceptions: 0
  },
  {
    date: "2024-04-21",
    matched: 13,
    unmatched: 2,
    exceptions: 1
  }
];
