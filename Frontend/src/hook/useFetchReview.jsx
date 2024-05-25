import { useEffect, useState } from "react";

const useFetchReview = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null); // Reset error when starting a new fetch
      try {
        const res = await fetch(url);

        if (!res.ok) {
          // Handle non-2xx HTTP responses
          const errorResult = await res.json();
          throw new Error(errorResult.message || "Failed to fetch data");
        }

        const result = await res.json();
        setData(result.data);
        setLoading(false);
        console.log(result.data);
      } catch (err) {
        setLoading(false);
        setError(err.message);
        console.log(err.message);
      }
    };
    fetchData();
  }, [url]);

  return {
    data,
    loading,
    error,
  };
};

export default useFetchReview;
