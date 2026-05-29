import { useEffect, useState } from "react";
import { BookOpen, CalendarDays, HeartHandshake, Sparkles } from "lucide-react";
import HadisController from "../../Controller/HadisController";
import ServiceCard from "./ServiceCard";

const CardServiceFeature = () => {
  const [hadisError, setHadisError] = useState(null);
  const [hadisLoading, setHadisLoading] = useState(false);
  const [randomHadis, setRamdomHadis] = useState(null);

  const fetchHadis = async () => {
    const dataHadis = new HadisController();
    setHadisLoading(true);
    setHadisError(null);

    try {
      const randomHadis = await dataHadis.getRandomHadis();
      setRamdomHadis(randomHadis);
    } catch (error) {
      setHadisError(error.message || "Hadis gagal dimuat.");
    } finally {
      setHadisLoading(false);
    }
  };

  useEffect(() => {
    fetchHadis();
  }, []);



  const services = [
    {
      description: "Jadwal sholat harian dan bulanan wilayah Bintan.",
      href: "/sholat",
      icon: <CalendarDays size={24} aria-hidden="true" />,
      title: "Jadwal Sholat",
      tone: "primary",
    },
    {
      description: "Hadis pilihan untuk bacaan jamaah.",
      href: "/hadits",
      icon: <BookOpen size={24} aria-hidden="true" />,
      title: "Hadis",
      tone: "accent",
    },
    {
      description: "Doa harian untuk bacaan jamaah.",
      href: "/doa",
      icon: <Sparkles size={24} aria-hidden="true" />,
      title: "Doa",
      tone: "success",
    },
    {
      description: "Informasi sedekah Masjid Al Kahfi.",
      href: "/comingsoon",
      icon: <HeartHandshake size={24} aria-hidden="true" />,
      title: "Sedekah",
      tone: "accent",
    },
  ];

  const perawi = randomHadis ? randomHadis.info.perawi.name : "Memuat";
  const noHadis = randomHadis ? randomHadis.data.number : "Memuat";
  const arHadis = randomHadis ? randomHadis.data.arab : "Memuat";
  const idHadis = randomHadis ? randomHadis.data.id : "Memuat";

  return (
    <section className="bg-white py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary-700">
            Layanan
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold text-neutral-950 sm:text-4xl">
            Informasi ibadah Masjid Al Kahfi
          </h2>
          <p className="mt-4 text-base leading-7 text-neutral-600">
            Jadwal sholat, hadits, doa, dan sedekah untuk jamaah.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </div>

      <dialog
        className="modal modal-bottom w-auto sm:modal-middle"
        id="my_modal_5"
      >
        <div className="modal-box rounded-xl">
          <div className="flex w-full flex-col gap-2 border-b border-neutral-200 pb-4 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-lg font-bold text-neutral-950">
              Riwayah {perawi}
            </h3>
            <p className="text-sm font-semibold text-primary-700">
              Nomor {noHadis}
            </p>
          </div>

          {hadisError ? (
            <div className="my-5 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {hadisError}
            </div>
          ) : (
            <div className="space-y-4 py-5">
              <p className="text-right text-2xl leading-loose text-neutral-950">
                {hadisLoading ? "Memuat..." : arHadis}
              </p>
              <p className="text-sm leading-7 text-neutral-700">
                {hadisLoading ? "Memuat..." : idHadis}
              </p>
            </div>
          )}

          <div className="modal-action">
            <form className="flex gap-2" method="dialog">
              <button className="btn btn-ghost" type="button" onClick={fetchHadis}>
                Hadis lain
              </button>
              <button className="btn bg-primary-700 text-white hover:bg-primary-800">
                Tutup
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </section>
  );
};

export default CardServiceFeature;
