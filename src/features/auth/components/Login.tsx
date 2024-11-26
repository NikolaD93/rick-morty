import { signInWithEmailAndPassword } from 'firebase/auth';
import { useContext } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';

import main from '@/assets/main.jpg';
import { Separator } from '@/components/ui/separator';
import { AuthContext } from '@/contexts/AuthContext';
import { doSignInWithEmailAndPassword } from '@/firebase/auth';
//! should've used this
import { auth } from '@/firebase/firebase.config';

import { FormSchema } from '../types/formSchema';

import { AuthForm } from './AuthForm';

export const Login = () => {
  const { login, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  if (currentUser) {
    return <Navigate to="/characters" />;
  }

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const { email, password } = data;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      toast.success('Logged in successfully!');
      login(user);
      navigate('/characters');
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
        <h1 className="mb-10 text-center text-6xl font-bold">Welcome back</h1>
        <AuthForm onSubmit={onSubmit} buttonText="Login" />
        <div className="mt-10 text-center text-gray-500">
          <Separator className="mb-4" />
          <span>Don't have an account? </span>
          <Link to="/register" className="font-bold text-violet-500 hover:underline">
            Sign up here
          </Link>
        </div>
      </div>
    </div>
  );
};
