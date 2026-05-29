import PropTypes from 'prop-types';

const DoaList = ({ items, onSelect }) => (
  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
    {items.map((item) => (
      <button
        type="button"
        key={item.id}
        onClick={() => onSelect(item)}
        className="group flex flex-col items-start rounded-3xl border border-neutral-200 bg-white p-5 text-left shadow-sm transition-all hover:-translate-y-1 hover:border-primary-300 hover:shadow-lg"
      >
        <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary-700">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-primary-700">
            {item.id}
          </span>
          <span>{item.grup}</span>
        </div>
        <h3 className="text-base font-semibold text-neutral-900 transition-colors group-hover:text-primary-700">
          {item.nama}
        </h3>
        <p className="mt-3 text-sm leading-6 text-neutral-600 line-clamp-4">
          {item.idn}
        </p>
      </button>
    ))}
  </div>
);

DoaList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      grup: PropTypes.string,
      nama: PropTypes.string,
      idn: PropTypes.string,
    })
  ).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default DoaList;
