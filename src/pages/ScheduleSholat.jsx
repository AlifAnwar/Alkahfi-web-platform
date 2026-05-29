import { CalendarDays, MapPin } from "lucide-react";
import TableSholat from "../components/Schedule/TableSholat";
import { DEFAULT_LOCATION_NAME } from "../services/sholatService";

const ScheduleSholat = () => {
  return (
    <div className="bg-primary-50/40">
      <section className="border-b border-primary-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary-100 bg-primary-50 px-3 py-2 text-sm font-semibold text-primary-800">
              <CalendarDays size={16} aria-hidden="true" />
              Jadwal Sholat
            </div>
            <h1 className="font-display text-4xl font-bold leading-tight text-neutral-950 sm:text-5xl">
              Jadwal sholat bulanan yang mudah dibaca.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-neutral-600 sm:text-lg">
              Pilih bulan untuk melihat waktu imsak, sholat wajib, terbit, dan
              dhuha berdasarkan lokasi yang sudah dikonfigurasi.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-neutral-700">
              <MapPin size={16} className="text-primary-700" aria-hidden="true" />
              {DEFAULT_LOCATION_NAME}, Kepulauan Riau
            </div>
          </div>
        </div>
      </section>

      <TableSholat />
    </div>
  );
};

export default ScheduleSholat;
