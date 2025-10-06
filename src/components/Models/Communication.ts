import { IOrder, IOrderResponse, IProductResponse } from "../../types";
import { Api } from "../base/Api";


export class Communication extends Api {
    constructor(baseUrl: string, options: RequestInit = {}) {
        super(baseUrl, options);
    }

    getProductList(): Promise<IProductResponse> {
        return this.get('/products/');
    }

    postData(order: IOrder): Promise<IOrderResponse> {
        return this.post('/order/', order);
    }
}