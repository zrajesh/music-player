import { useState, useEffect } from "react";

interface Song {
  id: number;
  name: string;
  artist: string;
  accent: string;
  cover: string;
  top_track: boolean;
  url: string;
}

interface ApiResponse {
  data: Song[];
}

const useFetch = (url: string) => {
  const [data, setData] = useState<ApiResponse | null | undefined>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result);
      } catch (error: any) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, isLoading, error };
};

export default useFetch;
