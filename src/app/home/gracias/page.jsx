import Nav from '../Navbar'
import { FaCheckCircle } from 'react-icons/fa'

export default function Gracias() {
  return (
    <>
      <Nav />

      <main className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-cyan-400 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20 text-center">
            <div className="max-w-2xl mx-auto">
              <FaCheckCircle size={64} className="text-green-500 mx-auto mb-6" />
              <h1 className="text-4xl font-bold text-gray-900 mb-4">¡Gracias por tu mensaje!</h1>
              <p className="text-lg text-gray-700 mb-6">
                Hemos recibido tu mensaje correctamente. Nos pondremos en contacto contigo lo antes posible.
              </p>
              <a
                href="/"
                className="inline-block px-6 py-3 bg-cyan-600 text-white font-medium text-sm rounded-md shadow hover:bg-cyan-700 transition"
              >
                Volver al inicio
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
