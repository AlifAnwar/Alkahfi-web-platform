import PropTypes from "prop-types";
import { Clock3 } from "lucide-react";

const CardClock = ({ loading, sholatTime }) => {
  // console.log(sholatTime ? sholatTime.subuh : "Loading..");

  function getCurrentTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();

    // Menambahkan nol di depan angka jika angka kurang dari 10, menggunakan itenary condition
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    return hours + ":" + minutes;
  }

  const currentTime = getCurrentTime();
  // console.log(currentTime);

  let sholatTimeNow = loading ? "Memuat" : "-";

  if (sholatTime) {
    const subuhTime = sholatTime.subuh;
    const dhuhaTime = sholatTime.dhuha;
    const dzuhurTime = sholatTime.dzuhur;
    const asharTime = sholatTime.ashar;
    const maghribTime = sholatTime.maghrib;
    const isyaTime = sholatTime.isya;

    if (currentTime >= subuhTime && currentTime < dhuhaTime) {
      sholatTimeNow = "Shubuh";
    } else if (currentTime >= dhuhaTime && currentTime < dzuhurTime) {
      sholatTimeNow = "Dhuha";
    } else if (currentTime >= dzuhurTime && currentTime < asharTime) {
      sholatTimeNow = "Dzuhur";
    } else if (currentTime >= asharTime && currentTime < maghribTime) {
      sholatTimeNow = "Ashar";
    } else if (currentTime >= maghribTime && currentTime < isyaTime) {
      sholatTimeNow = "Maghrib";
    } else {
      sholatTimeNow = "Isya";
    }
  }

  return (
    <div className="flex flex-col gap-6 rounded-xl bg-neutral-950 p-6 text-white shadow-lg sm:flex-row sm:items-center sm:justify-between sm:p-8">
      <div>
        <div className="max-w-2xl text-center sm:text-left">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-primary-200">
            Waktu Ibadah
          </p>
          <h2 className="text-2xl font-bold sm:text-3xl">
            Alkahfi Mosque Prayers Time
          </h2>
          <p className="pt-3 text-sm leading-6 text-neutral-300 sm:text-base">
            Hi people of faith, make patience and prayer your helpers, indeed
            God is with those who are patient. - Al-Baqarah: 153
          </p>
        </div>
      </div>
      <div className="rounded-lg border border-white/10 bg-white/10 p-5 text-center backdrop-blur sm:min-w-52">
        <div className="mb-2 flex items-center justify-center gap-2 text-sm font-semibold text-primary-100">
          <Clock3 size={18} aria-hidden="true" />
          Sekarang
        </div>
        <p className="text-3xl font-bold">{sholatTimeNow}</p>
        <p className="mt-1 text-sm text-neutral-300">Time</p>
      </div>
    </div>
  );
};

CardClock.propTypes = {
  loading: PropTypes.bool,
  sholatTime: PropTypes.object,
};

CardClock.defaultProps = {
  loading: false,
  sholatTime: null,
};

export default CardClock;
