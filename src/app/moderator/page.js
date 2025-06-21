'use client'
import Link from 'next/link'
import React, { act, useState } from 'react'
import { FaUsers, FaTrophy, FaMedal, FaEdit, FaTrash, FaSearch, FaArrowUp, FaArrowDown, FaFootballBall } from 'react-icons/fa'
import routes from '../routes'
import Players from './Players'
import Tournaments from './Tournaments'
import Categories from '../admin/Categories'
import Matches from './Matches'

export default function ClubAdminPanel() {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL
  const [activeTab, setActiveTab] = useState('tournaments')
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <main className="min-h-screen text-gray-800 max-lg:bg-gray-100 py-6 px-4 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 w-[90%] sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto">
        {/* Fondo decorativo (sólo visible en pantallas medianas o grandes) */}
        <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-cyan-400 to-cyan-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>

        <div className="relative px-4 py-10 bg-white shadow-lg rounded-xl sm:rounded-3xl sm:p-20">
          <h1 className="text-2xl sm:text-4xl font-bold text-center text-gray-900 mb-8">Panel de Administrador de Club</h1>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <button
              onClick={() => setActiveTab('tournaments')}
              className={`flex items-center px-4 py-2 rounded-md transition ${activeTab === 'tournaments' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              <FaTrophy className="mr-2" /> Torneos
            </button>
            <button
              onClick={() => setActiveTab('players')}
              className={`flex items-center px-4 py-2 rounded-md transition ${activeTab === 'players' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              <FaUsers className="mr-2" /> Jugadores
            </button>
            <button
              onClick={() => setActiveTab('categories')}
              className={`flex items-center px-4 py-2 rounded-md transition ${activeTab === 'categories' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              <FaMedal className="mr-2" /> Categorías
            </button>
            <button
              onClick={() => setActiveTab('matches')}
              className={`flex items-center px-4 py-2 rounded-md transition ${activeTab === 'matches' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              <FaFootballBall className="mr-2" /> Partidos
            </button>
          </div>

          {/* Buscador */}
          {activeTab !== 'matches' && (
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
          )}

          {/* Contenido dinámico */}
          <div>
            {activeTab === 'tournaments' && (
              <Tournaments searchTerm={searchTerm} backendUrl={backendUrl} />
            )}
            {activeTab === 'players' && (
              <Players searchTerm={searchTerm} backendUrl={backendUrl} />
            )}
            {activeTab === 'categories' && (
              <Categories searchTerm={searchTerm} backendUrl={backendUrl} />
            )}
            {activeTab === 'matches' && (
              <Matches searchTerm={searchTerm} backendUrl={backendUrl} />
            )}
          </div>

          {/* Cerrar sesión */}
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