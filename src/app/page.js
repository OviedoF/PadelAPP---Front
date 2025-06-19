'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FaEye, FaEyeSlash, FaLock } from 'react-icons/fa';
import routes from './routes';
import { useRouter } from 'next/navigation';
import { useSnackbar, SnackbarProvider } from 'notistack';
import axios from 'axios';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${backendUrl}/auth/login`, {
        email,
        password,
      });

      const { token, role } = response.data;
      console.log(response.data);

      // Guardar el token en localStorage
      localStorage.setItem('authToken', token);

      // Mostrar mensaje de éxito
      enqueueSnackbar('Inicio de sesión exitoso.', { variant: 'success' });

      // Redirigir según el rol del usuario
      switch (role) {
        case 'admin':
          router.push(routes.admin);
          break;
        case 'moderator':
          router.push(routes.moderator);
          break;
        default:
          router.push(routes.circuito);
      }
    } catch (error) {
      // Manejo de errores
      const errorMessage =
        error.response?.data?.message || 'Error al iniciar sesión. Verifica tus credenciales.';
      enqueueSnackbar(errorMessage, { variant: 'error' });
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 px-4 sm:px-6 lg:px-8">
      <section className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            ¡Bienvenido!
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Inicia sesión en tu cuenta
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Dirección de email
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Dirección de email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative ">
              <label htmlFor="password" className="sr-only">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FaEyeSlash className="h-5 w-5 text-gray-400" aria-hidden="true" />
                ) : (
                  <FaEye className="h-5 w-5 text-gray-400" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          <Link href={routes.circuito} className="text-sm text-indigo-600 hover:text-indigo-500 mt-2">
            Ingresar como invitado
          </Link>

          <div className="flex flex-col">
            <Link href={routes.register} className="text-sm text-indigo-600 hover:text-indigo-500 mt-2">
              ¿No tienes cuenta? ¡Regístrate!
            </Link>
          </div>

          <button
            type="submit"
            className="group relative w-full flex mt-5 justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <FaLock className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
            </span>
            Iniciar sesión
          </button>
        </form>
      </section>
    </main>
  );
}

export default function Login() {
  return (
    <SnackbarProvider maxSnack={3}>
      <LoginForm />
    </SnackbarProvider>
  );
}
