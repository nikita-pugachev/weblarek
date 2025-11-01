import './scss/styles.scss';
import { Api } from './components/base/Api';
import { Component } from './components/base/Component';
import { EventEmitter } from './components/base/Events';
import { Basket } from './components/Models/Basket';
import { Buyer } from './components/Models/Buyer';
import { Communication } from './components/Models/Communication';
import { ProductCatalog } from './components/Models/ProductCatalog';
import { BasketShop } from './components/View/BasketShop';
import { CardBasket } from './components/View/CardBasket';
import { CardCatalog } from './components/View/CardCatalog';
import { CardPreview } from './components/View/CardPreview';
import { Contact } from './components/View/Contact';
import { Gallery } from './components/View/Gallery';
import { Header } from './components/View/Header';
import { Modal } from './components/View/Modal';
import { Order } from './components/View/Order';
import { Success } from './components/View/Success';
import { API_URL, CDN_URL } from './utils/constants';
import { cloneTemplate, ensureElement } from './utils/utils';
import { IBuyer, IOrderResponse, IProduct, IProductResponse } from './types';

const api = new Communication(API_URL);
const events = new EventEmitter();
const products = new ProductCatalog(events);
const gallery = new Gallery(ensureElement(".gallery"));
const modal =  new Modal(ensureElement("#modal-container"), events);
const basket = new Basket(events);
const header = new Header(ensureElement(".header"), events);
const basketShop = new BasketShop(cloneTemplate("#basket"), events);
const buyer = new Buyer(events);
const orderForm = new Order(cloneTemplate("#order"), events);
const contactFrom = new Contact(cloneTemplate("#contacts"), events);
const success = new Success(cloneTemplate("#success"), events);

api.getProductList().then((result: IProductResponse) => {
    console.log('Данные получены');
    products.saveProductsList(result.items);
}).catch((error) => {
    console.error(error);
});

events.on('catalog:change', () => {
    const items = products.getProductsList().map((item) => {
        const cardCatalog = new CardCatalog(cloneTemplate("#card-catalog"), events);
        return cardCatalog.render(item);
    })
    gallery.render({catalog: items});
});

events.on('card:click', (event: {id: string}) => {
    const item = products.saveChoosenProduct(event.id);
});

events.on('card:choose', () => {
    const preview = new CardPreview(cloneTemplate('#card-preview'), events);
    const product = products.getChoosenProduct();

    if(!product) {
        return;
    }

    let textButton = '';
    if(!product.price) {
        textButton = 'Недоступно';
    } else {
        textButton = basket.isProductInBasket(product.id) ? 'Удалить из корзины' : 'Купить';
    }
    preview.buttonText = textButton;

    modal.openModal();
    modal.render({content: preview.render(product)});
});

events.on('card__preview:click', () => {
    const product = products.getChoosenProduct();

    if(!product) {
        return;
    }

    if(basket.isProductInBasket(product.id)) {
        basket.removeProductFromBasket(product);
    } else {
        basket.addProductToBasket(product);
    }

    modal.closeModal();
});

events.on('basket:open', () => {
    const basketShopItems = basket.getProductToBasket().map((item, index) => {
        const productBasket = new CardBasket(cloneTemplate('#card-basket'), events);

        productBasket.index = index + 1;
        productBasket.title = item.title;
        productBasket.price = item.price;

        return productBasket.render(item);
    })

    basketShop.basket = basketShopItems;
    basketShop.total = basket.getSumProductToBasket();

    modal.openModal();
    modal.render({content: basketShop.render()});
});

events.on('basket:add-card', () => {
    header.counter = basket.getCountProductToBasket();
});

events.on('card__basket:remove', (event: {id: string}) => {
    const product = products.getProductById(event.id);

    if(!product) {
        return;
    }

    basket.removeProductFromBasket(product);
});

events.on('basket:remove-card', () => {
    header.counter = basket.getCountProductToBasket();
    basketShop.basket = basket.getProductToBasket().map((item, index) => {
        const productBasket = new CardBasket(cloneTemplate('#card-basket'), events);
        productBasket.title = item.title;
        productBasket.price = item.price;
        productBasket.index = index + 1;
        return productBasket.render(item);
    })

    basketShop.total = basket.getSumProductToBasket();
    modal.render({content: basketShop.render()});
});

events.on('basket:success', () => {
    orderForm.error = '';
    
    modal.render({content: orderForm.render()});
});

events.on('form:change', (event: {field: keyof IBuyer, value: string}) => {
    buyer.saveBuyerData({[event.field]: event.value});
});

events.on('form:validate', () => {
    const errors = buyer.isValidData();

    const data = buyer.getBuyerData();
    if (data) {
        orderForm.payment = data.payment || null;
        orderForm.address = data.address || '';
        contactFrom.email = data.email || '';
        contactFrom.phone = data.phone || '';
    }

    const orderErrors = [];
    if (errors.payment) orderErrors.push(errors.payment);
    if (errors.address) orderErrors.push(errors.address);
    orderForm.error = orderErrors.join(', ');
    orderForm.buttonStatus = orderErrors.length > 0;

    const contactErrors = [];
    if (errors.email) contactErrors.push(errors.email);
    if (errors.phone) contactErrors.push(errors.phone);
    contactFrom.error = contactErrors.join(', ');
    contactFrom.buttonStatus = contactErrors.length > 0;
});

events.on('order:submit', () => {
    contactFrom.error = '';
    modal.render({content: contactFrom.render()});
});

events.on('contacts:submit', () => {
    success.total = basket.getSumProductToBasket();

    const buyerData = buyer.getBuyerData()
    const details: IOrderResponse = {
        payment: buyerData?.payment as IOrderResponse['payment'],
        email: buyerData?.email as IOrderResponse['email'],
        phone: buyerData?.phone as IOrderResponse['phone'],
        address: buyerData?.address as IOrderResponse['address'],
        total: basket.getSumProductToBasket(),
        items: basket.getProductToBasket().map(item => item.id)
    }

    api.postData(details).then(() => {
        basket.clearBasket();
        header.counter = basket.getCountProductToBasket();
    }).catch((error) => console.log('Error', error));

    modal.render({content: success.render()});
});

events.on('success:agree', () => {
    modal.closeModal();
});






