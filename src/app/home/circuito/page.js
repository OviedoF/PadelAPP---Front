'use client'

import { useState } from 'react'
import { FaTrophy, FaCalendarAlt, FaMapMarkerAlt, FaNewspaper, FaMedal, FaChevronDown, FaChevronUp } from 'react-icons/fa'
import Nav from '../Navbar'

// Datos de ejemplo para el circuito
const circuitoData = {
  proximosTorneos: [
    { id: 1, nombre: "Gran Slam Madrid", fecha: "2024-05-10", ubicacion: "Madrid", categoria: "Grand Slam" },
    { id: 2, nombre: "Master Barcelona", fecha: "2024-06-15", ubicacion: "Barcelona", categoria: "Master" },
    { id: 3, nombre: "Open Sevilla", fecha: "2024-07-01", ubicacion: "Sevilla", categoria: "Open" },
  ],
  ranking: [
    { posicion: 1, nombre: "Juan Pérez", puntos: 10500 },
    { posicion: 2, nombre: "María García", puntos: 9800 },
    { posicion: 3, nombre: "Carlos Rodríguez", puntos: 9200 },
    { posicion: 4, nombre: "Laura Martínez", puntos: 8700 },
    { posicion: 5, nombre: "Antonio López", puntos: 8200 },
  ],
  noticias: [
    { id: 1, titulo: "Cambios en el sistema de puntuación para la próxima temporada", fecha: "2024-03-01" },
    { id: 2, titulo: "Nuevo patrocinador principal para el Circuito de Pádel", fecha: "2024-02-15" },
    { id: 3, titulo: "Entrevista exclusiva con el campeón del último Grand Slam", fecha: "2024-01-30" },
  ],
  categorias: [
    { nombre: "Grand Slam", puntos: "2000 puntos", premios: "€150,000" },
    { nombre: "Master", puntos: "1000 puntos", premios: "€75,000" },
    { nombre: "Open", puntos: "500 puntos", premios: "€30,000" },
    { nombre: "Challenger", puntos: "250 puntos", premios: "€15,000" },
  ]
}

export default function Circuito() {
  const [expandedCategory, setExpandedCategory] = useState(null)

  const toggleCategory = (category) => {
    if (expandedCategory === category) {
      setExpandedCategory(null)
    } else {
      setExpandedCategory(category)
    }
  }

  return (
    <>
      <Nav />

      <main className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-cyan-400 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">Circuito de Pádel</h1>

              <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4 text-cyan-600">Próximos Torneos</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {circuitoData.proximosTorneos.map((torneo) => (
                    <div key={torneo.id} className="bg-white rounded-lg shadow-md p-4">
                      <h3 className="font-bold text-lg mb-2">{torneo.nombre}</h3>
                      <p className="text-gray-600 flex items-center mb-1">
                        <FaCalendarAlt className="mr-2 text-cyan-500" />
                        {new Date(torneo.fecha).toLocaleDateString()}
                      </p>
                      <p className="text-gray-600 flex items-center mb-1">
                        <FaMapMarkerAlt className="mr-2 text-cyan-500" />
                        {torneo.ubicacion}
                      </p>
                      <p className="text-gray-600 flex items-center">
                        <FaTrophy className="mr-2 text-cyan-500" />
                        {torneo.categoria}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4 text-cyan-600">Ranking del Circuito</h2>
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <table className="min-w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posición</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jugador</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Puntos</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {circuitoData.ranking.map((jugador) => (
                        <tr key={jugador.posicion}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <FaMedal className={`mr-2 ${jugador.posicion === 1 ? 'text-yellow-400' :
                                  jugador.posicion === 2 ? 'text-gray-400' :
                                    jugador.posicion === 3 ? 'text-yellow-700' :
                                      'text-gray-400'
                                }`} />
                              <span className="text-sm font-medium text-gray-900">{jugador.posicion}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{jugador.nombre}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{jugador.puntos}</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-cyan-600">Categorías de Torneos</h2>
                <div className="space-y-4">
                  {circuitoData.categorias.map((categoria) => (
                    <div key={categoria.nombre} className="bg-white rounded-lg shadow-md overflow-hidden">
                      <button
                        className="w-full px-6 py-4 text-left focus:outline-none"
                        onClick={() => toggleCategory(categoria.nombre)}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-lg">{categoria.nombre}</span>
                          {expandedCategory === categoria.nombre ? (
                            <FaChevronUp className="text-cyan-500" />
                          ) : (
                            <FaChevronDown className="text-cyan-500" />
                          )}
                        </div>
                      </button>
                      {expandedCategory === categoria.nombre && (
                        <div className="px-6 py-4 bg-gray-50">
                          <p className="text-gray-700">Puntos: {categoria.puntos}</p>
                          <p className="text-gray-700">Premios: {categoria.premios}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}