'use client'
import { useEffect, useState } from 'react'
import { FaCalendarAlt, FaMapMarkerAlt, FaTrophy, FaList, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import Nav from '../../Navbar'
// Datos de ejemplo para los torneos
import axios from 'axios'
import { FaTimes, FaEnvelope, FaWhatsapp, FaMars, FaVenus } from 'react-icons/fa'

export default function TorneosCalendario() {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewMode, setViewMode] = useState('calendar') // 'calendar' or 'list'
  const [selectedTorneo, setSelectedTorneo] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [torneosData, setTorneosData] = useState([])

  const openModal = (torneo) => {
    setSelectedTorneo(torneo)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setSelectedTorneo(null)
    setIsModalOpen(false)
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }
  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const getTournaments = async () => {
    try {
      const response = await axios.get(`${backendUrl}/tournament/calendar`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      setTorneosData(response.data);
    } catch (error) {
      console.error('Error fetching tournaments:', error);
    }
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate)
    const firstDayOfMonth = getFirstDayOfMonth(currentDate)
    const days = []
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>)
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
      const dateString = date.toISOString().split('T')[0]
      const tournamentsOnDay = torneosData.filter(torneo => torneo.fecha === dateString)
      days.push(
        <div key={day} className={`p-2 border border-gray-200 ${tournamentsOnDay.length > 0 ? 'bg-cyan-100' : ''}`}>
          <span className={`font-bold ${tournamentsOnDay.length > 0 ? 'text-cyan-600' : ''}`}>{day}</span>
          {tournamentsOnDay.map(torneo => (
            <div key={torneo.id} className="text-xs mt-1 p-1 bg-cyan-500 text-white rounded truncate cursor-pointer" onClick={() => openModal(torneo)}>
              {torneo.nombre}
            </div>
          ))}
        </div>
      )
    }
    return days
  }

  const renderList = () => {
    return torneosData
      .filter(torneo => new Date(torneo.fecha).getMonth() === currentDate.getMonth())
      .sort((a, b) => new Date(a.fecha) - new Date(b.fecha))
      .map(torneo => (
        <div key={torneo.id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => openModal(torneo)}>
          <h3 className="font-bold text-lg mb-2 text-cyan-600">{torneo.nombre}</h3>
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
            {torneo?.categoria}
          </p>
        </div>
      ))
  }

  useEffect(() => {
    getTournaments()
  }, [currentDate])

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-gray-100 py-6 px-4 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 w-full sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto">

          {/* Fondo sólo en desktop */}
          <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-cyan-500 to-cyan-400 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>

          <div className="relative px-4 py-10 bg-white shadow-lg rounded-xl sm:rounded-3xl sm:p-20">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-2xl sm:text-4xl font-bold text-center text-gray-900 mb-8">Calendario de Torneos</h1>

              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 space-y-4 sm:space-y-0">
                <div className="flex justify-center sm:justify-start items-center">
                  <button onClick={prevMonth} className="mr-4 text-cyan-500 hover:text-cyan-600 focus:outline-none">
                    <FaChevronLeft size={20} />
                  </button>
                  <h2 className="text-xl sm:text-2xl font-semibold text-center sm:text-left">
                    {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                  </h2>
                  <button onClick={nextMonth} className="ml-4 text-cyan-500 hover:text-cyan-600 focus:outline-none">
                    <FaChevronRight size={20} />
                  </button>
                </div>
                <div className="flex justify-center sm:justify-end space-x-2">
                  <button
                    onClick={() => setViewMode('calendar')}
                    className={`p-2 rounded focus:outline-none ${viewMode === 'calendar' ? 'bg-cyan-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                  >
                    <FaCalendarAlt />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded focus:outline-none ${viewMode === 'list' ? 'bg-cyan-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                  >
                    <FaList />
                  </button>
                </div>
              </div>

              {viewMode === 'calendar' && (
                <>
                  <div className="grid grid-cols-2 sm:grid-cols-7 gap-1 mb-4">
                    {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
                      <div key={day} className="text-center font-bold text-cyan-600 text-sm sm:text-base">{day}</div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-7 gap-1">
                    {renderCalendar()}
                  </div>
                </>
              )}

              {viewMode === 'list' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {renderList()}
                </div>
              )}
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