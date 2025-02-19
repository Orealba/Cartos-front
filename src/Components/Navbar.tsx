import { useState, useEffect, useRef } from 'react';
import logo from '../assets/Images/Logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { supabase } from '../SupabaseClient';
import { Session } from '@supabase/supabase-js';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activePage, setActivePage] = useState('home');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { logout, isAuthenticated } = useAuth();
  const [session, setSession] = useState<Session | null>(null);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    setIsDropdownOpen(false);
  }, [session]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const menu = document.getElementById('navbar-solid-bg');
      const hamburgerButton = document.querySelector(
        '[aria-controls="navbar-solid-bg"]',
      );

      if (
        menu &&
        hamburgerButton &&
        !menu.contains(event.target as Node) &&
        !hamburgerButton.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="fixed top-0 left-0 right-0 w-full z-50 bg-myGray">
      <div className="flex justify-center mt-5">
        <Link
          to="/home"
          className="flex items-center">
          <img
            src={logo}
            className="h-12  md:h-15 lg:h-15 transition-all duration-300"
            alt="Logo"
          />
        </Link>
      </div>
      <nav>
        <div className="max-w-screen-sm flex justify-center items-center mx-auto py-3 relative">
          <button
            onClick={toggleMenu}
            type="button"
            className="absolute left-4 md:hidden inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none dark:text-gray-400"
            aria-controls="navbar-solid-bg"
            aria-expanded={isMenuOpen}>
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            id="navbar-solid-bg"
            className={`${
              isMenuOpen ? 'block' : 'hidden'
            } absolute left-0 top-full w-full md:relative md:block md:w-auto mx-auto bg-myGray md:bg-transparent z-50`}>
            <ul className="flex flex-col font-medium mt-4 font-['NexaBold'] md:flex-row md:space-x-8 md:mt-0">
              <li className="relative">
                <Link
                  to="/home"
                  onClick={() => setActivePage('home')}
                  className={`block text-white relative pb-2 ${
                    activePage === 'home'
                      ? 'after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-white'
                      : ''
                  }`}
                  aria-current="page">
                  HOME
                </Link>
              </li>
              <li className="relative">
                <Link
                  to="/transacciones"
                  onClick={() => setActivePage('pagos')}
                  className={`block py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-myYellow dark:text-white md:dark:hover:text-myYellow dark:hover:bg-myYellow dark:hover:text-white md:dark:hover:bg-transparent relative pb-2 ${
                    activePage === 'pagos'
                      ? 'after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-white'
                      : ''
                  }`}>
                  TRANSACCIONES
                </Link>
              </li>
              <li className="relative">
                <a
                  href="#"
                  onClick={() => setActivePage('resumen')}
                  className={`block py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-myYellow dark:text-white md:dark:hover:text-myYellow dark:hover:bg-myYellow dark:hover:text-white md:dark:hover:bg-transparent relative pb-2 ${
                    activePage === 'resumen'
                      ? 'after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-white'
                      : ''
                  }`}>
                  RESUMEN
                </a>
              </li>
              <li className="relative">
                <button
                  onClick={() => session && toggleDropdown()}
                  className={`block py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-myYellow dark:text-white md:dark:hover:text-myYellow dark:hover:bg-myYellow dark:hover:text-white md:dark:hover:bg-transparent ${
                    session ? 'cursor-pointer' : 'cursor-not-allowed'
                  }`}>
                  <FontAwesomeIcon
                    icon={faUser}
                    className="w-6 h-6"
                  />
                </button>
                {session && isDropdownOpen && (
                  <div
                    ref={dropdownRef}
                    className="absolute left-0 mt-2 w-48 bg-myGreen rounded-md shadow-lg py-1 cursor-pointer z-50">
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-myYellow hover:bg-opacity-90 cursor-pointer border rounded-lg border-myYellow">
                      Cerrar Sesión
                    </button>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
