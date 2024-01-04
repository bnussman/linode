import Axios, { AxiosError, AxiosRequestConfig, AxiosHeaders, AxiosHeaderValue } from 'axios';

const baseURL = 'https://api.linode.com/v4/';

export const AXIOS_INSTANCE = Axios.create({ baseURL }); 

export const customInstance = <T>(
  config: AxiosRequestConfig,
  filter?: Filter,
  options?: AxiosRequestConfig,
): Promise<T> => {
  const promise = AXIOS_INSTANCE({
    ...config,
    ...options,
    headers: {...options?.headers, 'X-Filter': filter as AxiosHeaderValue },
  }).then(({ data }) => data);

  return promise;
};

export type ErrorType<Error> = AxiosError<Error>;

export type BodyType<BodyData> = BodyData;

export type Filter = LinodeFilter;

interface FilterConditionTypes {
  '+and'?: Filter[];
  '+or'?: Filter[] | string[];
  '+order_by'?: string;
  '+order'?: 'asc' | 'desc';
  '+gt'?: number;
  '+gte'?: number;
  '+lt'?: number;
  '+lte'?: number;
  '+contains'?: string;
  '+neq'?: string;
}

type LinodeFilter =
  | {
      [key in keyof FilterConditionTypes]: FilterConditionTypes[key];
    }
  | { [key: string]: string | number | boolean | Filter | null | undefined };
