
import { TransactionStatus } from "@/types";

interface ReconciliationStatusProps {
  status: TransactionStatus;
}

export const ReconciliationStatus = ({ status }: ReconciliationStatusProps) => {
  let bgColor: string;
  let textColor: string;
  let label: string;

  switch (status) {
    case "matched":
      bgColor = "bg-blue-100";
      textColor = "text-blue-800";
      label = "Matched";
      break;
    case "unmatched":
      bgColor = "bg-amber-100";
      textColor = "text-amber-800";
      label = "Unmatched";
      break;
    case "partially_matched":
      bgColor = "bg-purple-100";
      textColor = "text-purple-800";
      label = "Partially Matched";
      break;
    case "reconciled":
      bgColor = "bg-green-100";
      textColor = "text-green-800";
      label = "Reconciled";
      break;
    case "exception":
      bgColor = "bg-red-100";
      textColor = "text-red-800";
      label = "Exception";
      break;
    default:
      bgColor = "bg-gray-100";
      textColor = "text-gray-800";
      label = status;
  }

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${bgColor} ${textColor}`}
    >
      {label}
    </span>
  );
};
