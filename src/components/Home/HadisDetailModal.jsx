import PropTypes from 'prop-types';
import { X, Copy, Share2, Loader } from 'lucide-react';
import { useState } from 'react';

const HadisDetailModal = ({ hadis, perawi, loading, onClose }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (hadis) {
      const text = `${perawi.name} #${hadis.number}\n\n${hadis.arab}\n\nTerjemahan:\n${hadis.id}`;
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = () => {
    if (navigator.share && hadis) {
      navigator.share({
        title: `Hadits ${perawi.name} #${hadis.number}`,
        text: hadis.id,
        url: window.location.href,
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Modal Container */}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[92vh] my-8 overflow-hidden animate-fade-in-up flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white p-6 sm:p-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-primary-100 mb-1">Hadits dari</p>
            <h2 className="text-2xl sm:text-3xl font-bold">{perawi.name}</h2>
            <p className="text-sm text-primary-100 mt-2">Nomor: {hadis?.number || '-'}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-primary-500 rounded-lg transition-colors flex-shrink-0"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="min-h-0 flex-1 overflow-y-auto p-6 sm:p-8">
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader size={40} className="text-primary-500 animate-spin" />
            </div>
          ) : hadis ? (
            <div className="space-y-6">
              <div className="grid gap-5 lg:grid-cols-2">
                {/* Arabic Text */}
                <div className="min-h-0 space-y-3">
                  <h3 className="text-sm font-semibold text-neutral-900 uppercase tracking-wide">Teks Arab</h3>
                  <div className="max-h-[52vh] overflow-y-auto rounded-xl border border-primary-200 bg-primary-50 p-5 sm:p-6 lg:max-h-[58vh]">
                    <p className="text-lg sm:text-xl text-right leading-loose text-neutral-900 font-arabic">
                      {hadis.arab}
                    </p>
                  </div>
                </div>

                {/* Indonesian Translation */}
                <div className="min-h-0 space-y-3">
                  <h3 className="text-sm font-semibold text-neutral-900 uppercase tracking-wide">Terjemahan</h3>
                  <div className="max-h-[52vh] overflow-y-auto rounded-xl border border-neutral-200 bg-neutral-50 p-5 sm:p-6 lg:max-h-[58vh]">
                    <p className="text-base leading-8 text-neutral-700">
                      {hadis.id}
                    </p>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              {hadis.number && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                  <p className="text-sm text-blue-900">
                    <span className="font-semibold">Nomor Hadits:</span> {hadis.number} dari {perawi.total} hadits {perawi.name}
                  </p>
                </div>
              )}

            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-neutral-600">Hadits tidak ditemukan</p>
            </div>
          )}
        </div>

        {/* Footer / Actions */}
        <div className="border-t border-neutral-200 p-6 sm:p-8 bg-neutral-50 flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleCopy}
            className={`
              flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all
              ${copied
                ? 'bg-green-600 text-white'
                : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
              }
            `}
          >
            <Copy size={18} />
            <span>{copied ? 'Disalin!' : 'Salin'}</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-accent-600 text-white rounded-lg font-medium hover:bg-accent-700 transition-all"
          >
            <Share2 size={18} />
            <span>Bagikan</span>
          </button>

          <button
            onClick={onClose}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-all ml-auto"
          >
            <span>Tutup</span>
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

HadisDetailModal.propTypes = {
  hadis: PropTypes.shape({
    arab: PropTypes.string,
    id: PropTypes.string,
    number: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }),
  loading: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  perawi: PropTypes.shape({
    name: PropTypes.string,
    total: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }),
};

HadisDetailModal.defaultProps = {
  hadis: null,
  loading: false,
  perawi: {
    name: '',
    total: 0,
  },
};

export default HadisDetailModal;
