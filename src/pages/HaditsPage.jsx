import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePerawiList } from '../hooks/useHadisData';
import { BookOpen, AlertCircle, Loader } from 'lucide-react';
import PerawiGrid from '../components/Home/PerawiGrid';

const HaditsPage = () => {
  const navigate = useNavigate();
  const { perawiList, loading: perawiLoading, error: perawiError, fetchPerawiList } = usePerawiList();

  useEffect(() => {
    fetchPerawiList();
  }, [fetchPerawiList]);

  const handlePerawiClick = (perawi) => {
    navigate(`/hadits/${perawi.slug}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-primary-50">
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen size={32} />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold">
              Hadits & Sunnah
            </h1>
          </div>
          <p className="text-primary-100 text-base sm:text-lg max-w-2xl">
            Pilih perawi untuk melihat koleksi hadits mereka di halaman terpisah.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-2">Daftar Perawi Hadits</h2>
          <p className="text-neutral-600 mb-8">
            Klik perawi untuk membuka daftar hadits berdasarkan perawi tersebut.
          </p>

          {perawiLoading ? (
            <div className="flex justify-center py-12">
              <Loader size={40} className="text-primary-500 animate-spin" />
            </div>
          ) : perawiError ? (
            <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle size={20} className="text-red-600 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-red-900">Gagal memuat daftar perawi</p>
                <button
                  onClick={fetchPerawiList}
                  className="text-xs underline text-red-700 hover:text-red-900 mt-1"
                >
                  Coba lagi
                </button>
              </div>
            </div>
          ) : (
            <PerawiGrid perawiList={perawiList} onPerawiClick={handlePerawiClick} />
          )}
        </div>
      </div>
    </div>
  );
};

export default HaditsPage;
