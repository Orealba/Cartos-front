import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Session } from '@supabase/supabase-js';

interface UserMenuProps {
  session: Session | null;
  isDropdownOpen: boolean;
  toggleDropdown: () => void;
  handleLogout: () => void;
}

export const UserMenu = ({
  session,
  isDropdownOpen,
  toggleDropdown,
  handleLogout,
}: UserMenuProps) => (
  <li className="relative">
    <button
      onClick={() => session && toggleDropdown()}
      className={`block py-2 px-3 md:p-0 text-white ${
        session ? 'cursor-pointer' : 'cursor-not-allowed'
      }`}>
      <FontAwesomeIcon
        icon={faUser}
        className="w-6 h-6"
      />
    </button>
    {session && isDropdownOpen && (
      <div className="absolute left-0 mt-2 w-48 bg-myGreen rounded-md shadow-lg py-1 cursor-pointer z-50">
        <button
          onClick={handleLogout}
          className="block w-full text-left px-4 py-2 text-myYellow hover:bg-opacity-90 cursor-pointer border rounded-lg border-myYellow">
          Cerrar Sesión
        </button>
      </div>
    )}
  </li>
);
