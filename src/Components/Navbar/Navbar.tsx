import { useState, useEffect, useRef } from 'react';
import logo from '../../assets/Images/Logo.svg';

import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import { supabase } from '../../SupabaseClient';
import { Session } from '@supabase/supabase-js';
import { HamburgerButton } from '../Navbar/HamburgerButton';
import { NavLinks } from '../Navbar/NavLinks';
import { UserMenu } from '../Navbar/UserMenu';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activePage, setActivePage] = useState('home');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { logout, isAuthenticated, session } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/agregar-editar-transaccion')) {
      setActivePage('transacciones');
    } else if (path.includes('/home')) {
      setActivePage('home');
    } else if (path.includes('/transacciones')) {
      setActivePage('transacciones');
    } else if (path.includes('/calendario')) {
      setActivePage('calendario');
    }
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="fixed top-0 left-0 right-0 w-full z-50 bg-myGray/90 backdrop-blur-sm">
      <div className="max-w-screen-lg mx-auto">
        <div className="flex justify-center mt-5">
          <Link
            to="/home"
            className="flex items-center">
            <img
              src={logo}
              className="h-12 md:h-15 lg:h-15 transition-all duration-300"
              alt="Logo"
            />
          </Link>
        </div>
        <nav>
          <div className="max-w-screen-sm flex justify-center items-center mx-auto py-3 relative">
            <HamburgerButton
              isMenuOpen={isMenuOpen}
              toggleMenu={toggleMenu}
            />
            <div
              id="navbar-solid-bg"
              className={`${
                isMenuOpen ? 'block' : 'hidden'
              } absolute left-0 top-full w-full md:relative md:block md:w-auto mx-auto bg-myGray md:bg-transparent z-50`}>
              <ul className="flex flex-col font-medium mt-4 font-['NexaBold'] md:flex-row md:space-x-8 md:mt-0">
                <NavLinks
                  activePage={activePage}
                  setActivePage={setActivePage}
                />
                <UserMenu
                  session={session}
                  isDropdownOpen={isDropdownOpen}
                  toggleDropdown={toggleDropdown}
                  handleLogout={handleLogout}
                />
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};
