import { useState } from "react";
import { Heart, Menu, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import iconLogo from "../assets/iconLogo.png";

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/sholat", label: "Jadwal Sholat" },
  { href: "/hadits", label: "Hadits" },
  { href: "/doa", label: "Doa" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const getLinkClass = ({ isActive }) =>
    `rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
      isActive
        ? "bg-primary-50 text-primary-800"
        : "text-neutral-600 hover:bg-neutral-50 hover:text-primary-700"
    }`;

  return (
    <nav className="sticky top-0 z-50 border-b border-neutral-200 bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between sm:h-20">
          <Link
            className="focus-ring flex items-center gap-3 rounded-lg"
            onClick={() => setIsOpen(false)}
            to="/"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-700">
              <img
                alt="Al Kahfi"
                className="h-8 w-8 rounded-md object-cover"
                src={iconLogo}
              />
            </span>
            <span className="font-display text-xl font-bold text-neutral-950">
              Al Kahfi
            </span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <NavLink className={getLinkClass} key={link.label} to={link.href}>
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Link
              className="focus-ring hidden items-center gap-2 rounded-lg bg-accent-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-accent-600 hover:shadow-md sm:inline-flex"
              to="/comingsoon"
            >
              <Heart size={16} aria-hidden="true" />
              Sedekah
            </Link>
            <button
              aria-expanded={isOpen}
              aria-label="Buka menu navigasi"
              className="focus-ring rounded-lg p-2 text-neutral-700 transition-colors hover:bg-neutral-100 md:hidden"
              onClick={() => setIsOpen((current) => !current)}
              type="button"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="border-t border-neutral-100 pb-4 pt-3 md:hidden">
            <div className="grid gap-1">
              {navLinks.map((link) => (
                <NavLink
                  className={getLinkClass}
                  key={link.label}
                  onClick={() => setIsOpen(false)}
                  to={link.href}
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
            <Link
              className="focus-ring mt-3 flex items-center justify-center gap-2 rounded-lg bg-accent-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-accent-600"
              onClick={() => setIsOpen(false)}
              to="/comingsoon"
            >
              <Heart size={16} aria-hidden="true" />
              Sedekah
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
