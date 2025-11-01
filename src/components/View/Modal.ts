import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface IModal {
    content: HTMLElement;
} 

export class Modal extends Component<IModal> {
    protected modalElement: HTMLElement;
    protected closeButton: HTMLButtonElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        this.modalElement = ensureElement<HTMLElement>('.modal__content', this.container);
        this.closeButton = ensureElement<HTMLButtonElement>('.modal__close', this.container);

        this.closeButton.addEventListener('click', () => {
            this.closeModal();
            this.events.emit('modal:close');
        });

        document.addEventListener('keydown', (e) => {
            if(this.container.classList.contains('modal_active') && e.key === 'Escape') {
                this.closeModal();
                this.events.emit('modal:close');
            }
        });
    }

    set content(items: HTMLElement) {
        this.modalElement.replaceChildren(items);
    }

    openModal(): void {
        this.container.classList.add('modal_active');
    }

    closeModal(): void {
        this.container.classList.remove('modal_active');
    }
}