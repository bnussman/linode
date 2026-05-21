export interface FilterConditionTypes {
  '+and'?: Filter[];
  '+contains'?: string;
  '+eq'?: number | string;
  '+gt'?: number;
  '+gte'?: number;
  '+lt'?: number;
  '+lte'?: number;
  '+neq'?: string;
  '+or'?: Filter[] | string[];
  '+order'?: 'asc' | 'desc';
  '+order_by'?: string;
}

type LinodeFilter =
  | { [key: string]: boolean | Filter | null | number | string | undefined }
  | {
      [key in keyof FilterConditionTypes]: FilterConditionTypes[key];
    };

/**
 * A TypeScript type representing the Linode API v4 X-Filter header value
 */
export type Filter = LinodeFilter | LinodeFilter[];
