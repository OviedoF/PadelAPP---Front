'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { FaEye, FaEyeSlash, FaUserPlus } from 'react-icons/fa';
import routes from '../routes';

export default function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones de campos
    if (!name || !email || !password || !confirmPassword) {
      enqueueSnackbar('Todos los campos son obligatorios.', { variant: 'error' });
      return;
    }

    if (password !== confirmPassword) {
      enqueueSnackbar('Las contraseñas no coinciden.', { variant: 'error' });
      return;
    }

    if (password.length < 6) {
      enqueueSnackbar('La contraseña debe tener al menos 6 caracteres.', { variant: 'error' });
      return;
    }

    try {
      const response = await axios.post(`${backendUrl}/auth/register`, {
        username: name,
        email,
        password,
      });

      // Si la respuesta es exitosa
      enqueueSnackbar('Registro exitoso. Redirigiendo...', { variant: 'success' });

      // Limpiar campos
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');

      // Redirigir al login después de 2 segundos
      setTimeout(() => {
        window.location.href = routes.login;
      }, 2000);
    } catch (error) {
      // Capturar errores del servidor
      const errorMessage =
        error.response?.data?.message || 'Error al registrarse. Intenta nuevamente.';
      enqueueSnackbar(errorMessage, { variant: 'error' });
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 px-4 sm:px-6 lg:px-8">
      <section className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Crear una cuenta
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Regístrate para comenzar
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px mb-5">
            <div>
              <label htmlFor="name" className="sr-only">
                Nombre completo
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Nombre completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

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
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Dirección de email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="relative">
              <label htmlFor="password" className="sr-only">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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

            <div className="relative">
              <label htmlFor="confirm-password" className="sr-only">
                Confirmar contraseña
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type={showConfirmPassword ? 'text' : 'password'}
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Confirmar contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <FaEyeSlash className="h-5 w-5 text-gray-400" aria-hidden="true" />
                ) : (
                  <FaEye className="h-5 w-5 text-gray-400" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          <Link href={routes.login} className="text-sm text-indigo-600 hover:text-indigo-500">
            ¿Ya tienes una cuenta? Inicia sesión
          </Link>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <FaUserPlus className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
              </span>
              Registrarse
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
