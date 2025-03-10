import { useState, useEffect } from 'react';

interface Column {
  title: string;
  data: string;
}

interface DataEntry {
  id: string;
  title: string;
  category: string;
  date: string;
  audience: string[];
  what: string;
  action?: string;
  notes?: string;
  resources?: string;
  who: string;
}

interface DataResponse {
  columns: Column[];
  data: Record<string, DataEntry>;
}

export const useData = () => {
  const [columns, setColumns] = useState<Column[]>([]);
  const [data, setData] = useState<DataEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Use local mock data in development
        const response = await fetch(process.env.NODE_ENV === 'development' 
          ? '/mockData.json'
          : 'https://database-techcom.netlify.app/data.json'
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const jsonData = await response.json();
        setColumns(jsonData.columns);
        setData(Object.values(jsonData.data));
        setLoading(false);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err instanceof Error ? err.message : 'An error occurred while fetching data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { columns, data, loading, error };
};
