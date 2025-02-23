import { useState } from 'react';
import logo from '../assets/Images/Logo.svg';
export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400  "
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
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            className={`${
              isMenuOpen ? 'block' : 'hidden'
            } w-full md:block md:w-auto mx-auto`}
            id="navbar-solid-bg">
            <ul className="flex flex-col font-medium mt-4 font-['NexaBold'] rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent dark:bg-transparent md:dark:bg-transparent dark:border-gray-700 justify-center">
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 md:p-0 text-white rounded-sm md:text-white"
                  aria-current="page">
                  HOME
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-myYellow dark:text-white md:dark:hover:text-myYellow dark:hover:bg-myYellow dark:hover:text-white md:dark:hover:bg-transparent">
                  PAGOS
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                  RESUMEN
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                  OPCIONES
                </a>
              </li>
            </ul>
          </div>
          <div
            className={`${
              isMenuOpen ? 'block' : 'hidden'
            } w-full md:block md:w-auto`}>
            <ul className="flex flex-col font-medium mt-4 font-['NexaBold'] rounded-lg bg-gray-50 md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-transparent md:dark:bg-transparent dark:border-gray-700">
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 md:p-0 text-myYellow rounded-sm md:text-myYellow "
                  aria-current="page">
                  USUARIO
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
