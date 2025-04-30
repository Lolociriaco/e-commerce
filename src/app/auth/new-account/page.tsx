import { titleFont } from '@/config/fonts';
import Link from 'next/link';

export default function NewAccoutnPage() {
  return (
    <div className="flex flex-col min-h-screen pt-32 sm:pt-52">

      <h1 className={ `${ titleFont.className } text-4xl mb-5` }>Nueva Cuenta</h1>

      <div className="flex flex-col">

        <label htmlFor="email">Nombre completo</label>
        <input
          className="px-5 py-2 border-2 bg-gray-100 rounded-lg mb-5 focus:outline-none focus:border-gray-300"
          type="text" />


        <label htmlFor="email">Correo electrónico</label>
        <input
          className="px-5 py-2 border-2 bg-gray-100 rounded-lg mb-5 focus:outline-none focus:border-gray-300"
          type="email" />


        <label htmlFor="email">Contraseña</label>
        <input
          className="px-5 py-2 border-2 bg-gray-100 rounded-lg mb-5 focus:outline-none focus:border-gray-300"
          type="password" />


        <button
          className="btn-primary">
          Crear cuenta
        </button>


        {/* divisor l ine */ }
        <div className="flex items-center my-5">
          <hr className="flex-1 border-t border-gray-500 rounded"/>
          <div className="px-2 text-gray-800">O</div>
          <hr className="flex-1 border-t border-gray-500 rounded"/>
        </div>

        <Link
          href="/auth/login" 
          className="btn-secondary text-center">
          Ya tengo una cuenta
        </Link>

      </div>
    </div>
  );
}