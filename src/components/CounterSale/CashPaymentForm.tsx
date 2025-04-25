
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle } from "lucide-react";

const formSchema = z.object({
  paymentMode: z.string().min(1, "Please select a payment mode"),
  referenceNumber: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface CashPaymentFormProps {
  paymentData: {
    payerName: string;
    amount: string;
    mobileNumber: string;
    reference: string;
    description?: string;
  };
  onComplete: () => void;
}

export function CashPaymentForm({ paymentData, onComplete }: CashPaymentFormProps) {
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      paymentMode: "",
      referenceNumber: "",
    },
  });

  const handleSubmit = (data: FormData) => {
    console.log("Payment processed:", {
      ...paymentData,
      paymentMode: data.paymentMode,
      referenceNumber: data.referenceNumber,
    });
    
    // Simulate payment processing
    setTimeout(() => {
      setIsSuccess(true);
      toast.success("Payment recorded successfully");
    }, 1000);
  };

  if (isSuccess) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center space-y-6">
        <div className="flex justify-center">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <h2 className="text-xl font-semibold">Payment Successful</h2>
        <p className="text-gray-600">
          The payment of ₹{paymentData.amount} has been recorded successfully.
        </p>
        <Button onClick={onComplete}>Make Another Sale</Button>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6">Cash/Cheque Payment</h2>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-sm text-gray-500">Customer Name</p>
          <p className="font-medium">{paymentData.payerName}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Amount</p>
          <p className="font-medium">₹{paymentData.amount}</p>
        </div>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="paymentMode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Payment Mode</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment mode" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="cheque">Cheque</SelectItem>
                    <SelectItem value="demand_draft">Demand Draft</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="referenceNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reference Number (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Cheque/DD number if applicable" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between pt-4">
            <Button type="button" variant="outline" onClick={onComplete}>
              Cancel
            </Button>
            <Button type="submit">Complete Payment</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
