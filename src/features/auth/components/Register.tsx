import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';

import main from '@/assets/main.jpg';
import { Separator } from '@/components/ui/separator';
import { auth } from '@/firebase/firebase.config';

import { FormSchema } from '../types/formSchema';

import { AuthForm } from './AuthForm';

export const Register = () => {
  const navigate = useNavigate();
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const { email, password } = data;

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success('Registered successfully!');
      navigate('/');
    } catch (err) {
      console.error(err);
      toast.error((err as Error).message);
    }
  }
  return (
    <div className="flex h-screen">
      <div className="hidden h-screen lg:block">
        <img src={main} alt="Placeholder" className="h-full w-full object-cover" />
      </div>
      <div className="w-full p-8 sm:p-20 md:p-52 lg:w-1/2 lg:p-36">
        <h1 className="mb-10 text-center text-6xl font-bold">Sign up</h1>
        <AuthForm onSubmit={onSubmit} buttonText="Sign up" formDescription="Create a unique one" />
        <div className="mt-10 text-center text-gray-500">
          <Separator className="mb-4" />
          <span>Already have an account? </span>
          <Link to="/" className="font-bold text-violet-500 hover:underline">
            Log in here
          </Link>
        </div>
      </div>
    </div>
  );
};
