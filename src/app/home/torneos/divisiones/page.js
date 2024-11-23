'use client'

import { useState } from 'react'
import { FaCalendarAlt, FaMapMarkerAlt, FaMars, FaVenus, FaEnvelope, FaWhatsapp, FaTimes } from 'react-icons/fa'
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
    genero: "Masculino",
    email: "torneo1@example.com",
    whatsapp: "+34123456789",
    descripcion: "Torneo clasificatorio para el ascenso a la Primera División Masculina. Los mejores equipos competirán por un lugar en la máxima categoría."
  },
  {
    nombre: "Torneo Ascenso Primera División Femenino",
    fecha: "2024-03-16",
    ubicacion: "Madrid",
    division: "Primera División",
    genero: "Femenino",
    email: "torneo2@example.com",
    whatsapp: "+34123456790",
    descripcion: "Torneo clasificatorio para el ascenso a la Primera División Femenina. Los mejores equipos competirán por un lugar en la máxima categoría."
  },
  {
    nombre: "Playoff Segunda División Masculino",
    fecha: "2024-03-22",
    ubicacion: "Barcelona",
    division: "Segunda División",
    genero: "Masculino",
    email: "torneo3@example.com",
    whatsapp: "+34123456791",
    descripcion: "Playoff de la Segunda División Masculina para determinar el campeón de la categoría."
  },
  {
    nombre: "Playoff Segunda División Femenino",
    fecha: "2024-03-23",
    ubicacion: "Barcelona",
    division: "Segunda División",
    genero: "Femenino",
    email: "torneo4@example.com",
    whatsapp: "+34123456792",
    descripcion: "Playoff de la Segunda División Femenina para determinar el campeón de la categoría."
  },
  {
    nombre: "Copa Promoción Masculina",
    fecha: "2024-04-01",
    ubicacion: "Valencia",
    division: "Tercera División",
    genero: "Masculino",
    email: "torneo5@example.com",
    whatsapp: "+34123456793",
    descripcion: "Copa de Promoción para equipos de la Tercera División Masculina."
  },
  {
    nombre: "Copa Promoción Femenina",
    fecha: "2024-04-02",
    ubicacion: "Valencia",
    division: "Tercera División",
    genero: "Femenino",
    email: "torneo6@example.com",
    whatsapp: "+34123456794",
    descripcion: "Copa de Promoción para equipos de la Tercera División Femenina."
  }
]

export default function TorneosDivisiones() {
  const [selectedDivision, setSelectedDivision] = useState("Primera División")
  const [selectedGender, setSelectedGender] = useState("Masculino")
  const [selectedTorneo, setSelectedTorneo] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = (torneo) => {
    setSelectedTorneo(torneo)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setSelectedTorneo(null)
    setIsModalOpen(false)
  }

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
                      <div 
                        key={torneo.nombre} 
                        className="bg-gray-50 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => openModal(torneo)}
                      >
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

      {/* Modal */}
      {isModalOpen && selectedTorneo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-lg p-8 max-w-md w-full m-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">{selectedTorneo.nombre}</h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <FaTimes size={24} />
              </button>
            </div>
            <p className="text-gray-600 flex items-center mb-2">
              <FaCalendarAlt className="mr-2 text-cyan-500" />
              {new Date(selectedTorneo.fecha).toLocaleDateString()}
            </p>
            <p className="text-gray-600 flex items-center mb-4">
              <FaMapMarkerAlt className="mr-2 text-cyan-500" />
              {selectedTorneo.ubicacion}
            </p>
            <p className="text-gray-700 mb-4">{selectedTorneo.descripcion}</p>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Contacto:</h3>
            <p className="text-gray-600 flex items-center mb-2">
              <FaEnvelope className="mr-2 text-cyan-500" />
              <a href={`mailto:${selectedTorneo.email}`} className="hover:underline">{selectedTorneo.email}</a>
            </p>
            <p className="text-gray-600 flex items-center">
              <FaWhatsapp className="mr-2 text-cyan-500" />
              <a href={`https://wa.me/${selectedTorneo.whatsapp}`} target="_blank" rel="noopener noreferrer" className="hover:underline">{selectedTorneo.whatsapp}</a>
            </p>
          </div>
        </div>
      )}
    </>
  )
}

