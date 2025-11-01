import { IProduct } from '../../types/';
import { IEvents } from '../base/Events';

export class ProductCatalog {
    productsList: IProduct[] = [];
    choosenProduct: IProduct | null = null;

    constructor(protected events: IEvents) {}

    saveProductsList(products: IProduct[]): void {
        this.productsList = products;
        this.events.emit('catalog:change');
    }

    getProductsList(): IProduct[] {
        return this.productsList;
    }

    getProductById(id: string): IProduct | undefined {
        return this.productsList.find(item => item.id === id);
    }

    saveChoosenProduct(id: string): void {
        this.choosenProduct = this.productsList.filter(item => item.id === id)[0];
        this.events.emit('card:choose');
    }

    getChoosenProduct(): IProduct | null {
        return this.choosenProduct;
    }
}