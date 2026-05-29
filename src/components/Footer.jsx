import { Heart, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-950 text-neutral-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div>
              <p className="font-display text-2xl font-bold text-white">
                Al Kahfi
              </p>
              <p className="mt-3 text-sm leading-6 text-neutral-400">
                Pusat informasi ibadah Masjid Al Kahfi, Bintan.
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white">Navigasi</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link className="transition-colors hover:text-primary-300" to="/">
                  Beranda
                </Link>
              </li>
              <li>
                <Link
                  className="transition-colors hover:text-primary-300"
                  to="/sholat"
                >
                  Jadwal Sholat
                </Link>
              </li>
              <li>
                <Link
                  className="transition-colors hover:text-primary-300"
                  to="/hadits"
                >
                  Hadits
                </Link>
              </li>
              <li>
                <Link
                  className="transition-colors hover:text-primary-300"
                  to="/doa"
                >
                  Doa
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white">Hubungi Kami</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin
                  className="mt-0.5 shrink-0 text-primary-300"
                  size={16}
                  aria-hidden="true"
                />
                <a
                  className="transition-colors hover:text-primary-300"
                  href="https://maps.app.goo.gl/H7VGMirotSSSkxed9"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Bintan, Kepulauan Riau
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail
                  className="mt-0.5 shrink-0 text-primary-300"
                  size={16}
                  aria-hidden="true"
                />
                <a
                  className="transition-colors hover:text-primary-300"
                  href="mailto:info@alkahfi.com"
                >
                  info@alkahfi.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white">Sedekah</h3>
            <p className="mt-4 text-sm leading-6 text-neutral-400">
              Dukung kegiatan Masjid Al Kahfi.
            </p>
            <Link
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-accent-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-accent-600"
              to="/comingsoon"
            >
              <Heart size={16} aria-hidden="true" />
              Sedekah
            </Link>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-sm text-neutral-500">
          <p>Copyright © {currentYear} Al Kahfi Muslim Center.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
