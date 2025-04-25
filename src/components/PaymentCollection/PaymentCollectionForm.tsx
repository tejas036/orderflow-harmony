
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

const formSchema = z.object({
  payerName: z.string().min(2, "Payer name must be at least 2 characters"),
  amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Amount must be a positive number",
  }),
  mobileNumber: z.string().min(10, "Mobile number must be at least 10 digits"),
  reference: z.string().min(3, "Reference must be at least 3 characters"),
});

type FormData = z.infer<typeof formSchema>;

interface PaymentCollectionFormProps {
  onSubmit: (data: FormData) => void;
}

export function PaymentCollectionForm({ onSubmit }: PaymentCollectionFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      payerName: "",
      amount: "",
      mobileNumber: "",
      reference: "",
    },
  });

  const handleSubmit = (data: FormData) => {
    onSubmit(data);
    toast.success("Payment details captured successfully");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="payerName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payer Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter payer name" {...field} />
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
                <Input
                  type="number"
                  placeholder="Enter amount"
                  {...field}
                />
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
                <Input
                  type="tel"
                  placeholder="Enter mobile number"
                  {...field}
                />
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
                <Input placeholder="Enter reference" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">Generate QR Code</Button>
      </form>
    </Form>
  );
}
