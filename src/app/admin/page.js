'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { FaBuilding, FaTrophy, FaUserCog, FaSearch } from 'react-icons/fa'
import routes from '../routes'
import Clubes from './Clubes'
import Admins from './Admins'
import Categories from './Categories'

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

export default function SuperAdminPanel() {
  const [activeTab, setActiveTab] = useState('clubs')
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <main className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12 text-gray-900">
      <div className="relative py-3 sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">Panel de Super Administrador</h1>

          <div className="flex justify-center space-x-4 mb-8">
            <button
              onClick={() => setActiveTab('clubs')}
              className={`flex items-center px-4 py-2 rounded-md ${activeTab === 'clubs' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              <FaBuilding className="mr-2" /> Clubes
            </button>
            <button
              onClick={() => setActiveTab('admins')}
              className={`flex items-center px-4 py-2 rounded-md ${activeTab === 'admins' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              <FaUserCog className="mr-2" /> Administradores
            </button>

            <button
              onClick={() => setActiveTab('categories')}
              className={`flex items-center px-4 py-2 rounded-md ${activeTab === 'categories' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              <FaTrophy className="mr-2" /> Categorías
            </button>
          </div>

          <div className="mb-4">
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

          {activeTab === 'clubs' && (
            <Clubes
              backendUrl={backendUrl}
              searchTerm={searchTerm}
            />
          )}

          {activeTab === 'categories' && (
            <Categories
              backendUrl={backendUrl}
              searchTerm={searchTerm}
            />
          )}

          {activeTab === 'admins' && (
            <Admins
              backendUrl={backendUrl}
              searchTerm={searchTerm}
            />
          )}

          <div className='w-full flex justify-center'>
            <Link href={routes.login}>
              <button className="mt-8 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Cerrar Sesión
              </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}