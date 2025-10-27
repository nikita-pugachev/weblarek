import { ensureElement } from "../../utils/utils";
import { Form, IForm } from "./Entity/Form";
import { IEvents } from "../base/Events";

interface IContactForm extends IForm {
    email: string,
    phone: string
}

export class Contact extends Form<IContactForm> {
    protected emailInput: HTMLInputElement;
    protected phoneInput: HTMLInputElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container, events);

        this.emailInput = ensureElement<HTMLInputElement>('input[name="email"]', this.container);
        this.phoneInput = ensureElement<HTMLInputElement>('input[name="phone"]', this.container);

        this.emailInput.addEventListener('input', () => {
            const field = 'email';
            const value = this.emailInput.value;
            this.onInputChange(field, value);
        });

        this.phoneInput.addEventListener('input', () => {
            const field = 'email';
            const value = this.phoneInput.value;
            this.onInputChange(field, value);
        });
    }
}