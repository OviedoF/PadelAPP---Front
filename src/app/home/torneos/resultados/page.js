'use client'

import { useState } from 'react'
import { FaTrophy, FaCalendarAlt, FaMapMarkerAlt, FaMedal, FaSearch, FaVenusMars } from 'react-icons/fa'
import Nav from '../../Navbar'

// Datos de ejemplo actualizados para incluir la categoría de género
const torneosResultados = [
    {
        id: 1,
        nombre: "Torneo Madrid Open",
        fecha: "2024-03-15",
        ubicacion: "Madrid",
        categoria: "Primera División",
        genero: "Masculino",
        resultados: [
            { posicion: 1, equipo: "Padel Pro Madrid", puntos: 1000 },
            { posicion: 2, equipo: "Barcelona Stars", puntos: 750 },
            { posicion: 3, equipo: "Valencia Aces", puntos: 500 },
            { posicion: 4, equipo: "Sevilla Smash", puntos: 250 },
        ]
    },
    {
        id: 2,
        nombre: "Barcelona Padel Cup",
        fecha: "2024-03-22",
        ubicacion: "Barcelona",
        categoria: "Segunda División",
        genero: "Femenino",
        resultados: [
            { posicion: 1, equipo: "Girona Padel Club", puntos: 800 },
            { posicion: 2, equipo: "Lleida Legends", puntos: 600 },
            { posicion: 3, equipo: "Tarragona Team", puntos: 400 },
            { posicion: 4, equipo: "Sabadell Slammers", puntos: 200 },
        ]
    },
    {
        id: 3,
        nombre: "Valencia Padel Masters",
        fecha: "2024-04-01",
        ubicacion: "Valencia",
        categoria: "Primera División",
        genero: "Masculino",
        resultados: [
            { posicion: 1, equipo: "Valencia Victors", puntos: 1000 },
            { posicion: 2, equipo: "Alicante Aces", puntos: 750 },
            { posicion: 3, equipo: "Castellón Crushers", puntos: 500 },
            { posicion: 4, equipo: "Elche Eagles", puntos: 250 },
        ]
    },
    {
        id: 4,
        nombre: "Sevilla Padel Championship",
        fecha: "2024-04-10",
        ubicacion: "Sevilla",
        categoria: "Tercera División",
        genero: "Femenino",
        resultados: [
            { posicion: 1, equipo: "Sevilla Strikers", puntos: 600 },
            { posicion: 2, equipo: "Córdoba Chargers", puntos: 450 },
            { posicion: 3, equipo: "Huelva Hammers", puntos: 300 },
            { posicion: 4, equipo: "Cádiz Crushers", puntos: 150 },
        ]
    },
]

export default function TorneosResultados() {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedTorneo, setSelectedTorneo] = useState(null)
    const [generoFilter, setGeneroFilter] = useState('Todos')

    const filteredTorneos = torneosResultados.filter(torneo =>
        (torneo.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        torneo.ubicacion.toLowerCase().includes(searchTerm.toLowerCase()) ||
        torneo.categoria.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (generoFilter === 'Todos' || torneo.genero === generoFilter)
    )

    return (
        <>
            <Nav />

            <main className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
                <div className="relative py-3 sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-cyan-400 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                    <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                        <div className="max-w-4xl mx-auto">
                            <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">Resultados de Torneos</h1>

                            <div className="mb-6 flex flex-col sm:flex-row gap-4">
                                <div className="relative flex-grow">
                                    <input
                                        type="text"
                                        placeholder="Buscar torneo..."
                                        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <FaSearch className="absolute right-3 top-3 text-gray-400" />
                                </div>
                                <div className="relative w-1/3">
                                    <select
                                        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 appearance-none"
                                        value={generoFilter}
                                        onChange={(e) => setGeneroFilter(e.target.value)}
                                    >
                                        <option value="Todos">Todos</option>
                                        <option value="Masculino">Masculino</option>
                                        <option value="Femenino">Femenino</option>
                                    </select>
                                    <FaVenusMars className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {filteredTorneos.map((torneo) => (
                                    <div
                                        key={torneo.id}
                                        className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
                                        onClick={() => setSelectedTorneo(torneo)}
                                    >
                                        <h2 className="text-xl font-semibold mb-2 text-cyan-600">{torneo.nombre}</h2>
                                        <p className="text-gray-600 flex items-center mb-1">
                                            <FaCalendarAlt className="mr-2 text-cyan-500" />
                                            {new Date(torneo.fecha).toLocaleDateString()}
                                        </p>
                                        <p className="text-gray-600 flex items-center mb-1">
                                            <FaMapMarkerAlt className="mr-2 text-cyan-500" />
                                            {torneo.ubicacion}
                                        </p>
                                        <p className="text-gray-600 flex items-center mb-1">
                                            <FaTrophy className="mr-2 text-cyan-500" />
                                            {torneo.categoria}
                                        </p>
                                        <p className="text-gray-600 flex items-center">
                                            <FaVenusMars className="mr-2 text-cyan-500" />
                                            {torneo.genero}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {selectedTorneo && (
                                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
                                    <div className="relative bg-white rounded-lg shadow-xl p-8 m-4 max-w-xl w-full">
                                        <button
                                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                                            onClick={() => setSelectedTorneo(null)}
                                        >
                                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                        <h2 className="text-2xl font-bold mb-4 text-cyan-600">{selectedTorneo.nombre}</h2>
                                        <p className="text-gray-600 flex items-center mb-2">
                                            <FaCalendarAlt className="mr-2 text-cyan-500" />
                                            {new Date(selectedTorneo.fecha).toLocaleDateString()}
                                        </p>
                                        <p className="text-gray-600 flex items-center mb-2">
                                            <FaMapMarkerAlt className="mr-2 text-cyan-500" />
                                            {selectedTorneo.ubicacion}
                                        </p>
                                        <p className="text-gray-600 flex items-center mb-2">
                                            <FaTrophy className="mr-2 text-cyan-500" />
                                            {selectedTorneo.categoria}
                                        </p>
                                        <p className="text-gray-600 flex items-center mb-4">
                                            <FaVenusMars className="mr-2 text-cyan-500" />
                                            {selectedTorneo.genero}
                                        </p>
                                        <h3 className="text-xl font-semibold mb-2">Resultados</h3>
                                        <ul className="space-y-2">
                                            {selectedTorneo.resultados.map((resultado) => (
                                                <li key={resultado.posicion} className="flex items-center justify-between bg-gray-100 p-2 rounded">
                                                    <span className="flex items-center">
                                                        <FaMedal className={`mr-2 ${resultado.posicion === 1 ? 'text-yellow-500' :
                                                                resultado.posicion === 2 ? 'text-gray-400' :
                                                                    resultado.posicion === 3 ? 'text-yellow-700' : 'text-gray-500'
                                                            }`} />
                                                        {resultado.equipo}
                                                    </span>
                                                    <span className="font-semibold">{resultado.puntos} pts</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

