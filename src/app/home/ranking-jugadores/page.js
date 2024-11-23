'use client'

import { useState } from 'react'
import { FaMedal, FaSearch, FaChevronDown, FaChevronUp, FaMars, FaVenus } from 'react-icons/fa'
import Nav from '../Navbar'

// Datos de ejemplo para el ranking de jugadores con género añadido
const rankingData = [
    {
        categoria: "Primera",
        jugadores: [
            { id: 1, nombre: "Juan Pérez", puntos: 1500, club: "Padel Pro Madrid", genero: "masculino" },
            { id: 2, nombre: "María García", puntos: 1450, club: "Barcelona Stars", genero: "femenino" },
            { id: 3, nombre: "Carlos Rodríguez", puntos: 1400, club: "Valencia Aces", genero: "masculino" },
            { id: 4, nombre: "Laura Martínez", puntos: 1350, club: "Sevilla Smash", genero: "femenino" },
            { id: 5, nombre: "Antonio López", puntos: 1300, club: "Málaga Padel Club", genero: "masculino" },
        ]
    },
    {
        categoria: "Segunda",
        jugadores: [
            { id: 6, nombre: "Ana Sánchez", puntos: 1200, club: "Zaragoza Padel", genero: "femenino" },
            { id: 7, nombre: "David Fernández", puntos: 1150, club: "Bilbao Padel Pro", genero: "masculino" },
            { id: 8, nombre: "Elena Castro", puntos: 1100, club: "Vigo Padel Club", genero: "femenino" },
            { id: 9, nombre: "Javier Ruiz", puntos: 1050, club: "Alicante Padel", genero: "masculino" },
            { id: 10, nombre: "Sofía Moreno", puntos: 1000, club: "Granada Padel Club", genero: "femenino" },
        ]
    },
    {
        categoria: "Tercera",
        jugadores: [
            { id: 11, nombre: "Pablo Jiménez", puntos: 900, club: "Murcia Padel Team", genero: "masculino" },
            { id: 12, nombre: "Isabel Torres", puntos: 850, club: "Córdoba Padel Pro", genero: "femenino" },
            { id: 13, nombre: "Miguel Ángel Vega", puntos: 800, club: "Santander Beach Padel", genero: "masculino" },
            { id: 14, nombre: "Carmen Ortiz", puntos: 750, club: "Valladolid Padel Open", genero: "femenino" },
            { id: 15, nombre: "Roberto Díaz", puntos: 700, club: "Gijón Padel Masters", genero: "masculino" },
        ]
    }
]

export default function RankingJugadores() {
    const [searchTerm, setSearchTerm] = useState('')
    const [expandedCategory, setExpandedCategory] = useState("Primera")
    const [genderFilter, setGenderFilter] = useState('masculino')

    const toggleCategory = (category) => {
        if (expandedCategory === category) {
            setExpandedCategory(null)
        } else {
            setExpandedCategory(category)
        }
    }

    const filteredRanking = rankingData.map((categoria) => ({
        ...categoria,
        jugadores: categoria.jugadores.map((jugador, index) => ({
            ...jugador,
            posicion: index + 1, // Mantener posición original
            visible:
                (genderFilter === 'todos' || jugador.genero === genderFilter) &&
                (jugador.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    jugador.club.toLowerCase().includes(searchTerm.toLowerCase())),
        })),
    }));

    return (
        <>
            <Nav />

            <main className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
                <div className="relative py-3 sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-cyan-400 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                    <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                        <div className="max-w-4xl mx-auto">
                            <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">Ranking de Jugadores</h1>

                            <div className="mb-6 space-y-4">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Buscar jugador o club..."
                                        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <FaSearch className="absolute right-3 top-3 text-gray-400" />
                                </div>
                                <div className="flex justify-center space-x-4">
                                    <button
                                        className={`px-4 py-2 rounded-md flex items-center ${genderFilter === 'masculino' ? 'bg-cyan-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                                        onClick={() => setGenderFilter('masculino')}
                                    >
                                        <FaMars className="mr-2" /> Masculino
                                    </button>
                                    <button
                                        className={`px-4 py-2 rounded-md flex items-center ${genderFilter === 'femenino' ? 'bg-cyan-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                                        onClick={() => setGenderFilter('femenino')}
                                    >
                                        <FaVenus className="mr-2" /> Femenino
                                    </button>
                                </div>
                            </div>

                            {filteredRanking.map((categoria) => (
                                <div key={categoria.categoria} className="mb-6">
                                    <button
                                        className="w-full px-6 py-4 bg-gray-100 rounded-lg shadow-md text-left focus:outline-none"
                                        onClick={() => toggleCategory(categoria.categoria)}
                                    >
                                        <div className="flex justify-between items-center">
                                            <span className="font-bold text-lg text-cyan-600">{categoria.categoria} Categoría</span>
                                            {expandedCategory === categoria.categoria ? (
                                                <FaChevronUp className="text-cyan-500" />
                                            ) : (
                                                <FaChevronDown className="text-cyan-500" />
                                            )}
                                        </div>
                                    </button>
                                    {expandedCategory === categoria.categoria && (
                                        <div className="mt-4 bg-white rounded-lg shadow-md overflow-hidden">
                                            <table className="min-w-full">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posición</th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jugador</th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Club</th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Puntos</th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Género</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {categoria.jugadores.map((jugador) =>
                                                        jugador.visible && (
                                                            <tr key={jugador.id}>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <div className="flex items-center">
                                                                        <FaMedal className={`mr-2 ${jugador.posicion === 1
                                                                                ? 'text-yellow-400'
                                                                                : jugador.posicion === 2
                                                                                    ? 'text-gray-400'
                                                                                    : jugador.posicion === 3
                                                                                        ? 'text-yellow-700'
                                                                                        : 'text-gray-400'
                                                                            }`} />
                                                                        <span className="text-sm font-medium text-gray-900">{jugador.posicion}</span>
                                                                    </div>
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <div className="text-sm font-medium text-gray-900">{jugador.nombre}</div>
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <div className="text-sm text-gray-500">{jugador.club}</div>
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <div className="text-sm font-semibold text-gray-900">{jugador.puntos}</div>
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <div className="text-sm text-gray-500 flex items-center">
                                                                        {jugador.genero === 'masculino' ? (
                                                                            <><FaMars className="mr-1 text-blue-500" /> Masculino</>
                                                                        ) : (
                                                                            <><FaVenus className="mr-1 text-pink-500" /> Femenino</>
                                                                        )}
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

