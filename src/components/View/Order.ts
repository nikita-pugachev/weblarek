import { ensureElement } from "../../utils/utils";
import { Form, IForm } from "./Entity/Form";
import { IEvents } from "../base/Events";
import { TPayment } from "../../types";

interface IOrderForm extends IForm {
    payment: TPayment,
    address: string
}

export class Order extends Form<IOrderForm> {
    protected buttonPaymentOnline: HTMLButtonElement;
    protected buttonPaymentOffline: HTMLButtonElement;
    protected adressInput: HTMLInputElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container, events);

        this.buttonPaymentOnline = ensureElement<HTMLButtonElement>('button[name="card"]', this.container);
        this.buttonPaymentOffline = ensureElement<HTMLButtonElement>('button[name="cash"]', this.container);
        this.adressInput = ensureElement<HTMLInputElement>('input[name="address"]', this.container);

        this.buttonPaymentOnline.addEventListener('click', () => {
            const field = 'payment';
            const value = 'card';
            this.onInputChange(field, value);
        });

        this.buttonPaymentOffline.addEventListener('click', () => {
            const field = 'payment';
            const value = 'cash';
            this.onInputChange(field, value);
        });

        this.adressInput.addEventListener('input', () => {
            const field = 'address';
            const value = this.adressInput.value;
            this.onInputChange(field, value);
        });
    }

    set payment(value: TPayment) {
        this.buttonPaymentOnline.classList.toggle('button_alt-active', value === 'card');
        this.buttonPaymentOffline.classList.toggle('button_alt-active', value === 'cash');
    }

    set address(value: string) {
        this.adressInput.value = value;
    }
}