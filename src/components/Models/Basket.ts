import { IProduct } from "../../types";
import { IEvents } from "../base/Events";

export class Basket {
    protected productShopList: IProduct[] = [];

    constructor(protected events: IEvents) {}

    addProductToBasket(product: IProduct): void {
        this.productShopList.push(product);
        this.events.emit('basket:add-card');
    }

    removeProductFromBasket(product: IProduct): void {
        this.productShopList = this.productShopList.filter(item => item.id !== product.id);
        this.events.emit('basket:change');
    }

    getProductToBasket(): IProduct[] {
        return this.productShopList;
    }

    clearBasket(): void {
        this.productShopList = [];
        this.events.emit('basket:change')
    }

    getSumProductToBasket(): number {
        return this.productShopList.reduce((acc, item) => acc + (item.price || 0), 0);
    }

    getCountProductToBasket(): number {
        return this.productShopList.length;
    }

    isProductInBasket(id: string): boolean {
        return this.productShopList.some(item => item.id === id);
    }
}