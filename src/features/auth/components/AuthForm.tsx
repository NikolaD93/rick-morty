import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { formData } from '../types/formData';
import { FormSchema } from '../types/formSchema';

type AuthFormProps = {
  onSubmit: (data: z.infer<typeof FormSchema>) => void;
  buttonText: string;
  formDescription?: string;
};

export const AuthForm = ({ onSubmit, buttonText, formDescription }: AuthFormProps) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: formData,
  });

  return (
    <div>
      {' '}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="rick@morty.com" {...field} />
                </FormControl>
                <FormDescription>{formDescription}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="******" {...field} />
                </FormControl>
                <FormDescription>{formDescription}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {form.formState.isSubmitting ? (
            <Button className="mx-auto w-full" disabled>
              <Loader2 className="animate-spin" />
              Please wait{' '}
            </Button>
          ) : (
            <Button disabled={!form.formState.isDirty} className="mx-auto w-full" type="submit">
              {buttonText}
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
};
