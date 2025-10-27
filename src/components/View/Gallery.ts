import { Component } from "../base/Component";

interface IGallery {
    catalog: HTMLElement[];
}

export class Gallery extends Component<IGallery> {
    constructor(container: HTMLElement) {
        super(container);
    }

    set catalog(products: HTMLElement[]) {
        this.container.replaceChildren(...products);
    }
}