export { };
// https://bobbyhadz.com/blog/typescript-make-types-global#declare-global-types-in-typescript

declare global {
  interface IRequest {
    url: string;
    method: string;
    body?: { [key: string]: any };
    param?: string,
    queryParams?: any;
    useCredentials?: boolean;
    headers?: any;
    nextOption?: any;
    token?: any;
  }

  interface IBackendRes<T> {
    error?: string | string[];
    message: string;
    statusCode: number | string;
    data?: T;
  }

  interface IModelPaginate<T> {
    meta: {
      current: number;
      pageSize: number;
      pages: number;
      total: number;
    },
    result: T[]
  }

  interface ILogin {
    user: {
      _id: string,
      email: string,
      name: string,
      role: string,
    },
    access_token: string
  }


  interface IUser {
    _id: string,
    email: string,
    name: string,
    phone: string,
    address?: string,
    account_type: string,
    role: string,
    is_active: boolean,
    createdAt: Date,
    updatedAt: Date,
  }
  interface IBus {
    _id: string,
    name: string,
    licensePlate: string,
    type: string,
    capacity: number,
    createdAt?: Date,
    updatedAt?: Date,
  }


  interface IBusRoute {
    _id: string,
    departure: string,
    destination: string;
    distance?: number;
    estimatedTime?: number;
    schudules?: string[];
    createdAt?: Date,
    updatedAt?: Date,
  }

  interface ITrip {
    _id: string,
    bus?: IBus,
    driver?: IUser;
    busRoute?: IBusRoute;
    price: number;
    departure_time: Date,
    arrival_time: Date,
    createdAt?: Date,
    updatedAt?: Date,
    is_outbound
  }


  export interface IListMeta<T> {
    data: T[];
    total: number;
    page: string;
    limit: string;
    totalPages: number;
  }
}
