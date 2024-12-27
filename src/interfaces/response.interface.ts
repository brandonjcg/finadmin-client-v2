export interface IInfo {
  page?: number;
  limit?: number;
  total: number;
  totalPages?: number;
  sort?: string;
  order?: string;
}

export interface IResponseApi<T> {
  error: boolean;
  statusCode: number;
  path: string;
  message: string;
  data: T[];
  info: IInfo;
}
