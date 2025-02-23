import { useState } from 'react';
import logo from '../assets/Images/Logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activePage, setActivePage] = useState('home');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="fixed top-0 left-0 right-0 w-full z-50 bg-myGray">
      <div className="flex justify-center mt-5">
        <a
          href="#"
          className="flex items-center">
          <img
            src={logo}
            className="h-12  md:h-15 lg:h-15 transition-all duration-300"
            alt="Logo"
          />
        </a>
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
                <a
                  href="#"
                  onClick={() => setActivePage('home')}
                  className={`block text-white relative pb-2 ${
                    activePage === 'home'
                      ? 'after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-white'
                      : ''
                  }`}
                  aria-current="page">
                  HOME
                </a>
              </li>
              <li className="relative">
                <a
                  href="#"
                  onClick={() => setActivePage('pagos')}
                  className={`block py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-myYellow dark:text-white md:dark:hover:text-myYellow dark:hover:bg-myYellow dark:hover:text-white md:dark:hover:bg-transparent relative pb-2 ${
                    activePage === 'pagos'
                      ? 'after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-white'
                      : ''
                  }`}>
                  PAGOS
                </a>
              </li>
              <li className="relative">
                <a
                  href="#"
                  onClick={() => setActivePage('resumen')}
                  className={`block py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent relative pb-2 ${
                    activePage === 'resumen'
                      ? 'after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-white'
                      : ''
                  }`}>
                  RESUMEN
                </a>
              </li>
            </ul>
          </div>
          <div
            className={`${
              isMenuOpen ? 'block' : 'hidden'
            } col-start-3 w-full md:block md:w-auto justify-self-end`}>
            <ul className=" ">
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 md:p-0 text-myYellow rounded-sm md:text-myYellow flex items-center"
                  aria-current="page">
                  <FontAwesomeIcon
                    icon={faUser}
                    className="w-6 h-6"
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
