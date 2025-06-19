'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaTrophy, FaCircle, FaUsers, FaSearch, FaPhoneAlt, FaBars, FaTimes } from 'react-icons/fa'
import { CiLogout } from "react-icons/ci";
import routes from '../routes'

const NavItem = ({ href, text, icon: Icon, dropdownItems = null }) => {
  const pathname = usePathname()
  const isActive = pathname === href
  const [isOpen, setIsOpen] = useState(false)

  if (dropdownItems) {
    return (
      <nav className="relative group z-10 flex">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
            isActive ? 'text-cyan-500' : 'text-gray-700 hover:text-cyan-500'
          }`}
        >
          <Icon className="w-5 h-5 mr-2" />
          {text}
          <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        {isOpen && (
          <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg top-12 bg-white ring-1 ring-black ring-opacity-5">
            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              {dropdownItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                  target={item.blank ? '_blank' : '_self'}
                >
                  {item.text}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    )
  }

  return (
    <Link
      href={href}
      className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
        isActive ? 'text-cyan-500' : 'text-gray-700 hover:text-blue-600'
      }`}
    >
      <Icon className="w-5 h-5 mr-2" />
      {text}
    </Link>
  )
}

export default function Nav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    {
      href: '/torneos',
      text: 'Torneos',
      icon: FaTrophy,
      dropdownItems: [
        { href: routes.torneosCalendario, text: 'Calendario' },
        { href: routes.torneosResultados, text: 'Resultados' },
        { href: routes.circuito, text: 'Circuito' },
      ],
    },
    { href: routes.rankingJugadores, text: 'Ranking de Jugadores', icon: FaUsers },
    {
      href: '/contacto',
      text: 'Contacto',
      icon: FaPhoneAlt,
      dropdownItems: [
        { href: 'https://wa.me/541133062053?text=%C2%A1Hola%21%20quiero%20sumar%20un%20club%20a%20su%20web.', text: 'Suma tu Club', blank: true },
        { href: routes.contacto, text: 'Contacto' },
      ],
    },
  ]

  return (
    <nav className="bg-white shadow-md">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-2xl font-bold text-cyan-500">
                Padel Rankings
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navItems.map((item, index) => (
                <NavItem key={index} {...item} />
              ))}
            </div>
          </div>

          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <Link
              href={routes.login}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <CiLogout className="w-5 h-5 mr-2" />
              Cerrar Sesión
            </Link>
          </div>

          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <FaTimes className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <FaBars className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </section>

      {isMobileMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {navItems.map((item, index) => (
              <div key={index}>
                {item.dropdownItems ? (
                  <div className="px-3 py-2">
                    <span className="text-sm font-medium text-gray-500">{item.text}</span>
                    <div className="mt-1 space-y-1">
                      {item.dropdownItems.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          href={subItem.href}
                          className="block pl-3 pr-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                          target={subItem.blank ? '_blank' : '_self'}
                        >
                          {subItem.text}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="block pl-3 pr-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                    target={item.blank ? '_blank' : '_self'}
                  >
                    <item.icon className="inline-block w-5 h-5 mr-2" />
                    {item.text}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}