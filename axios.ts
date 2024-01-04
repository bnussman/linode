import Axios, { AxiosError, AxiosRequestConfig } from 'axios';

const baseURL = 'https://api.linode.com/v4/';

export const AXIOS_INSTANCE = Axios.create({ baseURL }); 

export const customInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> => {
  const promise = AXIOS_INSTANCE({ ...config, ...options, }).then(({ data }) => data);

  return promise;
};

export type ErrorType<Error> = AxiosError<Error>;

export type BodyType<BodyData> = BodyData;
