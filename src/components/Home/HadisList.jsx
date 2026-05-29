import PropTypes from 'prop-types';
import { ChevronRight, Copy, Share2 } from 'lucide-react';
import { useState } from 'react';

const HadisList = ({ hadis, onHadisClick, perawiName }) => {
  const [copiedId, setCopiedId] = useState(null);

  const handleCopyHadis = (e, hadisData) => {
    e.stopPropagation();
    const text = `${perawiName} #${hadisData.number}\n\n${hadisData.arab}\n\nTerjemahan:\n${hadisData.id}`;
    navigator.clipboard.writeText(text);
    setCopiedId(hadisData.number);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleShareHadis = (e, hadisData) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: `Hadits ${perawiName} #${hadisData.number}`,
        text: hadisData.id,
        url: window.location.href,
      });
    } else {
      alert('Share tidak tersedia di perangkat ini');
    }
  };

  return (
    <div className="space-y-4">
      {hadis.map((h, idx) => (
        <button
          key={idx}
          onClick={() => onHadisClick(h)}
          className="w-full text-left p-4 sm:p-6 bg-white border border-neutral-200 rounded-xl hover:border-primary-300 hover:shadow-lg hover:bg-primary-50 transition-all duration-300 group"
        >
          {/* Header with number */}
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white font-semibold text-sm">{h.number}</span>
              </div>
              <div>
                <p className="text-xs sm:text-sm text-neutral-500">Hadits Nomor</p>
                <p className="text-sm sm:text-base font-semibold text-neutral-900">{h.number}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={(e) => handleCopyHadis(e, h)}
                title="Salin"
                className={`p-2 rounded-lg transition-all ${
                  copiedId === h.number
                    ? 'bg-green-100 text-green-600'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-primary-100 hover:text-primary-600'
                }`}
              >
                <Copy size={16} />
              </button>
              <button
                onClick={(e) => handleShareHadis(e, h)}
                title="Bagikan"
                className="p-2 bg-neutral-100 text-neutral-600 hover:bg-accent-100 hover:text-accent-600 rounded-lg transition-all"
              >
                <Share2 size={16} />
              </button>
            </div>
          </div>

          {/* Arabic Text */}
          <p className="text-sm sm:text-base text-right text-neutral-700 mb-3 line-clamp-2 font-arabic leading-relaxed">
            {h.arab}
          </p>

          {/* Indonesian Translation */}
          <p className="text-xs sm:text-sm text-neutral-600 line-clamp-2 mb-3">
            {h.id}
          </p>

          {/* Read More Link */}
          <div className="flex items-center gap-2 text-primary-600 font-medium text-sm group-hover:gap-3 transition-all">
            <span>Baca lengkap</span>
            <ChevronRight size={16} />
          </div>
        </button>
      ))}
    </div>
  );
};

HadisList.propTypes = {
  hadis: PropTypes.arrayOf(
    PropTypes.shape({
      arab: PropTypes.string,
      id: PropTypes.string,
      number: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    })
  ).isRequired,
  onHadisClick: PropTypes.func.isRequired,
  perawiName: PropTypes.string.isRequired,
};

export default HadisList;
