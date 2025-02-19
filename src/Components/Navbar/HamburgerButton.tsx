interface HamburgerButtonProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

export const HamburgerButton = ({
  isMenuOpen,
  toggleMenu,
}: HamburgerButtonProps) => (
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
);
