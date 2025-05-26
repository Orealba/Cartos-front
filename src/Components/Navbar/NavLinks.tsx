import { Link } from 'react-router-dom';

interface NavLinksProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

export const NavLinks = ({ activePage, setActivePage }: NavLinksProps) => (
  <>
    <li className="relative">
      <Link
        to="/home"
        onClick={() => setActivePage('home')}
        className={`block text-white relative pb-1 ${
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
        onClick={() => setActivePage('transacciones')}
        className={`block py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-myYellow dark:text-white md:dark:hover:text-myYellow dark:hover:bg-myYellow dark:hover:text-white md:dark:hover:bg-transparent relative pb-2 ${
          activePage === 'transacciones'
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
  </>
);
