import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
import ProductValidatorFactory from "../factory/product.validator.factory";
import ProductInterface from "./product.interface";

export default class Product extends Entity implements ProductInterface {
    
    private _name: string = "";
    private _price: number = 0;

    constructor(id: string, name: string, price: number) {
        super();
        this._id = id;
        this._name = name;
        this._price = price;
        this.validate();
        if (this.notification.hasErrors()) {
            throw new NotificationError(this.notification.getErrors());
        }
    }

    validate() {    
        ProductValidatorFactory.create().validate(this);
    }

    changeName(newName: string) {
        this._name = newName;
        this.validate();
    }

    get name(): string {
        return this._name;
    }

    changePrice(newPrice: number) {
        this._price = newPrice;
        this.validate();
    }

    get price(): number {
        return this._price;
    }
}