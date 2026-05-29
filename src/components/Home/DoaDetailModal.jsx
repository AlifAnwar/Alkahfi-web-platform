import PropTypes from 'prop-types';
import { X } from 'lucide-react';

const DoaDetailModal = ({ doa, onClose, loading }) => {
  if (!doa && !loading) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-4">
          <div>
            <p className="text-sm uppercase tracking-[0.22em] text-primary-700">Detail Doa</p>
            <h2 className="mt-1 text-2xl font-semibold text-neutral-950">
              {doa?.nama || 'Memuat...' }
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup detail doa"
            className="rounded-full p-2 text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
          >
            <X size={20} />
          </button>
        </div>

        <div className="max-h-[75vh] overflow-y-auto px-6 py-6">
          {loading ? (
            <p className="text-neutral-600">Memuat detail doa...</p>
          ) : (
            <div className="space-y-6">
              <div>
                <p className="text-sm font-semibold text-neutral-500">Ayat Arab</p>
                <div className="mt-3 rounded-3xl bg-neutral-100 px-5 py-4 text-right text-lg leading-relaxed text-neutral-900 font-arabic">
                  {doa.ar}
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-neutral-500">Transliterasi</p>
                <div className="mt-3 rounded-3xl bg-neutral-50 px-5 py-4 text-sm leading-relaxed text-neutral-800">
                  {doa.tr}
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-neutral-500">Arti</p>
                <div className="mt-3 rounded-3xl bg-neutral-50 px-5 py-4 text-sm leading-relaxed text-neutral-800">
                  {doa.idn}
                </div>
              </div>

              {doa.tentang && (
                <div>
                  <p className="text-sm font-semibold text-neutral-500">Keterangan</p>
                  <div className="mt-3 rounded-3xl bg-neutral-50 px-5 py-4 text-sm leading-relaxed text-neutral-800 whitespace-pre-line">
                    {doa.tentang}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

DoaDetailModal.propTypes = {
  doa: PropTypes.shape({
    ar: PropTypes.string,
    tr: PropTypes.string,
    idn: PropTypes.string,
    nama: PropTypes.string,
    tentang: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

DoaDetailModal.defaultProps = {
  doa: null,
  loading: false,
};

export default DoaDetailModal;
