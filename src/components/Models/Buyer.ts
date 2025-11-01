import { IBuyer } from "../../types";
import { IEvents } from "../base/Events";

export class Buyer {
    buyerData: IBuyer | null = null;

    constructor(protected events: IEvents) {}

    saveBuyerData(data: Partial<IBuyer>): void {
        if(!this.buyerData) {
            this.buyerData = {
                payment: null,
                email: '',
                phone: '',
                address: ''
            };
        }
        Object.assign(this.buyerData, data);
        this.events.emit('form:validate');
    }

    getBuyerData(): IBuyer | null {
        return this.buyerData;
    }

    clearBuyerData(): void {
        this.buyerData = null;
    }

    isValidData(): Record<string, string> {
        const errors: Record<string, string> = {};
        if (!this.buyerData) {
            errors.payment = 'Не указан способ оплаты';
            errors.email = 'Необходимо указать адресс электронной почты';
            errors.phone = 'Необходимо указать номер телефона';
            errors.address = 'Необходимо указать адрес';
            return errors;
        }
        if (!this.buyerData.payment) {
            errors.payment = 'Не указан способ оплаты';
        }
        if (!this.buyerData.email) {
            errors.email = 'Необходимо указать адресс электронной почты';
        }
        if (!this.buyerData.phone) {
            errors.phone = 'Необходимо указать номер телефона';
        }
        if (!this.buyerData.address) {
            errors.address = 'Необходимо указать адрес';
        }
        return errors;
    }
}