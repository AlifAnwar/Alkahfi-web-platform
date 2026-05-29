import { useMemo, useState } from "react";
import { AlertCircle, CalendarDays, Clock3, MapPin, RefreshCw } from "lucide-react";
import { useSholatMonth } from "../../hooks/useSholatData";
import { DEFAULT_LOCATION_NAME } from "../../services/sholatService";

const now = new Date();
const currentYear = now.getFullYear();
const currentMonth = String(now.getMonth() + 1).padStart(2, "0");
const currentDay = String(now.getDate()).padStart(2, "0");
const currentMonthValue = `${currentYear}-${currentMonth}`;
const formattedDate = `${currentDay}-${currentMonth}-${currentYear}`;

const monthNames = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

const columns = [
  { key: "imsak", label: "Imsak" },
  { key: "subuh", label: "Subuh" },
  { key: "terbit", label: "Terbit" },
  { key: "dhuha", label: "Dhuha" },
  { key: "dzuhur", label: "Dzuhur" },
  { key: "ashar", label: "Ashar" },
  { key: "maghrib", label: "Maghrib" },
  { key: "isya", label: "Isya" },
];

const getCurrentTime = () => {
  const hours = String(new Date().getHours()).padStart(2, "0");
  const minutes = String(new Date().getMinutes()).padStart(2, "0");

  return `${hours}:${minutes}`;
};

const TableSholat = () => {
  const [inputMonth, setInputMonth] = useState(currentMonthValue);
  const selectedYear = useMemo(
    () => inputMonth.split("-")[0] || String(currentYear),
    [inputMonth]
  );
  const selectedMonth = useMemo(
    () => inputMonth.split("-")[1] || currentMonth,
    [inputMonth]
  );
  const {
    data: sholatData,
    error,
    loading,
    refetch,
  } = useSholatMonth({ month: selectedMonth, year: selectedYear });

  const selectedMonthName = monthNames[parseInt(selectedMonth, 10) - 1];
  const isCurrentSelectedMonth = inputMonth === currentMonthValue;
  const todaySchedule = useMemo(() => {
    if (!isCurrentSelectedMonth) {
      return null;
    }

    return sholatData.find((jadwal) => jadwal.tanggal?.startsWith(currentDay));
  }, [isCurrentSelectedMonth, sholatData]);

  const handleMonthInputChange = (event) => {
    setInputMonth(event.target.value || currentMonthValue);
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div className="rounded-xl border border-neutral-200 bg-white shadow-sm">
        <div className="border-b border-neutral-200 p-5 sm:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-primary-700">
                {DEFAULT_LOCATION_NAME}
              </p>
              <h2 className="mt-1 text-2xl font-bold text-neutral-950 sm:text-3xl">
                {selectedMonthName} {selectedYear}
              </h2>
              <p className="mt-2 text-sm text-neutral-600">
                Hari ini, {formattedDate}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
              <label className="grid gap-2 text-sm font-semibold text-neutral-700">
                Pilih Bulan
                <input
                  className="focus-ring h-11 rounded-lg border border-neutral-300 bg-white px-3 text-sm text-neutral-900 shadow-sm"
                  onChange={handleMonthInputChange}
                  type="month"
                  value={inputMonth}
                />
              </label>
              <button
                className="focus-ring inline-flex h-11 items-center justify-center rounded-lg border border-primary-200 bg-white px-4 text-sm font-semibold text-primary-800 transition-colors hover:bg-primary-50"
                onClick={() => setInputMonth(currentMonthValue)}
                type="button"
              >
                Bulan Ini
              </button>
              <button
                className="focus-ring inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary-700 px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-800 disabled:opacity-60"
                disabled={loading}
                onClick={refetch}
                type="button"
              >
                <RefreshCw
                  className={loading ? "animate-spin" : ""}
                  size={16}
                  aria-hidden="true"
                />
                Refresh
              </button>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg border border-primary-100 bg-primary-50 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-primary-800">
                <CalendarDays size={16} aria-hidden="true" />
                Periode
              </div>
              <p className="mt-2 text-xl font-bold text-neutral-950">
                {selectedMonthName} {selectedYear}
              </p>
            </div>
            <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-neutral-700">
                <MapPin size={16} aria-hidden="true" />
                Lokasi
              </div>
              <p className="mt-2 text-xl font-bold text-neutral-950">
                {DEFAULT_LOCATION_NAME}
              </p>
            </div>
            <div className="rounded-lg border border-accent-100 bg-accent-50 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-accent-800">
                <Clock3 size={16} aria-hidden="true" />
                Waktu Saat Ini
              </div>
              <p className="mt-2 text-xl font-bold text-neutral-950">
                {getCurrentTime()}
              </p>
            </div>
          </div>

          {todaySchedule && (
            <div className="mt-6 rounded-lg border border-primary-100 bg-white p-4">
              <p className="text-sm font-semibold text-primary-800">
                Ringkasan Hari Ini
              </p>
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
                {columns.map((column) => (
                  <div
                    className="rounded-lg bg-neutral-50 p-3 text-center"
                    key={column.key}
                  >
                    <p className="text-xs font-semibold text-neutral-500">
                      {column.label}
                    </p>
                    <p className="mt-1 font-bold text-neutral-950">
                      {todaySchedule[column.key]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {error && (
            <div className="mt-6 flex flex-col gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <AlertCircle size={18} className="mt-0.5 shrink-0" />
                <p>Jadwal sholat gagal dimuat: {error}</p>
              </div>
              <button
                className="focus-ring inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700"
                onClick={refetch}
                type="button"
              >
                <RefreshCw size={15} aria-hidden="true" />
                Coba lagi
              </button>
            </div>
          )}
        </div>

        <div className="overflow-hidden rounded-b-xl">
          <div className="overflow-x-auto">
            <table className="min-w-[920px] w-full border-collapse text-left text-sm">
              <thead className="bg-neutral-950 text-white">
                <tr>
                  <th className="w-16 px-4 py-4 font-semibold">No</th>
                  <th className="px-4 py-4 font-semibold">Tanggal</th>
                  {columns.map((column) => (
                    <th className="px-4 py-4 font-semibold" key={column.key}>
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {loading &&
                  Array.from({ length: 8 }).map((_, index) => (
                    <tr key={`loading-${index}`}>
                      <td className="px-4 py-4" colSpan={10}>
                        <div className="h-5 animate-pulse rounded bg-neutral-100" />
                      </td>
                    </tr>
                  ))}

                {!loading &&
                  !error &&
                  sholatData.map((jadwal, index) => {
                    const isToday =
                      isCurrentSelectedMonth &&
                      jadwal.tanggal?.startsWith(currentDay);

                    return (
                      <tr
                        className={`transition-colors hover:bg-primary-50 ${
                          isToday ? "bg-primary-50" : "bg-white"
                        }`}
                        key={jadwal.tanggal || index}
                      >
                        <th className="px-4 py-4 font-semibold text-neutral-700">
                          {index + 1}
                        </th>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-neutral-950">
                              {jadwal.tanggal}
                            </span>
                            {isToday && (
                              <span className="rounded-full bg-primary-700 px-2 py-0.5 text-xs font-semibold text-white">
                                Hari ini
                              </span>
                            )}
                          </div>
                        </td>
                        {columns.map((column) => (
                          <td
                            className="px-4 py-4 font-medium text-neutral-700"
                            key={column.key}
                          >
                            {jadwal[column.key]}
                          </td>
                        ))}
                      </tr>
                    );
                  })}

                {!loading && !error && sholatData.length === 0 && (
                  <tr>
                    <td className="px-4 py-10 text-center text-neutral-600" colSpan={10}>
                      Jadwal sholat tidak tersedia untuk bulan ini.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TableSholat;
