import { IProduct } from '../../types/';

export class ProductCatalog {
    productsList: IProduct[] = [];
    choosenProducts: IProduct | null = null;

    saveProductsList(products: IProduct[]): void {
        this.productsList = products;
    }

    getProductsList(): IProduct[] {
        return this.productsList;
    }

    getProductById(id: string): IProduct | undefined {
        return this.productsList.filter(item => item.id === id)[0];
    }

    saveChoosenProduct(product: IProduct): void {
        this.choosenProducts = product;
    }

    getChoosenProduct(): IProduct | null {
        return this.choosenProducts;
    }
}