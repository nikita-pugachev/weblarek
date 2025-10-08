import './scss/styles.scss';
import { IProduct } from './types';
import { ProductCatalog } from './components/Models/ProductCatalog';
import { Basket } from './components/Models/Basket';
import { Buyer } from './components/Models/Buyer';
import { apiProducts } from './utils/data';
import { Communication } from './components/Models/Communication';
import { API_URL } from './utils/constants';

const ProductCatalogModel = new ProductCatalog();
ProductCatalogModel.saveProductsList(apiProducts.items);
console.log('Массив товаров из каталога: ', ProductCatalogModel.getProductsList());
if(!ProductCatalogModel.getProductById("854cef69-976d-4c2a-a18c-2aa45046c390")){
    console.log('Элемент по запрашиваемому ID отсутствует');
} else {
    console.log('Элемент по запрашиваемому ID: ', ProductCatalogModel.getProductById("854cef69-976d-4c2a-a18c-2aa45046c390"));
}
const chooseProduct = {
    id: "c101ab44-ed99-4a54-990d-47aa2bb4e7d9",
    description: "Лизните этот леденец, чтобы мгновенно запоминать и узнавать любой цветовой код CSS.",
    image: "/Shell.svg",
    title: "HEX-леденец",
    category: "другое",
    price: 1450
}
ProductCatalogModel.saveChoosenProduct(chooseProduct);
console.log('Получен товар для подробного отображения: ', ProductCatalogModel.getChoosenProduct());

const BasketModel = new Basket();
BasketModel.addProductToBasket(apiProducts.items[0]);
BasketModel.addProductToBasket(apiProducts.items[1]);
console.log('Корзина после добавления товара: ', BasketModel.getProductToBasket());
console.log('Сумма всех товаров в корзине: ', BasketModel.getSumProductToBasket());
BasketModel.removeProductFromBasket(apiProducts.items[1]);
console.log('Корзина после удаления товара: ', BasketModel.getProductToBasket());
if(BasketModel.isProductInBasket(apiProducts.items[0].id)) {
    console.log('Товар уже есть в корзине');
} else {
    console.log('Товара нет в корзине');
}
BasketModel.clearBasket();
console.log('Корзина после очистки: ', BasketModel.getProductToBasket());

const BuyerModel = new Buyer();
BuyerModel.saveBuyerData({
    payment: "cash",
    email: "nikita@yandex.ru",
    phone: "88005553535",
    address: "Moscow, Pushkin Street"
})
console.log('Инофрмация о покупателе: ', BuyerModel.getBuyerData());
console.log('Информация об ошибках после валидации: ', BuyerModel.isValidData());

const CommunicationModel = new Communication(API_URL);
try {
    const products = await CommunicationModel.getProductList();
    console.log('Ответ от сервера с каталогом товаров: ', products);
} catch (error) {
    console.error('Ошибка при получении данных с сервера: ', error);
}

try {
    const buyerData = BuyerModel.getBuyerData();
    if (!buyerData) {
        throw new Error('Нет данных о покупателе');
    }
    const order = {
        buyer: buyerData,
        items: BasketModel.getProductToBasket()
    };
    const orderResponse = await CommunicationModel.postData(order);
    console.log('Ответ от сервера после оформления заказа: ', orderResponse);
} catch (error) {
    console.error('Ошибка при отправке данных на сервер: ', error);
}

BuyerModel.clearBuyerData();
console.log('Данные о покупателе после сброса: ', BuyerModel.getBuyerData());