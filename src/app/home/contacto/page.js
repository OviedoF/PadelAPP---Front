'use client'
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'
import Nav from '../Navbar'

export default function Contacto() {
    return (
        <>
            <Nav />

            <main className="min-h-screen bg-gray-100 py-6 px-4 flex flex-col justify-center sm:py-12">
                <div className="relative py-3 w-full sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto">
                    {/* Fondo decorativo solo en pantallas grandes */}
                    <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-cyan-500 to-cyan-400 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>

                    <div className="relative px-4 py-10 bg-white shadow-lg rounded-xl sm:rounded-3xl sm:p-20">
                        <div className="max-w-4xl mx-auto">
                            <h1 className="text-2xl sm:text-4xl font-bold text-center text-gray-900 mb-8">Contacto</h1>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Formulario */}
                                <div>
                                    <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-cyan-600">Envíanos un mensaje</h2>
                                    <form
                                        action="https://formsubmit.co/oviedofederico39@gmail.com"
                                        method="POST"
                                        className="space-y-4"
                                    >
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                required
                                                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                required
                                                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Asunto</label>
                                            <input
                                                type="text"
                                                id="subject"
                                                name="subject"
                                                required
                                                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Mensaje</label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                rows={4}
                                                required
                                                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500"
                                            ></textarea>
                                        </div>

                                        <div>
                                            <button
                                                type="submit"
                                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                                            >
                                                Enviar mensaje
                                            </button>
                                        </div>

                                        <input type="hidden" name="_captcha" value="false" />
                                        <input type="hidden" name="_next" value="https://google.com" />
                                    </form>
                                </div>

                                {/* Información de contacto */}
                                <div>
                                    <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-cyan-600">Información de contacto</h2>
                                    <div className="space-y-4 text-sm sm:text-base">
                                        <p className="flex items-center text-gray-600">
                                            <FaMapMarkerAlt className="mr-2 text-cyan-500" />
                                            Calle Pádel, 123, Buenos Aires, Argentina
                                        </p>
                                        <p className="flex items-center text-gray-600">
                                            <FaPhone className="mr-2 text-cyan-500" />
                                            +34 912 345 678
                                        </p>
                                        <p className="flex items-center text-gray-600">
                                            <FaEnvelope className="mr-2 text-cyan-500" />
                                            info@padelrankings.com
                                        </p>
                                    </div>

                                    <h3 className="text-lg sm:text-xl font-semibold mt-8 mb-4 text-cyan-600">Síguenos en redes sociales</h3>
                                    <div className="flex space-x-4">
                                        <a href="#" className="text-gray-400 hover:text-cyan-500">
                                            <FaFacebook size={24} />
                                        </a>
                                        <a href="#" className="text-gray-400 hover:text-cyan-500">
                                            <FaTwitter size={24} />
                                        </a>
                                        <a href="#" className="text-gray-400 hover:text-cyan-500">
                                            <FaInstagram size={24} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}