'use client'

import { useState } from 'react'
import { FaTrophy, FaUsers, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa'
import Nav from '../../Navbar'

// Datos de ejemplo para las divisiones
const divisionesData = [
  {
    division: "Primera División",
    equipos: [
      { nombre: "Club Pádel Madrid", puntos: 1200, jugados: 10, ganados: 8 },
      { nombre: "Barcelona Pádel Pro", puntos: 1150, jugados: 10, ganados: 7 },
      { nombre: "Valencia Pádel Club", puntos: 1100, jugados: 10, ganados: 7 },
      { nombre: "Sevilla Pádel Team", puntos: 1050, jugados: 10, ganados: 6 },
    ]
  },
  {
    division: "Segunda División",
    equipos: [
      { nombre: "Málaga Pádel Club", puntos: 950, jugados: 10, ganados: 6 },
      { nombre: "Zaragoza Pádel", puntos: 900, jugados: 10, ganados: 5 },
      { nombre: "Bilbao Pádel Pro", puntos: 850, jugados: 10, ganados: 5 },
      { nombre: "Vigo Pádel Club", puntos: 800, jugados: 10, ganados: 4 },
    ]
  },
  {
    division: "Tercera División",
    equipos: [
      { nombre: "Alicante Pádel", puntos: 750, jugados: 10, ganados: 5 },
      { nombre: "Granada Pádel Club", puntos: 700, jugados: 10, ganados: 4 },
      { nombre: "Murcia Pádel Team", puntos: 650, jugados: 10, ganados: 4 },
      { nombre: "Córdoba Pádel Pro", puntos: 600, jugados: 10, ganados: 3 },
    ]
  }
]

const proximosTorneos = [
  {
    nombre: "Torneo Ascenso Primera División",
    fecha: "2024-03-15",
    ubicacion: "Madrid",
    division: "Primera División"
  },
  {
    nombre: "Playoff Segunda División",
    fecha: "2024-03-22",
    ubicacion: "Barcelona",
    division: "Segunda División"
  },
  {
    nombre: "Copa Promoción",
    fecha: "2024-04-01",
    ubicacion: "Valencia",
    division: "Tercera División"
  }
]

export default function TorneosDivisiones() {
  const [selectedDivision, setSelectedDivision] = useState("Primera División")

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-cyan-400 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">Divisiones de Torneos</h1>

            {/* Selector de División */}
            <div className="flex justify-center space-x-4 mb-8">
              {divisionesData.map((division) => (
                <button
                  key={division.division}
                  onClick={() => setSelectedDivision(division.division)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedDivision === division.division
                      ? 'bg-cyan-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-cyan-100'
                  }`}
                >
                  {division.division}
                </button>
              ))}
            </div>

            {/* Tabla de Clasificación */}
            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <FaTrophy className="mr-2 text-cyan-500" />
                Clasificación {selectedDivision}
              </h2>
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posición</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Club</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Puntos</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PJ</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PG</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {divisionesData
                      .find(d => d.division === selectedDivision)
                      ?.equipos.map((equipo, index) => (
                        <tr key={equipo.nombre} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <span className={`flex items-center justify-center w-8 h-8 rounded-full ${
                                index === 0 ? 'bg-yellow-100 text-yellow-800' :
                                index === 1 ? 'bg-gray-100 text-gray-800' :
                                index === 2 ? 'bg-orange-100 text-orange-800' :
                                'bg-gray-50 text-gray-600'
                              }`}>
                                {index + 1}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <FaUsers className="mr-2 text-cyan-500" />
                              <span className="font-medium text-gray-900">{equipo.nombre}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {equipo.puntos}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {equipo.jugados}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {equipo.ganados}
                          </td>
                        </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Próximos Torneos de la División */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <FaCalendarAlt className="mr-2 text-cyan-500" />
                Próximos Torneos
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {proximosTorneos
                  .filter(torneo => torneo.division === selectedDivision)
                  .map((torneo) => (
                    <div key={torneo.nombre} className="bg-gray-50 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                      <h3 className="font-medium text-gray-900 mb-2">{torneo.nombre}</h3>
                      <p className="text-gray-600 flex items-center mb-1">
                        <FaCalendarAlt className="mr-2 text-cyan-500" />
                        {new Date(torneo.fecha).toLocaleDateString()}
                      </p>
                      <p className="text-gray-600 flex items-center">
                        <FaMapMarkerAlt className="mr-2 text-cyan-500" />
                        {torneo.ubicacion}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    </>
  )
}