import { ensureElement } from "../../../utils/utils";
import { Component } from "../../base/Component";
import { IEvents } from "../../base/Events";

export interface IForm {
    error: string
}

export abstract class Form<T extends IForm> extends Component<T> {
    protected formError: HTMLElement;
    protected formButton: HTMLButtonElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        this.formError = ensureElement<HTMLElement>('.form__errors', this.container);
        this.formButton = ensureElement<HTMLButtonElement>('.modal__actions button', this.container);
    }

    set error(value: string) {
        this.formError.textContent = value;
    }

    set buttonStatus(value: boolean) {
        this.formButton.disabled = value;
    }

    protected onInputChange(field: keyof T, value: string) {
        this.events.emit('form:change', {
        field,
        value,
        });
    }
}