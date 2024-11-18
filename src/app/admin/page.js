'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { FaUsers, FaBuilding, FaTrophy, FaUserCog, FaSearch, FaEdit, FaTrash, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa'
import routes from '../routes'

// Datos de ejemplo (en una aplicación real, estos datos vendrían de una API)
const initialClubs = [
  { id: 1, name: 'Club Pádel Madrid', adminName: 'Juan Pérez' },
  { id: 2, name: 'Barcelona Pádel Center', adminName: 'María García' },
]

const initialPlayers = [
  { id: 1, name: 'Carlos Rodríguez', category: 1, points: 1000, club: 'Club Pádel Madrid' },
  { id: 2, name: 'Ana Martínez', category: 2, points: 850, club: 'Barcelona Pádel Center' },
]

const initialTournaments = [
  { id: 1, name: 'Torneo Primavera', date: '2023-05-15', location: 'Madrid', category: 'Open' },
  { id: 2, name: 'Copa Verano', date: '2023-07-20', location: 'Barcelona', category: '3ª' },
]

const initialAdmins = [
  { id: 1, name: 'Juan Pérez', email: 'juan@padelmadrid.com', club: 'Club Pádel Madrid' },
  { id: 2, name: 'María García', email: 'maria@barcelonapadel.com', club: 'Barcelona Pádel Center' },
]

export default function SuperAdminPanel() {
  const [activeTab, setActiveTab] = useState('clubs')
  const [clubs, setClubs] = useState(initialClubs)
  const [players, setPlayers] = useState(initialPlayers)
  const [tournaments, setTournaments] = useState(initialTournaments)
  const [admins, setAdmins] = useState(initialAdmins)
  const [searchTerm, setSearchTerm] = useState('')

  const [newClub, setNewClub] = useState({ name: '', adminName: '' })
  const [editingClub, setEditingClub] = useState(null)

  const [newTournament, setNewTournament] = useState({ name: '', date: '', location: '', category: '' })
  const [editingTournament, setEditingTournament] = useState(null)

  const [newAdmin, setNewAdmin] = useState({ name: '', email: '', club: '' })
  const [editingAdmin, setEditingAdmin] = useState(null)

  const handleAddClub = () => {
    if (newClub.name && newClub.adminName) {
      setClubs([...clubs, { id: Date.now(), ...newClub }])
      setNewClub({ name: '', adminName: '' })
    }
  }

  const handleEditClub = (club) => {
    setEditingClub(club)
  }

  const handleUpdateClub = () => {
    if (editingClub) {
      setClubs(clubs.map(c => c.id === editingClub.id ? editingClub : c))
      setEditingClub(null)
    }
  }

  const handleDeleteClub = (id) => {
    setClubs(clubs.filter(c => c.id !== id))
  }

  const handleAddTournament = () => {
    if (newTournament.name && newTournament.date && newTournament.location && newTournament.category) {
      setTournaments([...tournaments, { id: Date.now(), ...newTournament }])
      setNewTournament({ name: '', date: '', location: '', category: '' })
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

  const handleAddAdmin = () => {
    if (newAdmin.name && newAdmin.email && newAdmin.club) {
      setAdmins([...admins, { id: Date.now(), ...newAdmin }])
      setNewAdmin({ name: '', email: '', club: '' })
    }
  }

  const handleEditAdmin = (admin) => {
    setEditingAdmin(admin)
  }

  const handleUpdateAdmin = () => {
    if (editingAdmin) {
      setAdmins(admins.map(a => a.id === editingAdmin.id ? editingAdmin : a))
      setEditingAdmin(null)
    }
  }

  const handleDeleteAdmin = (id) => {
    setAdmins(admins.filter(a => a.id !== id))
  }

  const filteredClubs = clubs.filter(club =>
    club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    club.adminName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredPlayers = players.filter(player =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    player.club.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredTournaments = tournaments.filter(tournament =>
    tournament.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tournament.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tournament.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredAdmins = admins.filter(admin =>
    admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.club.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
              onClick={() => setActiveTab('players')}
              className={`flex items-center px-4 py-2 rounded-md ${activeTab === 'players' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              <FaUsers className="mr-2" /> Jugadores
            </button>
            <button
              onClick={() => setActiveTab('tournaments')}
              className={`flex items-center px-4 py-2 rounded-md ${activeTab === 'tournaments' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              <FaTrophy className="mr-2" /> Torneos
            </button>
            <button
              onClick={() => setActiveTab('admins')}
              className={`flex items-center px-4 py-2 rounded-md ${activeTab === 'admins' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              <FaUserCog className="mr-2" /> Administradores
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
            <section>
              <h2 className="text-2xl font-semibold mb-4">Gestión de Clubes</h2>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Nombre del club"
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                  value={newClub.name}
                  onChange={(e) => setNewClub({ ...newClub, name: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Nombre del administrador"
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                  value={newClub.adminName}
                  onChange={(e) => setNewClub({ ...newClub, adminName: e.target.value })}
                />
                <button
                  onClick={handleAddClub}
                  className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                >
                  Agregar Club
                </button>
              </div>
              <ul className="space-y-2">
                {filteredClubs.map(club => (
                  <li key={club.id} className="bg-gray-50 p-4 rounded-md flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">{club.name}</h3>
                      <p className="text-sm text-gray-600">Admin: {club.adminName}</p>
                    </div>
                    <div>
                      <button
                        onClick={() => handleEditClub(club)}
                        className="text-blue-500 hover:text-blue-700 mr-2"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteClub(club.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {activeTab === 'players' && (
            <section>
              <h2 className="text-2xl font-semibold mb-4">Gestión de Jugadores</h2>
              <ul className="space-y-2">
                {filteredPlayers.map(player => (
                  <li key={player.id} className="bg-gray-50 p-4 rounded-md">
                    <h3 className="font-semibold">{player.name}</h3>
                    <p className="text-sm text-gray-600">Categoría: {player.category}</p>
                    <p className="text-sm text-gray-600">Puntos: {player.points}</p>
                    <p className="text-sm text-gray-600">Club: {player.club}</p>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {activeTab === 'tournaments' && (
            <section>
              <h2 className="text-2xl font-semibold mb-4">Gestión de Torneos</h2>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Nombre del torneo"
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                  value={newTournament.name}
                  onChange={(e) => setNewTournament({ ...newTournament, name: e.target.value })}
                />
                <input
                  type="date"
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                  value={newTournament.date}
                  onChange={(e) => setNewTournament({ ...newTournament, date: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Ubicación"
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                  value={newTournament.location}
                  onChange={(e) => setNewTournament({ ...newTournament, location: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Categoría"
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                  value={newTournament.category}
                  onChange={(e) => setNewTournament({ ...newTournament, category: e.target.value })}
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
                      <p className="text-sm text-gray-600">
                        <FaCalendarAlt className="inline mr-1" />
                        {new Date(tournament.date).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-600">
                        <FaMapMarkerAlt className="inline mr-1" />
                        {tournament.location}
                      </p>
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
            </section>
          )}

          {activeTab === 'admins' && (
            <section>
              <h2 className="text-2xl font-semibold mb-4">Gestión de Administradores</h2>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Nombre del administrador"
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                  value={newAdmin.name}
                  onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                />
                <input
                  type="email"
                  placeholder="Email del administrador"
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                  value={newAdmin.email}
                  onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Club del administrador"
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                  value={newAdmin.club}
                  onChange={(e) => setNewAdmin({ ...newAdmin, club: e.target.value })}
                />
                <button
                  onClick={handleAddAdmin}
                  className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                >
                  Agregar Administrador
                </button>
              </div>
              <ul className="space-y-2">
                {filteredAdmins.map(admin => (
                  <li key={admin.id} className="bg-gray-50 p-4 rounded-md flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">{admin.name}</h3>
                      <p className="text-sm text-gray-600">Email: {admin.email}</p>
                      <p className="text-sm text-gray-600">Club: {admin.club}</p>
                    </div>
                    <div>
                      <button
                        onClick={() => handleEditAdmin(admin)}
                        className="text-blue-500 hover:text-blue-700 mr-2"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteAdmin(admin.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {editingClub && (
            <section className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
              <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <h3 className="text-lg font-medium leading-6 text-gray-900 mb-2">Editar Club</h3>
                <input
                  type="text"
                  value={editingClub.name}
                  onChange={(e) => setEditingClub({ ...editingClub, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                />
                <input
                  type="text"
                  value={editingClub.adminName}
                  onChange={(e) => setEditingClub({ ...editingClub, adminName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                />
                <div className="flex justify-end">
                  <button
                    onClick={handleUpdateClub}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={() => setEditingClub(null)}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </section>
          )}

          {editingTournament && (
            <section className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="tournament-modal">
              <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <h3 className="text-lg font-medium leading-6 text-gray-900 mb-2">Editar Torneo</h3>
                <input
                  type="text"
                  value={editingTournament.name}
                  onChange={(e) => setEditingTournament({ ...editingTournament, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                />
                <input
                  type="date"
                  value={editingTournament.date}
                  onChange={(e) => setEditingTournament({ ...editingTournament, date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                />
                <input
                  type="text"
                  value={editingTournament.location}
                  onChange={(e) => setEditingTournament({ ...editingTournament, location: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                />
                <input
                  type="text"
                  value={editingTournament.category}
                  onChange={(e) => setEditingTournament({ ...editingTournament, category: e.target.value })}
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
            </section>
          )}

          {editingAdmin && (
            <section className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="admin-modal">
              <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <h3 className="text-lg font-medium leading-6 text-gray-900 mb-2">Editar Administrador</h3>
                <input
                  type="text"
                  value={editingAdmin.name}
                  onChange={(e) => setEditingAdmin({ ...editingAdmin, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                />
                <input
                  type="email"
                  value={editingAdmin.email}
                  onChange={(e) => setEditingAdmin({ ...editingAdmin, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                />
                <input
                  type="text"
                  value={editingAdmin.club}
                  onChange={(e) => setEditingAdmin({ ...editingAdmin, club: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                />
                <div className="flex justify-end">
                  <button
                    onClick={handleUpdateAdmin}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={() => setEditingAdmin(null)}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </section>
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