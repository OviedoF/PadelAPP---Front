'use client'

import { useEffect, useState } from 'react'
import { FaTrophy, FaCalendarAlt, FaMapMarkerAlt, FaMedal, FaChevronDown, FaChevronUp, FaMars, FaVenus, FaEnvelope, FaWhatsapp, FaTimes } from 'react-icons/fa'
import Nav from '../Navbar'
import axios from 'axios'

export default function Circuito() {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL
  const [expandedCategory, setExpandedCategory] = useState(null)
  const [selectedGender, setSelectedGender] = useState('todos')
  const [selectedDivision, setSelectedDivision] = useState('todas')
  const [selectedTorneo, setSelectedTorneo] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [circuitoData, setCircuitoData] = useState({
    categorias: []
  })

  const toggleCategory = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category)
  }

  const openModal = (torneo) => {
    setSelectedTorneo(torneo)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setSelectedTorneo(null)
    setIsModalOpen(false)
  }

  const filteredTorneos = (torneos) => {
    return torneos.filter(
      torneo =>
        (selectedGender === 'todos' || torneo.genero === selectedGender)
    )
  }

  const getTournaments = async () => {
    try {
      const response = await axios.get(`${backendUrl}/tournament/circuito`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      setCircuitoData(response.data);
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

<main className="min-h-screen bg-gray-100 py-6 px-4 flex flex-col justify-center sm:py-12">
  <div className="relative py-3 w-full sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto">
    
    {/* Fondo decorativo sólo en desktop */}
    <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-cyan-500 to-cyan-400 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
    
    <div className="relative px-4 py-10 bg-white shadow-lg rounded-xl sm:rounded-3xl sm:p-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-4xl font-bold text-center text-gray-900 mb-8">Circuito de Pádel</h1>

        {/* Filtro por género */}
        <div className="mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-cyan-600">Filtrar por género</h2>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <button
              className={`flex items-center justify-center px-4 py-2 rounded-full ${selectedGender === 'todos' ? 'bg-cyan-500 text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => setSelectedGender('todos')}
            >
              Todos
            </button>
            <button
              className={`flex items-center justify-center px-4 py-2 rounded-full ${selectedGender === 'masculino' ? 'bg-cyan-500 text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => setSelectedGender('masculino')}
            >
              <FaMars className="mr-2" /> Masculino
            </button>
            <button
              className={`flex items-center justify-center px-4 py-2 rounded-full ${selectedGender === 'femenino' ? 'bg-cyan-500 text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => setSelectedGender('femenino')}
            >
              <FaVenus className="mr-2" /> Femenino
            </button>
          </div>
        </div>

        {/* Filtro por división (comentado si no se usa) */}
        {/*
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-cyan-600">Filtrar por división</h2>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            {["todas", "Primera", "Segunda", "Tercera"].map((division) => (
              <button
                key={division}
                className={`flex items-center justify-center px-4 py-2 rounded-full ${selectedDivision === division ? 'bg-cyan-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                onClick={() => setSelectedDivision(division)}
              >
                {division.charAt(0).toUpperCase() + division.slice(1)}
              </button>
            ))}
          </div>
        </div>
        */}

        {/* Sección de torneos */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-cyan-600">Categorías de Torneos</h2>
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
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {filteredTorneos(categoria.torneos).map((torneo) => (
                        <div
                          key={torneo.id}
                          className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow flex flex-col"
                          onClick={() => openModal(torneo)}
                        >
                          <h4 className="font-bold text-lg mb-2">{torneo.nombre}</h4>
                          <p className="text-gray-600 flex items-center mb-1">
                            <FaCalendarAlt className="mr-2 text-cyan-500" />
                            {new Date(torneo.fecha).toLocaleDateString()}
                          </p>
                          <p className="text-gray-600 flex items-center mb-1">
                            <FaMapMarkerAlt className="mr-2 text-cyan-500" />
                            {torneo.ubicacion}
                          </p>
                          <p className="text-gray-600 flex items-center">
                            {torneo.genero === 'masculino'
                              ? <><FaMars className="mr-2 text-cyan-500" /> Masculino</>
                              : <><FaVenus className="mr-2 text-cyan-500" /> Femenino</>}
                          </p>
                        </div>
                      ))}
                    </div>
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
            <p className="text-gray-600 flex items-center mb-2">
              <FaMapMarkerAlt className="mr-2 text-cyan-500" />
              {selectedTorneo.ubicacion}
            </p>
            <p className="text-gray-600 flex items-center mb-2">
              <FaTrophy className="mr-2 text-cyan-500" />
              {selectedTorneo.categoria}
            </p>
            <p className="text-gray-600 flex items-center mb-4">
              {selectedTorneo.genero === 'masculino' ? <FaMars className="mr-2 text-cyan-500" /> : <FaVenus className="mr-2 text-cyan-500" />}
              {selectedTorneo.genero.charAt(0).toUpperCase() + selectedTorneo.genero.slice(1)}
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

