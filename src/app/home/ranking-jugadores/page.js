'use client'

import { useEffect, useState } from 'react'
import { FaMedal, FaSearch, FaChevronDown, FaChevronUp, FaMars, FaVenus } from 'react-icons/fa'
import Nav from '../Navbar'
import { useSnackbar } from 'notistack'
import axios from 'axios'

export default function RankingJugadores() {
    const [searchTerm, setSearchTerm] = useState('')
    const [expandedCategory, setExpandedCategory] = useState("Primera")
    const [genderFilter, setGenderFilter] = useState('male')
    const [rankingData, setRankingData] = useState([])
    const { enqueueSnackbar } = useSnackbar();
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

    const getPlayers = async () => {
        try {
            const response = await axios.get(`${backendUrl}/player/ranking?genre=${genderFilter}&name=${searchTerm}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                },
            });
            setRankingData(response.data);
        } catch (error) {
            const errorMessage =
                error.response?.data?.message || 'Error al obtener los jugadores. Inténtalo de nuevo.';
            enqueueSnackbar(errorMessage, { variant: 'error' });
        }
    };

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
            visible:
                (genderFilter === 'todos' || jugador.genero === genderFilter) &&
                (jugador.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    jugador.club.toLowerCase().includes(searchTerm.toLowerCase())),
        })),
    }));

    useEffect(() => {
        getPlayers();
    }, [genderFilter, searchTerm]);

    return (
        <>
            <Nav />

        <main className="min-h-screen bg-gray-100 py-6 px-4 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto">
                <div className="absolute inset-0 hidden sm:block bg-gradient-to-r from-cyan-500 to-cyan-400 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                
                <div className="relative px-4 py-8 bg-white shadow-lg rounded-xl sm:rounded-3xl sm:px-8 sm:py-12">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-2xl sm:text-4xl font-bold text-center text-gray-900 mb-6">Ranking de Jugadores</h1>

                        <div className="mb-6 space-y-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Buscar jugador o club..."
                                    className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
                            </div>

                            <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
                                <button
                                    className={`px-4 py-2 rounded-md flex items-center justify-center ${genderFilter === 'male' ? 'bg-cyan-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                                    onClick={() => setGenderFilter('male')}
                                >
                                    <FaMars className="mr-2" /> Masculino
                                </button>
                                <button
                                    className={`px-4 py-2 rounded-md flex items-center justify-center ${genderFilter === 'female' ? 'bg-cyan-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                                    onClick={() => setGenderFilter('female')}
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
                                    <div className="mt-4 space-y-4">
                                        {categoria.jugadores
                                            .filter(j => j.visible)
                                            .map((jugador) => (
                                                <div key={jugador.id} className="bg-white p-4 rounded-lg shadow-md sm:grid sm:grid-cols-5 sm:gap-4 sm:items-center">
                                                    {/* Mobile view */}
                                                    <div className="flex items-center sm:hidden">
                                                        <FaMedal className={`mr-2 ${
                                                            jugador.posicion === 1 ? 'text-yellow-400'
                                                            : jugador.posicion === 2 ? 'text-gray-400'
                                                            : jugador.posicion === 3 ? 'text-yellow-700'
                                                            : 'text-gray-400'
                                                        }`} />
                                                        <span className="font-medium text-gray-800">{jugador.nombre}</span>
                                                    </div>

                                                    {/* Desktop view */}
                                                    <div className="hidden sm:block text-sm font-medium text-gray-900">
                                                        <div className="flex items-center">
                                                            <FaMedal className={`mr-2 ${
                                                                jugador.posicion === 1 ? 'text-yellow-400'
                                                                : jugador.posicion === 2 ? 'text-gray-400'
                                                                : jugador.posicion === 3 ? 'text-yellow-700'
                                                                : 'text-gray-400'
                                                            }`} />
                                                            {jugador.posicion}
                                                        </div>
                                                    </div>
                                                    <div className="text-sm font-medium text-gray-900">{jugador.nombre}</div>
                                                    <div className="text-sm text-gray-500">{jugador.club}</div>
                                                    <div className="text-sm font-semibold text-gray-900">{jugador.puntos}</div>
                                                    <div className="text-sm text-gray-500 flex items-center">
                                                        {jugador.genero === 'male' ? (
                                                            <><FaMars className="mr-1 text-blue-500" /> Masculino</>
                                                        ) : (
                                                            <><FaVenus className="mr-1 text-pink-500" /> Femenino</>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
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

