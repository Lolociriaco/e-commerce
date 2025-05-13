'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import clsx from 'clsx';
import { IoInformationOutline } from 'react-icons/io5';

export const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    setIsSubmitting(false);

    if (res?.error) {
      setErrorMessage(res.error === 'CredentialsSignin' ? 'CredentialSignIn' : 'Unknown Error');
    } else {
      router.replace('/');
    }
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col">
      <label htmlFor="email">Correo electrónico</label>
      <input
        className="px-5 py-2 border-2 bg-gray-100 rounded-lg mb-5 focus:outline-none focus:border-gray-300"
        type="email"
        name="email"
        required
      />

      <label htmlFor="password">Contraseña</label>
      <input
        className="px-5 py-2 border-2 bg-gray-100 rounded-lg mb-5 focus:outline-none focus:border-gray-300"
        type="password"
        name="password"
        required
      />

      {(errorMessage === 'CredentialSignIn' || errorMessage === 'Unknown Error') && (
        <div className="flex mb-2">
          <IoInformationOutline className="h-5 w-5 text-red-500" />
          <p className="text-sm text-red-500">Las credenciales no son correctas</p>
        </div>
      )}

      <button
        type="submit"
        className={clsx('btn-primary', {
          'btn-disable': isSubmitting,
        })}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Ingresando...' : 'Ingresar'}
      </button>

      {/* divisor */}
      <div className="flex items-center my-5">
        <hr className="flex-1 border-t border-gray-500 rounded" />
        <div className="px-2 text-gray-800">O</div>
        <hr className="flex-1 border-t border-gray-500 rounded" />
      </div>

      <Link href="/auth/new-account" className="btn-secondary text-center">
        Crear una nueva cuenta
      </Link>
    </form>
  );
};
