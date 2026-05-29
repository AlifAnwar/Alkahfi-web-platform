import { Clock, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import PhotoMosque from "../../assets/masjid1.png";
import { useSholatToday } from "../../hooks/useSholatData";
import CardClock from "./CardClock";
import CardSholatToday from "./CardSholatToday";

const Headline = () => {
  const { data: sholatToday, loading, error, refetch } = useSholatToday();

  return (
    <div className="w-full">
      <section className="bg-gradient-to-b from-primary-50 via-white to-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-16">
          <div className="flex flex-col justify-center gap-7 animate-fade-in-up">
            <a
              className="focus-ring inline-flex w-fit items-center gap-3 rounded-full border border-primary-100 bg-white px-3 py-2 text-sm font-semibold text-neutral-700 shadow-sm transition-all hover:border-primary-200 hover:text-primary-800 hover:shadow-md"
              href="https://maps.app.goo.gl/H7VGMirotSSSkxed9"
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-700 text-white">
                <MapPin size={17} aria-hidden="true" />
              </span>
              Al Kahfi Mosque, Bintan
            </a>

            <div className="max-w-2xl space-y-4">
              <h1 className="font-display text-4xl font-bold leading-tight text-neutral-950 sm:text-5xl lg:text-6xl">
                Informasi Ibadah Masjid Al Kahfi
              </h1>
              <p className="max-w-xl text-base leading-7 text-neutral-600 sm:text-lg">
                Jadwal sholat, hadits, dan doa untuk jamaah Masjid Al Kahfi.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                className="focus-ring inline-flex items-center justify-center gap-2 rounded-lg bg-primary-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-800 hover:shadow-lg"
                to="/sholat"
              >
                <Clock size={18} aria-hidden="true" />
                Lihat Jadwal Sholat
              </Link>
              <Link
                className="focus-ring inline-flex items-center justify-center rounded-lg border border-primary-200 bg-white px-5 py-3 text-sm font-semibold text-primary-800 transition-colors hover:bg-primary-50"
                to="/doa"
              >
                Baca Doa Harian
              </Link>
            </div>
          </div>

          <div className="relative hidden min-h-[460px] overflow-hidden rounded-xl lg:block">
            <img
              alt="Masjid Al Kahfi"
              className="h-full w-full object-cover"
              loading="lazy"
              src={PhotoMosque}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/35 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 rounded-lg bg-white/95 p-4 shadow-lg backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                Lokasi
              </p>
              <p className="mt-1 font-semibold text-neutral-950">
                Bintan, Kepulauan Riau
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <CardClock loading={loading} sholatTime={sholatToday} />
        </div>

        <CardSholatToday
          error={error}
          loading={loading}
          onRetry={refetch}
          sholatToday={sholatToday}
        />
      </section>
    </div>
  );
};

export default Headline;
