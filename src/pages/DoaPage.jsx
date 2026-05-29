import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Search, Loader, BookOpen, HeartHandshake } from 'lucide-react';
import { useDoaDetail, useDoaList, useDoaSearch } from '../hooks/useDoaData';
import DoaList from '../components/Home/DoaList';
import DoaDetailModal from '../components/Home/DoaDetailModal';

const PAGE_SIZE = 12;

const DoaPage = () => {
  const { doaList, loading: listLoading, error: listError, fetchDoaList } = useDoaList();
  const { results: searchResults, loading: searchLoading, error: searchError, searchDoa, clearSearch } = useDoaSearch();
  const { doa: selectedDoa, loading: detailLoading, fetchDoaDetail } = useDoaDetail();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const lastSearchQueryRef = useRef('');

  useEffect(() => {
    fetchDoaList();
  }, [fetchDoaList]);

  const runSearch = useCallback(async (query) => {
    setPage(1);

    if (query.length > 1) {
      if (lastSearchQueryRef.current === query) {
        return;
      }

      lastSearchQueryRef.current = query;
      await searchDoa(query);
      setSearchTerm(query);
      return;
    }

    lastSearchQueryRef.current = '';
    setSearchTerm('');
    clearSearch();
  }, [clearSearch, searchDoa]);

  useEffect(() => {
    const query = searchQuery.trim();
    const timeoutId = window.setTimeout(() => {
      runSearch(query);
    }, 400);

    return () => window.clearTimeout(timeoutId);
  }, [runSearch, searchQuery]);

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    await runSearch(searchQuery.trim());
  };

  const activeItems = useMemo(() => {
    const searching = searchTerm.trim().length > 1;
    return searching ? searchResults : doaList;
  }, [doaList, searchResults, searchTerm]);

  const visibleItems = activeItems.slice(0, page * PAGE_SIZE);
  const hasMore = visibleItems.length < activeItems.length;

  const handleLoadMore = () => {
    setPage((current) => current + 1);
  };

  const handleDoaSelect = async (item) => {
    if (!item) {
      return;
    }

    await fetchDoaDetail(item.id);
    setShowDetailModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-primary-50">
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <HeartHandshake size={32} />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold">
              Doa Harian
            </h1>
          </div>
          <p className="text-primary-100 text-base sm:text-lg max-w-2xl">
            Total {doaList.length.toLocaleString('id-ID')} doa.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-neutral-900">
              Doa Harian
            </h2>
            <p className="mt-2 text-base text-neutral-600">
              Total {doaList.length.toLocaleString('id-ID')} doa | Halaman {page}
            </p>
          </div>

          <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-[28rem]">
            <Search className="absolute left-5 top-1/2 h-6 w-6 -translate-y-1/2 text-neutral-400" />
            <input
              type="search"
              placeholder="Cari doa..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-neutral-300 bg-white py-2 pl-14 pr-5 text-lg text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
            />
          </form>
        </div>

        {listLoading ? (
          <div className="flex justify-center py-20">
            <Loader size={40} className="text-primary-600 animate-spin" />
          </div>
        ) : listError ? (
          <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-red-900">
            <p className="font-semibold">Gagal memuat daftar doa</p>
            <p className="mt-2 text-sm">{listError}</p>
          </div>
        ) : (
          <>
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-neutral-500">
                  Menampilkan {visibleItems.length} dari {activeItems.length} doa
                  {searchTerm.trim().length > 1 ? ' hasil pencarian' : ''}.
                </p>
              </div>
            </div>

            {searchLoading ? (
              <div className="flex justify-center py-20">
                <Loader size={36} className="text-primary-600 animate-spin" />
              </div>
            ) : searchError ? (
              <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-red-900">
                <p className="font-semibold">Gagal mencari doa</p>
                <p className="mt-2 text-sm">{searchError}</p>
              </div>
            ) : visibleItems.length > 0 ? (
              <>
                <DoaList items={visibleItems} onSelect={handleDoaSelect} />

                {hasMore && (
                  <div className="mt-10 flex justify-center">
                    <button
                      type="button"
                      onClick={handleLoadMore}
                      className="rounded-full bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-400/20 transition hover:bg-primary-700"
                    >
                      Muat lebih banyak
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="rounded-3xl border border-neutral-200 bg-white p-16 text-center text-neutral-600">
                <BookOpen size={36} className="mx-auto mb-4 text-neutral-300" />
                <p className="text-lg font-semibold text-neutral-900">Tidak ada doa untuk ditampilkan</p>
                <p className="mt-2 text-sm">Coba kata kunci lain.</p>
              </div>
            )}
          </>
        )}
      </div>

      {showDetailModal && (
        <DoaDetailModal
          doa={selectedDoa}
          loading={detailLoading}
          onClose={() => setShowDetailModal(false)}
        />
      )}
    </div>
  );
};

export default DoaPage;
