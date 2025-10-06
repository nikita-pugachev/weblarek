import { IProduct } from "../../types";

export class Basket {
    productShopList: IProduct[] = [];

    getProductToBasket(): IProduct[] {
        return this.productShopList;
    }

    addProductToBasket(product: IProduct): void {
        this.productShopList.push(product);
    }

    removeProductFromBasket(product: IProduct): void {
        this.productShopList = this.productShopList.filter(item => item.id !== product.id);
    }

    clearBasket(): void {
        this.productShopList = [];
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