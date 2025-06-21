'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FaBuilding, FaTrophy, FaUserCog, FaSearch } from 'react-icons/fa'
import routes from '../routes'
import Clubes from './Clubes'
import Admins from './Admins'
import Categories from './Categories'
import { useRouter } from 'next/navigation'
import axios from 'axios'

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

export default function SuperAdminPanel() {
  const [activeTab, setActiveTab] = useState('clubs')
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useRouter().push

  const getRole = async () => {
    try {
      const token = localStorage.getItem('authToken')
      if (!token) return navigate(routes.login)

      const response = await axios.post(`${backendUrl}/auth/isAdmin`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.data.role === "admin") {
        navigate(routes.login)
      }
    } catch (error) {
      console.error('Error fetching role:', error)
      navigate(routes.login)
    }
  }

  useEffect(() => {
    getRole()
  }, [])

  return (
    <main className="min-h-screen bg-gray-100 py-6 px-4 flex flex-col justify-center sm:py-12 text-gray-900">
      <div className="relative py-3 w-full sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto">
        {/* Fondo decorativo (oculto en mobile) */}
        <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-cyan-400 to-cyan-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>

        <div className="relative px-4 py-10 bg-white shadow-lg rounded-xl sm:rounded-3xl sm:p-20">
          <h1 className="text-2xl sm:text-4xl font-bold text-center text-gray-900 mb-8">
            Panel de Super Administrador
          </h1>

          {/* Tabs: se adaptan al tamaño de pantalla */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <button
              onClick={() => setActiveTab('clubs')}
              className={`flex items-center px-4 py-2 rounded-md transition ${activeTab === 'clubs' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              <FaBuilding className="mr-2" /> Clubes
            </button>
            <button
              onClick={() => setActiveTab('admins')}
              className={`flex items-center px-4 py-2 rounded-md transition ${activeTab === 'admins' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              <FaUserCog className="mr-2" /> Administradores
            </button>
            <button
              onClick={() => setActiveTab('categories')}
              className={`flex items-center px-4 py-2 rounded-md transition ${activeTab === 'categories' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              <FaTrophy className="mr-2" /> Categorías
            </button>
          </div>

          {/* Input de búsqueda */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar..."
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute right-3 top-3 text-gray-400" />
            </div>
          </div>

          {/* Contenido dinámico */}
          <div>
            {activeTab === 'clubs' && (
              <Clubes backendUrl={backendUrl} searchTerm={searchTerm} />
            )}
            {activeTab === 'categories' && (
              <Categories backendUrl={backendUrl} searchTerm={searchTerm} />
            )}
            {activeTab === 'admins' && (
              <Admins backendUrl={backendUrl} searchTerm={searchTerm} />
            )}
          </div>

          {/* Botón de logout */}
          <div className="w-full flex justify-center">
            <Link href={routes.login} onClick={() => localStorage.removeItem('authToken')}>
              <button className="mt-10 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded focus:outline-none focus:ring-2 focus:ring-red-400">
                Cerrar Sesión
              </button>
            </Link>
          </div>
        </div>
      </div>
    </main>

  )
}