import Link from 'next/link'
import React from 'react'
import { FaTrophy, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa'
import routes from '../routes'

// Datos de ejemplo para los rankings
const rankingData = [
  { category: 1, players: [
    { name: 'Juan Pérez', points: 1000 },
    { name: 'María García', points: 950 },
    { name: 'Carlos Rodríguez', points: 900 },
  ]},
  { category: 2, players: [
    { name: 'Ana Martínez', points: 850 },
    { name: 'Pedro Sánchez', points: 800 },
    { name: 'Laura González', points: 750 },
  ]},
  // ... Añadir más categorías hasta la 9ª
  { category: 9, players: [
    { name: 'Sofía Ruiz', points: 100 },
    { name: 'Diego Fernández', points: 90 },
    { name: 'Elena Castro', points: 80 },
  ]},
]

// Datos de ejemplo para los torneos
const tournamentsData = [
  { id: 1, name: 'Torneo Madrid Open', date: '2023-06-15', location: 'Madrid' },
  { id: 2, name: 'Barcelona Padel Cup', date: '2023-06-22', location: 'Barcelona' },
  { id: 3, name: 'Valencia Padel Masters', date: '2023-07-01', location: 'Valencia' },
  { id: 4, name: 'Sevilla Padel Championship', date: '2023-07-10', location: 'Sevilla' },
]

export default function HomeView() {
  return (
    <main className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20 flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">Rankings de Pádel</h1>
          
          {/* Sección de Ranking de Jugadores */}
          <section className="mb-12 w-full">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Ranking de Jugadores</h2>
            <ul className="space-y-6">
              {rankingData.map((category) => (
                <li key={category.category} className="bg-gray-50 rounded-lg p-4 shadow">
                  <h3 className="text-xl font-medium text-gray-700 mb-2">
                    {category.category}ª Categoría
                  </h3>
                  <ul className="space-y-2">
                    {category.players.map((player, index) => (
                      <li key={player.name} className="flex items-center justify-between">
                        <span className="flex items-center text-gray-800">
                          <FaTrophy className={`mr-2 ${index === 0 ? 'text-yellow-400' : index === 1 ? 'text-gray-400' : index === 2 ? 'text-yellow-700' : 'text-gray-300'}`} />
                          {player.name}
                        </span>
                        <span className="font-bold text-gray-800">{player.points} pts</span>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </section>
          
          {/* Sección de Listado de Torneos */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Próximos Torneos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tournamentsData.map((tournament) => (
                <div key={tournament.id} className="bg-gray-50 rounded-lg p-4 shadow">
                  <h3 className="text-lg font-medium text-gray-700 mb-2">{tournament.name}</h3>
                  <p className="text-gray-600 flex items-center mb-1">
                    <FaCalendarAlt className="mr-2" />
                    {new Date(tournament.date).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600 flex items-center">
                    <FaMapMarkerAlt className="mr-2" />
                    {tournament.location}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <Link href={routes.login}>
          <button className="mt-8 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Cerrar Sesión
          </button>
          </Link>
        </div>
      </div>
    </main>
  )
}