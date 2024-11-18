'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { FaUsers, FaTrophy, FaMedal, FaEdit, FaTrash, FaSearch, FaArrowUp, FaArrowDown } from 'react-icons/fa'
import routes from '../routes'

// Datos de ejemplo (en una aplicación real, estos datos vendrían de una API)
const initialPlayers = [
  { id: 1, name: 'Juan Pérez', category: 1, points: 1000 },
  { id: 2, name: 'María García', category: 2, points: 850 },
  { id: 3, name: 'Carlos Rodríguez', category: 3, points: 700 },
]

const initialTournaments = [
  { id: 1, name: 'Torneo Primavera', date: '2023-05-15', category: 'Open' },
  { id: 2, name: 'Copa Verano', date: '2023-07-20', category: '3ª' },
]

export default function ClubAdminPanel() {
  const [activeTab, setActiveTab] = useState('tournaments')
  const [players, setPlayers] = useState(initialPlayers)
  const [tournaments, setTournaments] = useState(initialTournaments)
  const [searchTerm, setSearchTerm] = useState('')

  const [newTournament, setNewTournament] = useState({ name: '', date: '', category: '' })
  const [editingTournament, setEditingTournament] = useState(null)

  const [newResult, setNewResult] = useState({ playerId: '', tournamentId: '', points: '' })

  const handleAddTournament = () => {
    if (newTournament.name && newTournament.date && newTournament.category) {
      setTournaments([...tournaments, { id: Date.now(), ...newTournament }])
      setNewTournament({ name: '', date: '', category: '' })
    }
  }

  const handleEditTournament = (tournament) => {
    setEditingTournament(tournament)
  }

  const handleUpdateTournament = () => {
    if (editingTournament) {
      setTournaments(tournaments.map(t => t.id === editingTournament.id ? editingTournament : t))
      setEditingTournament(null)
    }
  }

  const handleDeleteTournament = (id) => {
    setTournaments(tournaments.filter(t => t.id !== id))
  }

  const handleAddResult = () => {
    if (newResult.playerId && newResult.tournamentId && newResult.points) {
      const updatedPlayers = players.map(player => {
        if (player.id === parseInt(newResult.playerId)) {
          return { ...player, points: player.points + parseInt(newResult.points) }
        }
        return player
      })
      setPlayers(updatedPlayers)
      setNewResult({ playerId: '', tournamentId: '', points: '' })
    }
  }

  const handleMoveCategory = (playerId, direction) => {
    const updatedPlayers = players.map(player => {
      if (player.id === playerId) {
        const newCategory = direction === 'up' ? player.category - 1 : player.category + 1
        return { ...player, category: Math.max(1, Math.min(9, newCategory)) }
      }
      return player
    })
    setPlayers(updatedPlayers)
  }

  const filteredTournaments = tournaments.filter(tournament => 
    tournament.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tournament.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredPlayers = players.filter(player => 
    player.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <main className="min-h-screen text-gray-800 bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">Panel de Administrador de Club</h1>
          
          <div className="flex justify-center space-x-4 mb-8">
            <button
              onClick={() => setActiveTab('tournaments')}
              className={`flex items-center px-4 py-2 rounded-md ${activeTab === 'tournaments' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              <FaTrophy className="mr-2" /> Torneos
            </button>
            <button
              onClick={() => setActiveTab('players')}
              className={`flex items-center px-4 py-2 rounded-md ${activeTab === 'players' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              <FaUsers className="mr-2" /> Jugadores
            </button>
            <button
              onClick={() => setActiveTab('categories')}
              className={`flex items-center px-4 py-2 rounded-md ${activeTab === 'categories' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              <FaMedal className="mr-2" /> Categorías
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

          {activeTab === 'tournaments' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Gestión de Torneos</h2>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Nombre del torneo"
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                  value={newTournament.name}
                  onChange={(e) => setNewTournament({...newTournament, name: e.target.value})}
                />
                <input
                  type="date"
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                  value={newTournament.date}
                  onChange={(e) => setNewTournament({...newTournament, date: e.target.value})}
                />
                <input
                  type="text"
                  placeholder="Categoría"
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                  value={newTournament.category}
                  onChange={(e) => setNewTournament({...newTournament, category: e.target.value})}
                />
                <button
                  onClick={handleAddTournament}
                  className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                >
                  Agregar Torneo
                </button>
              </div>
              <ul className="space-y-2">
                {filteredTournaments.map(tournament => (
                  <li key={tournament.id} className="bg-gray-50 p-4 rounded-md flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">{tournament.name}</h3>
                      <p className="text-sm text-gray-600">Fecha: {tournament.date}</p>
                      <p className="text-sm text-gray-600">Categoría: {tournament.category}</p>
                    </div>
                    <div>
                      <button
                        onClick={() => handleEditTournament(tournament)}
                        className="text-blue-500 hover:text-blue-700 mr-2"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteTournament(tournament.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'players' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Gestión de Jugadores</h2>
              <div className="mb-4">
                <select
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                  value={newResult.playerId}
                  onChange={(e) => setNewResult({...newResult, playerId: e.target.value})}
                >
                  <option value="">Seleccionar jugador</option>
                  {players.map(player => (
                    <option key={player.id} value={player.id}>{player.name}</option>
                  ))}
                </select>
                <select
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                  value={newResult.tournamentId}
                  onChange={(e) => setNewResult({...newResult, tournamentId: e.target.value})}
                >
                  <option value="">Seleccionar torneo</option>
                  {tournaments.map(tournament => (
                    <option key={tournament.id} value={tournament.id}>{tournament.name}</option>
                  ))}
                </select>
                <input
                  type="number"
                  placeholder="Puntos obtenidos"
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                  value={newResult.points}
                  onChange={(e) => setNewResult({...newResult, points: e.target.value})}
                />
                <button
                  onClick={handleAddResult}
                  className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                >
                  Agregar Resultado
                </button>
              </div>
              <ul className="space-y-2">
                {filteredPlayers.map(player => (
                  <li key={player.id} className="bg-gray-50 p-4 rounded-md flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">{player.name}</h3>
                      <p className="text-sm text-gray-600">Categoría: {player.category}ª</p>
                      <p className="text-sm text-gray-600">Puntos: {player.points}</p>
                    </div>
                    <div>
                      <button
                        onClick={() => handleMoveCategory(player.id, 'up')}
                        className="text-green-500 hover:text-green-700 mr-2"
                      >
                        <FaArrowUp />
                      </button>
                      <button
                        onClick={() => handleMoveCategory(player.id, 'down')}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaArrowDown />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'categories' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Gestión de Categorías</h2>
              <div className="grid grid-cols-3 gap-4">
                {[1,2,3,4,5,6,7,8,9].map((category) => (
                  <div key={category} className="bg-gray-50 p-4 rounded-md">
                    <h3 className="font-semibold">{category}ª Categoría</h3>
                    <p className="text-sm text-gray-600">
                      Jugadores: {players.filter(p => p.category === category).length}
                    </p>
                    <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                      Ver Jugadores
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {editingTournament && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
              <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <h3 className="text-lg font-medium leading-6 text-gray-900 mb-2">Editar Torneo</h3>
                <input
                  type="text"
                  value={editingTournament.name}
                  onChange={(e) => setEditingTournament({...editingTournament, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                />
                <input
                  type="date"
                  value={editingTournament.date}
                  onChange={(e) => setEditingTournament({...editingTournament, date: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                />
                <input
                  type="text"
                  value={editingTournament.category}
                  onChange={(e) => setEditingTournament({...editingTournament, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                />
                <div className="flex justify-end">
                  <button
                    onClick={handleUpdateTournament}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={() => setEditingTournament(null)}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
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