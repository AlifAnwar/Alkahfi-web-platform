import { useState, useCallback } from 'react';
import hadisService from '../services/hadisService';

/**
 * Hook for fetching perawi list
 */
export const usePerawiList = () => {
  const [perawiList, setPerawiList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPerawiList = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await hadisService.getPerawiList();
      setPerawiList(data);
      return data;
    } catch (err) {
      setError(err.message || 'Failed to fetch perawi list');
      console.error('Error in usePerawiList:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    perawiList,
    loading,
    error,
    fetchPerawiList,
  };
};

/**
 * Hook for fetching hadits by perawi (with pagination)
 */
export const useHadisByPerawi = () => {
  const [hadis, setHadis] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalHadis, setTotalHadis] = useState(0);

  const fetchHadis = useCallback(async (slug, pageSize = 6, pageNumber = 1) => {
    setLoading(true);
    setError(null);
    try {
      const data = await hadisService.getHadisByPerawi(slug, pageSize, pageNumber);
      setHadis(data);
      setCurrentPage(pageNumber);
      setTotalHadis(data.length);
      return data;
    } catch (err) {
      setError(err.message || 'Failed to fetch hadits');
      setHadis([]);
      console.error('Error in useHadisByPerawi:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    hadis,
    loading,
    error,
    currentPage,
    totalHadis,
    fetchHadis,
  };
};

/**
 * Hook for fetching single hadits detail
 */
export const useHadisDetail = () => {
  const [hadis, setHadis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchHadisDetail = useCallback(async (slug, number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await hadisService.getHadisBySlugnNumber(slug, number);
      setHadis(data);
      return data;
    } catch (err) {
      setError(err.message || 'Failed to fetch hadits detail');
      console.error('Error in useHadisDetail:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    hadis,
    loading,
    error,
    fetchHadisDetail,
  };
};
