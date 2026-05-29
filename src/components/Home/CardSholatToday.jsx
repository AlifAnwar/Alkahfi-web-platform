import PropTypes from "prop-types";
import { RefreshCw, Sunrise, Sun, CloudSun, Sunset, Moon } from "lucide-react";
import { DEFAULT_LOCATION_NAME } from "../../services/sholatService";

const prayerItems = [
  { icon: Sunrise, label: "Shubuh", key: "subuh" },
  { icon: Sun, label: "Dzuhur", key: "dzuhur" },
  { icon: CloudSun, label: "Ashar", key: "ashar" },
  { icon: Sunset, label: "Maghrib", key: "maghrib" },
  { icon: Moon, label: "Isya", key: "isya" },
];

const CardSholatToday = ({ error, loading, onRetry, sholatToday }) => {
  const getPrayerTime = (key) => {
    if (loading) {
      return "Memuat...";
    }

    return sholatToday?.[key] || "-";
  };

  return (
    <div className="rounded-xl border border-primary-100 bg-primary-50 px-4 py-6">
      <div className="mb-6 text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary-700">
          {DEFAULT_LOCATION_NAME}
        </p>
        <h2 className="mt-1 text-2xl font-bold text-neutral-950">
          Jadwal Sholat Hari Ini
        </h2>
      </div>
      {error && (
        <div className="mx-auto mb-5 w-full rounded-lg border border-red-200 bg-red-50 p-4 text-center text-sm text-red-700 sm:w-1/2">
          <p>Jadwal sholat gagal dimuat: {error}</p>
          <button
            className="focus-ring mt-3 inline-flex items-center justify-center gap-2 rounded-lg bg-primary-700 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-800"
            onClick={onRetry}
            type="button"
          >
            <RefreshCw size={15} aria-hidden="true" />
            Coba lagi
          </button>
        </div>
      )}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {prayerItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              className="flex min-h-40 flex-col items-center justify-center rounded-lg bg-white p-4 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
              key={item.key}
            >
              <div className="mb-3 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary-50 text-primary-700 shadow-sm">
                <Icon className="h-7 w-7" aria-hidden="true" />
              </div>
              <p className="pb-2 text-sm font-semibold text-neutral-700">
                {item.label}
              </p>
              <p className="text-xl font-bold text-primary-800">
                {getPrayerTime(item.key)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

CardSholatToday.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool,
  onRetry: PropTypes.func,
  sholatToday: PropTypes.object,
};

CardSholatToday.defaultProps = {
  error: null,
  loading: false,
  onRetry: () => {},
  sholatToday: null,
};

export default CardSholatToday;
