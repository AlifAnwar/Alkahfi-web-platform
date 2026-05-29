import { useState, useCallback } from 'react';
import doaService from '../services/doaService';

export const useDoaList = () => {
  const [doaList, setDoaList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDoaList = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await doaService.getDoaList();
      setDoaList(data);
      return data;
    } catch (err) {
      setError(err.message || 'Gagal memuat daftar doa.');
      console.error('Error in useDoaList:', err);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    doaList,
    loading,
    error,
    fetchDoaList,
  };
};

export const useDoaSearch = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchDoa = useCallback(async (query) => {
    if (!query || query.trim().length === 0) {
      setResults([]);
      setError(null);
      return [];
    }

    setLoading(true);
    setError(null);

    try {
      const data = await doaService.searchDoa(query.trim());
      setResults(data);
      return data;
    } catch (err) {
      setError(err.message || 'Gagal mencari doa.');
      console.error('Error in useDoaSearch:', err);
      setResults([]);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const clearSearch = useCallback(() => {
    setResults([]);
    setError(null);
    setLoading(false);
  }, []);

  return {
    results,
    loading,
    error,
    searchDoa,
    clearSearch,
  };
};

export const useDoaDetail = () => {
  const [doa, setDoa] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDoaDetail = useCallback(async (id) => {
    setLoading(true);
    setError(null);

    try {
      const data = await doaService.getDoaById(id);
      setDoa(data);
      return data;
    } catch (err) {
      setError(err.message || 'Gagal memuat detail doa.');
      console.error('Error in useDoaDetail:', err);
      setDoa(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    doa,
    loading,
    error,
    fetchDoaDetail,
  };
};
