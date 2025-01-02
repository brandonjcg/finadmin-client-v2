import { useState, useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';
import { getData } from '@/actions';
import { IOption } from '@/interfaces';

export const useGetSelect = ({ url }: { url: string }) => {
  const [rows, setRows] = useState<IOption[]>([]);

  useEffect(() => {
    const getRows = async () => {
      try {
        const response = await getData<IOption[]>({
          url,
          cache: 'force-cache',
        });
        if (response.error)
          return response.message.forEach((message) => toast.error(message));

        setRows(response.data);
      } catch (error) {
        throw error;
      }
    };

    getRows();
  }, [url]);

  const memoizedRows = useMemo(() => {
    return rows;
  }, [rows]);

  return { rows: memoizedRows };
};
