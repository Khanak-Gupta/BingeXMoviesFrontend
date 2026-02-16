import axios from "axios";
import { useEffect, useState } from "react";

const useFetch = (endpoint) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!endpoint) return;

    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(endpoint, {
          signal: controller.signal,
        });

        const filtered = response.data.results?.filter(
          (item) =>
            item.poster_path &&
            item.vote_average !== 0 &&
            item.media_type !== "person"
        );

        setData(filtered || []);
      } catch (err) {
        if (err.name !== "CanceledError") {
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => controller.abort(); // cleanup
  }, [endpoint]);

  return { data, loading, error };
};

export default useFetch;
