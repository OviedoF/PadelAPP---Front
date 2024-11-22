'use client'

import { useState } from 'react'
import { FaTrophy, FaUsers, FaCalendarAlt, FaMapMarkerAlt, FaMars, FaVenus } from 'react-icons/fa'
import Nav from '../../Navbar'

// Datos de ejemplo para las divisiones
const divisionesData = [
  {
    division: "Primera División",
    genero: "Masculino",
    equipos: [
      { nombre: "Club Pádel Madrid", puntos: 1200, jugados: 10, ganados: 8 },
      { nombre: "Barcelona Pádel Pro", puntos: 1150, jugados: 10, ganados: 7 },
      { nombre: "Valencia Pádel Club", puntos: 1100, jugados: 10, ganados: 7 },
      { nombre: "Sevilla Pádel Team", puntos: 1050, jugados: 10, ganados: 6 },
    ]
  },
  {
    division: "Primera División",
    genero: "Femenino",
    equipos: [
      { nombre: "Madrid Pádel Femenino", puntos: 1180, jugados: 10, ganados: 8 },
      { nombre: "Barcelona Ladies Pádel", puntos: 1130, jugados: 10, ganados: 7 },
      { nombre: "Valencia Pádel Femenino", puntos: 1080, jugados: 10, ganados: 6 },
      { nombre: "Sevilla Queens Pádel", puntos: 1030, jugados: 10, ganados: 6 },
    ]
  },
  {
    division: "Segunda División",
    genero: "Masculino",
    equipos: [
      { nombre: "Málaga Pádel Club", puntos: 950, jugados: 10, ganados: 6 },
      { nombre: "Zaragoza Pádel", puntos: 900, jugados: 10, ganados: 5 },
      { nombre: "Bilbao Pádel Pro", puntos: 850, jugados: 10, ganados: 5 },
      { nombre: "Vigo Pádel Club", puntos: 800, jugados: 10, ganados: 4 },
    ]
  },
  {
    division: "Segunda División",
    genero: "Femenino",
    equipos: [
      { nombre: "Málaga Ladies Pádel", puntos: 930, jugados: 10, ganados: 6 },
      { nombre: "Zaragoza Pádel Femenino", puntos: 880, jugados: 10, ganados: 5 },
      { nombre: "Bilbao Queens Pádel", puntos: 830, jugados: 10, ganados: 5 },
      { nombre: "Vigo Pádel Femenino", puntos: 780, jugados: 10, ganados: 4 },
    ]
  },
  {
    division: "Tercera División",
    genero: "Masculino",
    equipos: [
      { nombre: "Alicante Pádel", puntos: 750, jugados: 10, ganados: 5 },
      { nombre: "Granada Pádel Club", puntos: 700, jugados: 10, ganados: 4 },
      { nombre: "Murcia Pádel Team", puntos: 650, jugados: 10, ganados: 4 },
      { nombre: "Córdoba Pádel Pro", puntos: 600, jugados: 10, ganados: 3 },
    ]
  },
  {
    division: "Tercera División",
    genero: "Femenino",
    equipos: [
      { nombre: "Alicante Pádel Femenino", puntos: 730, jugados: 10, ganados: 5 },
      { nombre: "Granada Ladies Pádel", puntos: 680, jugados: 10, ganados: 4 },
      { nombre: "Murcia Queens Pádel", puntos: 630, jugados: 10, ganados: 4 },
      { nombre: "Córdoba Pádel Femenino", puntos: 580, jugados: 10, ganados: 3 },
    ]
  }
]

const proximosTorneos = [
  {
    nombre: "Torneo Ascenso Primera División Masculino",
    fecha: "2024-03-15",
    ubicacion: "Madrid",
    division: "Primera División",
    genero: "Masculino"
  },
  {
    nombre: "Torneo Ascenso Primera División Femenino",
    fecha: "2024-03-16",
    ubicacion: "Madrid",
    division: "Primera División",
    genero: "Femenino"
  },
  {
    nombre: "Playoff Segunda División Masculino",
    fecha: "2024-03-22",
    ubicacion: "Barcelona",
    division: "Segunda División",
    genero: "Masculino"
  },
  {
    nombre: "Playoff Segunda División Femenino",
    fecha: "2024-03-23",
    ubicacion: "Barcelona",
    division: "Segunda División",
    genero: "Femenino"
  },
  {
    nombre: "Copa Promoción Masculina",
    fecha: "2024-04-01",
    ubicacion: "Valencia",
    division: "Tercera División",
    genero: "Masculino"
  },
  {
    nombre: "Copa Promoción Femenina",
    fecha: "2024-04-02",
    ubicacion: "Valencia",
    division: "Tercera División",
    genero: "Femenino"
  }
]

export default function TorneosDivisiones() {
  const [selectedDivision, setSelectedDivision] = useState("Primera División")
  const [selectedGender, setSelectedGender] = useState("Masculino")

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
              <div className="flex justify-center space-x-4 mb-4">
                {Array.from(new Set(divisionesData.map(d => d.division))).map((division) => (
                  <button
                    key={division}
                    onClick={() => setSelectedDivision(division)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedDivision === division
                        ? 'bg-cyan-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-cyan-100'
                    }`}
                  >
                    {division}
                  </button>
                ))}
              </div>

              {/* Selector de Género */}
              <div className="flex justify-center space-x-4 mb-8">
                {['Masculino', 'Femenino'].map((genero) => (
                  <button
                    key={genero}
                    onClick={() => setSelectedGender(genero)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center ${
                      selectedGender === genero
                        ? 'bg-cyan-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-cyan-100'
                    }`}
                  >
                    {genero === 'Masculino' ? <FaMars className="mr-2" /> : <FaVenus className="mr-2" />}
                    {genero}
                  </button>
                ))}
              </div>

              {/* Tabla de Clasificación */}
              <div className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                  <FaTrophy className="mr-2 text-cyan-500" />
                  Clasificación {selectedDivision} {selectedGender}
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
                        .find(d => d.division === selectedDivision && d.genero === selectedGender)
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
                    .filter(torneo => torneo.division === selectedDivision && torneo.genero === selectedGender)
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

