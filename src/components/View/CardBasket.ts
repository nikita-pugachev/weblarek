import { ensureElement } from "../../utils/utils";
import { Card } from "./Entity/Card";
import { IProduct } from "../../types";
import { IEvents } from "../base/Events";

export class CardBasket extends Card<IProduct> {
    protected cardIndex: HTMLElement;
    protected cardButtonRemove: HTMLButtonElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        this.cardIndex = ensureElement<HTMLElement>('.basket__item-index', this.container);
        this.cardButtonRemove = ensureElement<HTMLButtonElement>('.basket__item-delete', this.container);

        this.cardButtonRemove.addEventListener('click', () => {
            this.events.emit('card__basket:remove', {id: this.CardId});
        })
    }

    set index(value: number) {
        this.cardIndex.textContent = String(value);
    }
}