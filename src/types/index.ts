export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export type TPayment = 'online' | 'cash' | null;

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export interface IProduct {
    id: string,
    description: string,
    image: string,
    title: string,
    category: string,
    price: number | null
}

export interface IBuyer {
    payment: TPayment,
    email: string,
    phone: string,
    address: string,
}

export interface IOrder {
    buyer: IBuyer,
    items: IProduct[]
}

export interface IOrderResponse {
    payment: string,
    email: string, 
    phone: string, 
    address: string,
    total: number,
    items: string[]
}

export interface IProductResponse {
    total: number,
    items: IProduct[]
}