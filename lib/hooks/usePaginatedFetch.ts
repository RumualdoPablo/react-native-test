import { useState, useCallback } from "react";
import axios from "axios";

export function usePaginatedFetch<T>(endpoint: string) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = useCallback(async () => {
    if (loading || !hasMore) {
      return;
    }
    setLoading(true);
    try {
      const res = await axios.get(`${endpoint}?page=${page}`);
      if (res.data.error || res.data.info.next === null) {
        setHasMore(false);
      } else {
        setData((prev) => [...prev, ...res.data.results]);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      setHasMore(false);
      console.error("Error fetching the data: ", error);
    } finally {
      setLoading(false);
    }
  }, [endpoint, loading, hasMore, page]);

  return {
    data,
    loading,
    fetchData,
    hasMore,
    reset: () => {
      setData([]);
      setPage(1);
      setHasMore(true);
    },
  };
}
