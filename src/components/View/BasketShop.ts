import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface IBasketShop {
    total: number;
    basket: HTMLElement[];
}

export class BasketShop extends Component<IBasketShop> {
    protected basketTitle: HTMLElement;
    protected basketButton: HTMLButtonElement;
    protected basketContainer: HTMLElement;
    protected totalPrice: HTMLElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        this.basketTitle = ensureElement<HTMLElement>('.modal__title', this.container);
        this.basketButton = ensureElement<HTMLButtonElement>('.basket__button', this.container);
        this.basketContainer = ensureElement<HTMLElement>('.basket__list', this.container);
        this.totalPrice = ensureElement<HTMLElement>('.basket__price', this.container);

        this.basketButton.addEventListener('click', () => {
            this.events.emit('basket:success');
        })
    }

    set total(value: number) {
        this.totalPrice.textContent = `${value} синапсов`;
    }

    set basket(items: HTMLElement[]) {
        if(!items) {
            this.basketContainer.textContent = 'Корзина пуста';
        }
        this.basketContainer.replaceChildren(...items);
    }

    set buttonStatus(value: boolean) {
        this.basketButton.disabled = value;
    }
}