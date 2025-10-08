import { IProduct } from '../../types/';

export class ProductCatalog {
    productsList: IProduct[] = [];
    choosenProduct: IProduct | null = null;

    saveProductsList(products: IProduct[]): void {
        this.productsList = products;
    }

    getProductsList(): IProduct[] {
        return this.productsList;
    }

    getProductById(id: string): IProduct | undefined {
        return this.productsList.find(item => item.id === id);
    }

    saveChoosenProduct(product: IProduct): void {
        this.choosenProduct = product;
    }

    getChoosenProduct(): IProduct | null {
        return this.choosenProduct;
    }
}