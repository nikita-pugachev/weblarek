import { IBuyer } from "../../types";

export class Buyer {
    buyerData: IBuyer | null = null;

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
            errors.payment = 'Не выбран вид оплаты';
            errors.email = 'Укажите емэйл';
            errors.phone = 'Укажите телефон';
            errors.address = 'Укажите адрес';
            return errors;
        }
        if (!this.buyerData.payment) {
            errors.payment = 'Не выбран вид оплаты';
        }
        if (!this.buyerData.email) {
            errors.email = 'Укажите емэйл';
        }
        if (!this.buyerData.phone) {
            errors.phone = 'Укажите телефон';
        }
        if (!this.buyerData.address) {
            errors.address = 'Укажите адрес';
        }
        return errors;
    }
}