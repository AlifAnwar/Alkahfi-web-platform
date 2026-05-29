import { useCallback, useEffect, useMemo, useState } from "react";
import { getSholatMonth, getSholatToday } from "../services/sholatService";

export const useSholatToday = (options = {}) => {
  const requestOptions = useMemo(
    () => ({
      date: options.date,
      locationCode: options.locationCode,
    }),
    [options.date, options.locationCode]
  );
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await getSholatToday(requestOptions);
      setData(result);
      return result;
    } catch (requestError) {
      setError(requestError.message);
      setData(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, [requestOptions]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};

export const useSholatMonth = (options = {}) => {
  const requestOptions = useMemo(
    () => ({
      locationCode: options.locationCode,
      month: options.month,
      year: options.year,
    }),
    [options.locationCode, options.month, options.year]
  );
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await getSholatMonth(requestOptions);
      setData(result);
      return result;
    } catch (requestError) {
      setError(requestError.message);
      setData([]);
      return [];
    } finally {
      setLoading(false);
    }
  }, [requestOptions]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};
