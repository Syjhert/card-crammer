import { useEffect, useState } from 'react';

function useCachedFetch(url, options) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const cachedData = localStorage.getItem(url);
      if (cachedData) {
        setData(JSON.parse(cachedData));
      } else {
        const response = await fetch(url, options);
        const jsonData = await response.json();
        localStorage.setItem(url, JSON.stringify(jsonData));
        setData(jsonData);
      }
    };
    fetchData();
  }, [url, options]);

  return data;
}