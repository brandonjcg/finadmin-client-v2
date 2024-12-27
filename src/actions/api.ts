'use server';

import { IResponseApi } from '@/interfaces';
import { API_SERVER_URL, TEMPORAL_TOKEN } from '@/config';
import { buildError, ICustomError } from '@/utils';

interface Props {
  url: string;
  cache?: RequestCache;
}

export const getData = async <T>({
  url,
  cache = 'no-store',
}: Props): Promise<IResponseApi<T>> => {
  try {
    const fullUrl = `${API_SERVER_URL}${url}`;
    const res = await fetch(fullUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${TEMPORAL_TOKEN}`,
      },
      cache,
    });
    if (!res.ok) throw new Error('Failed to fetch data');

    return res.json();
  } catch (error) {
    return {
      error: true,
      statusCode: 500,
      path: url,
      message: buildError(error as ICustomError),
      data: [],
      info: {
        total: 0,
      },
    };
  }
};
