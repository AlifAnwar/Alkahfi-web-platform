import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePerawiList, useHadisByPerawi, useHadisDetail } from '../hooks/useHadisData';
import { BookOpen, AlertCircle, Loader, ChevronRight, Search, ArrowLeft } from 'lucide-react';
import HadisList from '../components/Home/HadisList';
import HadisDetailModal from '../components/Home/HadisDetailModal';

const HaditsByPerawiPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { perawiList, loading: perawiLoading, error: perawiError, fetchPerawiList } = usePerawiList();
  const { hadis, loading: hadisLoading, error: hadisError, fetchHadis } = useHadisByPerawi();
  const { hadis: selectedHadis, loading: detailLoading, fetchHadisDetail } = useHadisDetail();

  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const HADIS_PER_PAGE = 6;

  const selectedPerawi = useMemo(
    () => perawiList.find((item) => item.slug === slug) || null,
    [perawiList, slug]
  );

  useEffect(() => {
    fetchPerawiList();
  }, [fetchPerawiList]);

  useEffect(() => {
    if (!slug) return;

    setCurrentPage(1);
    setSearchQuery('');

    if (selectedPerawi) {
      fetchHadis(slug, HADIS_PER_PAGE, 1);
    }
  }, [slug, selectedPerawi, fetchHadis]);

  const handleHadisClick = async (hadisData) => {
    await fetchHadisDetail(slug, hadisData.number);
    setShowDetailModal(true);
  };

  const [showDetailModal, setShowDetailModal] = useState(false);

  const handlePreviousPage = () => {
    if (currentPage > 1 && selectedPerawi) {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage);
      fetchHadis(slug, HADIS_PER_PAGE, prevPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNextPage = () => {
    if (selectedPerawi) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchHadis(slug, HADIS_PER_PAGE, nextPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const filteredHadis = hadis.filter((h) =>
    h.id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    h.arab?.includes(searchQuery)
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-primary-50">
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => navigate('/hadits')}
            className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/20 transition-colors"
          >
            <ArrowLeft size={16} />
            Kembali ke daftar perawi
          </button>

          <div className="flex items-center gap-3 mb-4">
            <BookOpen size={32} />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold">
              Hadits {selectedPerawi?.name || 'Perawi'}
            </h1>
          </div>
          <p className="text-primary-100 text-base sm:text-lg max-w-2xl">
            {selectedPerawi
              ? `Koleksi hadits ${selectedPerawi.name}. Total ${selectedPerawi.total.toLocaleString('id-ID')} hadits.`
              : 'Pilih kembali perawi untuk melihat daftar hadits yang tersedia.'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {perawiLoading ? (
          <div className="flex justify-center py-12">
            <Loader size={40} className="text-primary-500 animate-spin" />
          </div>
        ) : perawiError ? (
          <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
            <AlertCircle size={20} className="text-red-600 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-red-900">Gagal memuat data perawi</p>
              <button
                onClick={fetchPerawiList}
                className="text-xs underline text-red-700 hover:text-red-900 mt-1"
              >
                Coba lagi
              </button>
            </div>
          </div>
        ) : !selectedPerawi ? (
          <div className="text-center py-20">
            <BookOpen size={48} className="text-neutral-300 mx-auto mb-4" />
            <p className="text-neutral-600 text-lg">
              Perawi tidak ditemukan. Silakan kembali dan pilih perawi lain.
            </p>
          </div>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900">
                  Hadits {selectedPerawi.name}
                </h2>
                <p className="text-neutral-600 text-sm mt-1">
                  Total {selectedPerawi.total.toLocaleString('id-ID')} hadits | Halaman {currentPage}
                </p>
              </div>

              <div className="relative w-full sm:w-72">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Cari hadits..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 w-full"
                />
              </div>
            </div>

            {hadisLoading ? (
              <div className="flex justify-center py-12">
                <Loader size={40} className="text-primary-500 animate-spin" />
              </div>
            ) : hadisError ? (
              <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle size={20} className="text-red-600 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-red-900">Gagal memuat hadits</p>
                  <button
                    onClick={() => fetchHadis(slug, HADIS_PER_PAGE, currentPage)}
                    className="text-xs underline text-red-700 hover:text-red-900 mt-1"
                  >
                    Coba lagi
                  </button>
                </div>
              </div>
            ) : filteredHadis.length > 0 ? (
              <>
                <HadisList
                  hadis={filteredHadis}
                  onHadisClick={handleHadisClick}
                  perawiName={selectedPerawi.name}
                />

                <div className="flex items-center justify-between mt-8">
                  <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className="px-6 py-2 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    ← Sebelumnya
                  </button>

                  <span className="text-neutral-600 font-medium">Halaman {currentPage}</span>

                  <button
                    onClick={handleNextPage}
                    disabled={currentPage >= Math.ceil(Number(selectedPerawi.total) / HADIS_PER_PAGE)}
                    className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2"
                  >
                    <span>Berikutnya</span>
                    <ChevronRight size={18} />
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <BookOpen size={48} className="text-neutral-300 mx-auto mb-4" />
                <p className="text-neutral-600 text-lg">
                  {searchQuery ? 'Hadits tidak ditemukan' : 'Belum ada hadits untuk perawi ini.'}
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {showDetailModal && (
        <HadisDetailModal
          hadis={selectedHadis}
          perawi={selectedPerawi}
          loading={detailLoading}
          onClose={() => setShowDetailModal(false)}
        />
      )}
    </div>
  );
};

export default HaditsByPerawiPage;
