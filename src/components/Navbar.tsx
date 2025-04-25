
import { Link } from "react-router-dom";
import { Wallet } from "lucide-react";
import logo from "../../src/assets/logo.jpg";

const Navbar = () => {
  return (
    <nav className="bg-slate-900 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img
                src={logo}
                alt="Logo"
                className="h-8 w-8 mr-2"
              />
              <span className="font-bold text-xl">MIB, Central Govt
              </span>
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
