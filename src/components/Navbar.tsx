
import { Link } from "react-router-dom";
import { Wallet } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-slate-900 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-8 w-8 mr-2 text-blue-500"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 9H21M7 15H17M12 3V21M5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <span className="font-bold text-xl">OrderFlow Harmony</span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <Link to="/" className="px-3 py-2 rounded-md font-medium hover:bg-slate-800">
                Dashboard
              </Link>
              <Link to="/transactions" className="px-3 py-2 rounded-md font-medium hover:bg-slate-800">
                Transactions
              </Link>
              <Link to="/bank-reconciliation" className="px-3 py-2 rounded-md font-medium hover:bg-slate-800">
                Bank Reconciliation
              </Link>
              <Link to="/reports" className="px-3 py-2 rounded-md font-medium hover:bg-slate-800">
                Reports
              </Link>
              <Link to="/payment-collection" className="px-3 py-2 rounded-md font-medium hover:bg-slate-800">
                Counter Sale
              </Link>
              <Link to="/bank-payment" className="px-3 py-2 rounded-md font-medium hover:bg-slate-800">
                Online Payments
              </Link>
              <Link to="/cash-wallet" className="px-3 py-2 rounded-md font-medium hover:bg-slate-800 flex items-center">
                <Wallet className="h-4 w-4 mr-1" />
                Cash Wallet
              </Link>
            </div>
          </div>
          
          <div className="hidden md:block">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
              Reconcile Now
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
