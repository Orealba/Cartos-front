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
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
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
        <div className="max-w-screen-sm grid grid-cols-3 items-center mx-auto py-3">
          <button
            onClick={toggleMenu}
            type="button"
            className="col-start-1 inline-flex items-center p-2 m-1 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400"
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
            className={`${
              isMenuOpen ? 'block' : 'hidden'
            } col-start-2 w-full md:block md:w-auto mx-auto`}
            id="navbar-solid-bg">
            <ul className="flex flex-col font-medium mt-4 font-['NexaBold'] rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent dark:bg-transparent md:dark:bg-transparent dark:border-gray-700 justify-center">
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
                    className="absolute right-0 mt-2 w-48 bg-myGreen rounded-md shadow-lg py-1 cursor-pointer">
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
