import PropTypes from 'prop-types';
import { BookOpen, Check } from 'lucide-react';

const PerawiGrid = ({ perawiList, selectedPerawi, onPerawiClick }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {perawiList.map((perawi) => {
        const isSelected = selectedPerawi?.slug === perawi.slug;
        
        return (
          <button
            key={perawi.slug}
            onClick={() => onPerawiClick(perawi)}
            className={`
              group relative p-6 rounded-xl border-2 transition-all duration-300
              ${isSelected
                ? 'border-primary-600 bg-primary-50 shadow-lg'
                : 'border-neutral-200 bg-white hover:border-primary-300 hover:shadow-md'
              }
            `}
          >
            {/* Selected Badge */}
            {isSelected && (
              <div className="absolute top-3 right-3 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center">
                <Check size={16} className="text-white" />
              </div>
            )}

            {/* Icon */}
            <div className={`
              w-12 h-12 rounded-lg mb-3 flex items-center justify-center
              ${isSelected
                ? 'bg-primary-600'
                : 'bg-primary-100 group-hover:bg-primary-200'
              } transition-colors
            `}>
              <BookOpen size={24} className={isSelected ? 'text-white' : 'text-primary-600'} />
            </div>

            {/* Name */}
            <h3 className={`
              text-base sm:text-lg font-semibold mb-2
              ${isSelected ? 'text-neutral-900' : 'text-neutral-700 group-hover:text-neutral-900'}
            `}>
              {perawi.name}
            </h3>

            {/* Total Hadits */}
            <p className={`
              text-sm font-medium
              ${isSelected ? 'text-primary-600' : 'text-neutral-500 group-hover:text-neutral-600'}
            `}>
              {perawi.total.toLocaleString('id-ID')} hadits
            </p>

            {/* Hover Effect Line */}
            {!isSelected && (
              <div className="absolute bottom-0 left-0 h-1 bg-primary-600 rounded-full w-0 group-hover:w-full transition-all duration-300"></div>
            )}
          </button>
        );
      })}
    </div>
  );
};

PerawiGrid.propTypes = {
  onPerawiClick: PropTypes.func.isRequired,
  perawiList: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      total: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    })
  ).isRequired,
  selectedPerawi: PropTypes.shape({
    slug: PropTypes.string,
  }),
};

PerawiGrid.defaultProps = {
  selectedPerawi: null,
};

export default PerawiGrid;
