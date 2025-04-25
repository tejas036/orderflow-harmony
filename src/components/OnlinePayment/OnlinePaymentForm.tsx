
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import { CreditCard, QrCode } from "lucide-react";

const formSchema = z.object({
  payerName: z.string().min(2, "Name must be at least 2 characters"),
  amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Amount must be a positive number",
  }),
  mobileNumber: z.string().min(10, "Mobile number must be at least 10 digits"),
  reference: z.string().min(3, "Reference must be at least 3 characters"),
  purpose: z.string().min(1, "Purpose is required"),
});

type FormData = z.infer<typeof formSchema>;

interface OnlinePaymentFormProps {
  initialData: FormData;
  onSubmit: (data: FormData) => void;
  onGatewayPayment: () => void;
  onQRPayment: () => void;
}

export function OnlinePaymentForm({ 
  initialData, 
  onSubmit, 
  onGatewayPayment, 
  onQRPayment 
}: OnlinePaymentFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const handleSubmit = (data: FormData) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="payerName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Customer Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="mobileNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mobile Number</FormLabel>
              <FormControl>
                <Input type="tel" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="reference"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reference</FormLabel>
              <FormControl>
                <Input {...field} readOnly />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="purpose"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payment Purpose</FormLabel>
              <FormControl>
                <Input {...field} readOnly />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button 
            type="button" 
            onClick={() => {
              form.handleSubmit(data => {
                onSubmit(data);
                onGatewayPayment();
              })();
            }}
            className="flex items-center justify-center gap-2"
          >
            <CreditCard className="h-4 w-4" />
            Online Payment Gateway
          </Button>
          
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => {
              form.handleSubmit(data => {
                onSubmit(data);
                onQRPayment();
              })();
            }}
            className="flex items-center justify-center gap-2"
          >
            <QrCode className="h-4 w-4" />
            Via QR Code
          </Button>
        </div>
      </form>
    </Form>
  );
}
