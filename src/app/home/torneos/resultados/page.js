'use client'

import { useEffect, useState } from 'react'
import { FaTrophy, FaCalendarAlt, FaMapMarkerAlt, FaMedal, FaSearch, FaVenusMars, FaInfoCircle, FaListAlt, FaUser, FaUserCircle } from 'react-icons/fa'
import Nav from '../../Navbar'
import Image from 'next/image'
import axios from 'axios'

// Datos de ejemplo actualizados para incluir la categoría de género
const torneosResultadosMock = [
    {
        id: 1,
        nombre: "CC BNK HOLDING",
        fecha: "2024-03-15",
        ubicacion: "Madrid",
        categoria: "Primera División",
        genero: "Masculino",
        estado: "COMPLETED",
        hora: "01:19",
        resultados: [
            {
                equipo1: {
                    nombre: "A. Coello",
                    pais: "ARG",
                    bandera: "/ARG.jpg"
                },
                equipo2: {
                    nombre: "A. Tapia",
                    pais: "ESP",
                    bandera: "/ESP.jpg"
                },
                sets: [
                    { equipo1: 6, equipo2: 6 },
                    { equipo1: 4, equipo2: 2 }
                ]
            },
            {
                equipo1: {
                    nombre: "F. Stupaczuk",
                    pais: "ARG",
                    bandera: "/ARG.jpg"
                },
                equipo2: {
                    nombre: "M. Yanguas",
                    pais: "ESP",
                    bandera: "/ESP.jpg"
                },
                sets: [
                    { equipo1: 7, equipo2: 7 },
                    { equipo1: 5, equipo2: 6 }
                ]
            }
        ]
    },
    {
        id: 2,
        nombre: "Grand Slam Masters",
        fecha: "2024-04-20",
        ubicacion: "Barcelona",
        categoria: "Segunda División",
        genero: "Femenino",
        estado: "IN_PROGRESS",
        hora: "15:30",
        resultados: [
            {
                equipo1: {
                    nombre: "M. Sanchez",
                    pais: "ESP",
                    bandera: "/ESP.jpg"
                },
                equipo2: {
                    nombre: "L. García",
                    pais: "ARG",
                    bandera: "/ARG.jpg"
                },
                sets: [
                    { equipo1: 6, equipo2: 4 },
                    { equipo1: 7, equipo2: 5 }
                ]
            }
        ]
    },
    {
        id: 3,
        nombre: "Pro Challenge Series",
        fecha: "2024-05-10",
        ubicacion: "Lisboa",
        categoria: "Primera División",
        genero: "Masculino",
        estado: "PENDING",
        hora: "18:45",
        resultados: []
    },
    {
        id: 4,
        nombre: "Elite International Cup",
        fecha: "2024-06-01",
        ubicacion: "París",
        categoria: "Primera División",
        genero: "Femenino",
        estado: "COMPLETED",
        hora: "10:00",
        resultados: [
            {
                equipo1: {
                    nombre: "S. Martínez",
                    pais: "ARG",
                    bandera: "/ARG.jpg"
                },
                equipo2: {
                    nombre: "C. López",
                    pais: "ARG",
                    bandera: "/ARG.jpg"
                },
                sets: [
                    { equipo1: 6, equipo2: 3 },
                    { equipo1: 6, equipo2: 4 }
                ]
            }
        ]
    }
];


export default function TorneosResultados() {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedTorneo, setSelectedTorneo] = useState(null)
    const [generoFilter, setGeneroFilter] = useState('Todos')
    const [activeTab, setActiveTab] = useState('overview')
    const [torneosResultados, setTorneosResultados] = useState([]);
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

    const filteredTorneos = torneosResultados.filter(torneo =>
        (torneo.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            torneo.ubicacion.toLowerCase().includes(searchTerm.toLowerCase()) ||
            torneo.categoria.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (generoFilter === 'Todos' || torneo.genero === generoFilter)
    )

    const getTournaments = async () => {
        try {
            const response = await axios.get(`${backendUrl}/tournament/results`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                },
            });
            setTorneosResultados(response.data);
        } catch (error) {
            console.error('Error fetching tournaments:', error);
        }
    };

    useEffect(() => {
        getTournaments();
    }, []);

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
                                    <div className="relative bg-white rounded-lg shadow-xl p-8 m-4 max-w-2xl w-full">
                                        <button
                                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                                            onClick={() => setSelectedTorneo(null)}
                                        >
                                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>

                                        <h2 className="text-2xl font-bold mb-6 text-cyan-600">{selectedTorneo.nombre}</h2>

                                        {/* Tabs */}
                                        <div className="flex mb-6 border-b">
                                            <button
                                                className={`flex items-center px-4 py-2 ${activeTab === 'overview'
                                                    ? 'text-cyan-600 border-b-2 border-cyan-600'
                                                    : 'text-gray-500'}`}
                                                onClick={() => setActiveTab('overview')}
                                            >
                                                <FaInfoCircle className="mr-2" />
                                                Overview
                                            </button>
                                            <button
                                                className={`flex items-center px-4 py-2 ${activeTab === 'resultados'
                                                    ? 'text-cyan-600 border-b-2 border-cyan-600'
                                                    : 'text-gray-500'}`}
                                                onClick={() => setActiveTab('resultados')}
                                            >
                                                <FaListAlt className="mr-2" />
                                                Resultados
                                            </button>
                                        </div>

                                        {/* Overview Tab Content */}
                                        {activeTab === 'overview' && (
                                            <div className="space-y-4">
                                                <div className="bg-gray-50 p-4 rounded-lg">
                                                    <h3 className="font-semibold text-lg mb-3 text-gray-800">Información General</h3>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div>
                                                            <p className="text-gray-600 flex items-center mb-2">
                                                                <FaCalendarAlt className="mr-2 text-cyan-500" />
                                                                <span className="font-medium">Fecha:</span>
                                                            </p>
                                                            <p className="ml-6">{new Date(selectedTorneo.fecha).toLocaleDateString()}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-gray-600 flex items-center mb-2">
                                                                <FaMapMarkerAlt className="mr-2 text-cyan-500" />
                                                                <span className="font-medium">Ubicación:</span>
                                                            </p>
                                                            <p className="ml-6">{selectedTorneo.ubicacion}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-gray-600 flex items-center mb-2">
                                                                <FaTrophy className="mr-2 text-cyan-500" />
                                                                <span className="font-medium">Categoría:</span>
                                                            </p>
                                                            <p className="ml-6">{selectedTorneo.categoria}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-gray-600 flex items-center mb-2">
                                                                <FaVenusMars className="mr-2 text-cyan-500" />
                                                                <span className="font-medium">Género:</span>
                                                            </p>
                                                            <p className="ml-6">{selectedTorneo.genero}</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="bg-gray-50 p-4 rounded-lg">
                                                    <h3 className="font-semibold text-lg mb-3 text-gray-800">Horarios</h3>
                                                    <div className="space-y-2">
                                                        <p className="text-sm">
                                                            <span className="font-medium">Inicio del torneo:</span> 9:00 AM
                                                        </p>
                                                        <p className="text-sm">
                                                            <span className="font-medium">Fase de grupos:</span> 9:00 AM - 2:00 PM
                                                        </p>
                                                        <p className="text-sm">
                                                            <span className="font-medium">Eliminatorias:</span> 3:00 PM - 7:00 PM
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}


                                        {/* Resultados Tab Content - Updated Design */}
                                        {activeTab === 'resultados' && (
                                            <div className="space-y-4">
                                                <div className="bg-gray-50 rounded-lg overflow-hidden">
                                                    <div className="flex justify-between items-center bg-gray-100 px-4 py-2">
                                                        <div className="font-semibold text-gray-700">{selectedTorneo.nombre}</div>
                                                        <div className="flex items-center space-x-4">
                                                            <span className="text-xs text-cyan-600 font-semibold">
                                                                {selectedTorneo.genero.toUpperCase()}
                                                            </span>
                                                            <span className="text-xs text-gray-500">FINAL</span>
                                                        </div>
                                                    </div>

                                                    {selectedTorneo.resultados.map((partido, index) => (
                                                        <div key={index} className="border-t border-gray-200">
                                                            <div className="px-4 py-3">
                                                                <div className="grid grid-cols-[1fr,auto,1fr] gap-4 items-center">
                                                                    {/* Equipo 1 */}
                                                                    <div className="flex items-center gap-2">
                                                                        <FaUserCircle className="text-cyan-500" />
                                                                        <span className="font-medium">{partido.equipo1.nombre}</span>
                                                                    </div>

                                                                    {/* Resultados */}
                                                                    <div className="flex gap-2 justify-center min-w-[100px]">
                                                                        {partido.sets.map((set, setIndex) => (
                                                                            <div key={setIndex} className="flex gap-1">
                                                                                <span className="w-6 text-center font-medium">
                                                                                    {set.equipo1}
                                                                                </span>
                                                                                <span className="w-6 text-center font-medium">
                                                                                    {set.equipo2}
                                                                                </span>
                                                                            </div>
                                                                        ))}
                                                                    </div>

                                                                    {/* Equipo 2 */}
                                                                    <div className="flex items-center gap-2 justify-end">
                                                                        <span className="font-medium">{partido.equipo2.nombre}</span>
                                                                        <FaUserCircle className="text-cyan-500" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}

                                                    <div className="flex justify-between items-center bg-gray-50 px-4 py-2 border-t border-gray-200">
                                                        <span className="text-xs text-gray-500">{selectedTorneo.hora} COMPLETED</span>
                                                        <button className="text-xs text-cyan-600 hover:underline">
                                                            MATCH STATS
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
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

