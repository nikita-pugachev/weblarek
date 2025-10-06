import './scss/styles.scss';
import { ProductCatalog } from './components/Models/ProductCatalog';
import { Basket } from './components/Models/Basket';
import { Buyer } from './components/Models/Buyer';
import { apiProducts } from './utils/data';

const ProductCatalogModel = new ProductCatalog();
ProductCatalogModel.saveProductsList(apiProducts.items);
console.log('Массив товаров из каталога: ', ProductCatalogModel.getProductsList());

const BasketModel = new Basket();
BasketModel.addProductToBasket(apiProducts.items[0]);
console.log('Корзина после добавления товара: ', BasketModel.getProductToBasket());

const BuyerModel = new Buyer();
BuyerModel.saveBuyerData({
    payment: "online",
    email: "nikita@yandex.ru",
    phone: "88005553535",
    address: "Moscow, Pushkin Street"
})

console.log('Инофрмация о покупателе: ', BuyerModel.getBuyerData());

