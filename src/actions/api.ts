'use server';

import { IResponseApi } from '@/interfaces';
import { API_SERVER_URL, TEMPORAL_TOKEN } from '@/config';
import { buildError, ICustomError } from '@/utils';

const fetchData = async <T>({
  url,
  options,
}: {
  url: string;
  options: RequestInit;
}): Promise<IResponseApi<T>> => {
  try {
    const fullUrl = `${API_SERVER_URL}${url}`;
    const res = await fetch(fullUrl, options);

    const responseJson = await res.json();
    return responseJson as IResponseApi<T>;
  } catch (error) {
    throw buildError(error as ICustomError);
  }
};

export const getData = async <T>({
  url,
  cache = 'no-store',
}: {
  url: string;
  cache?: RequestCache;
}): Promise<IResponseApi<T[]>> => {
  return fetchData<T[]>({
    url,
    options: {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${TEMPORAL_TOKEN}`,
      },
      cache,
    },
  });
};

export const createRow = async <T>({
  url,
  body,
}: {
  url: string;
  body: T;
}): Promise<IResponseApi<T>> => {
  return fetchData<T>({
    url,
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TEMPORAL_TOKEN}`,
      },
      body: JSON.stringify(body),
    },
  });
};
