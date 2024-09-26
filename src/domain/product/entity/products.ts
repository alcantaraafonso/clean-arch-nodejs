import ProductInterface from "./product.interface";

export default class Product implements ProductInterface {
    
    private _id: string;
    private _name: string = "";
    private _price: number = 0;

    constructor(id: string, name: string, price: number) {
        this._id = id;
        this._name = name;
        this._price = price;
        this.validate();
    }

    validate(): boolean {    
        if (this._id.length === 0) {
            throw new Error("ID is required");
        }
        if (this._name.length === 0) {
            throw new Error("Name is required");
        }
        if (this._price <= 0) {
            throw new Error("Price must be greater than 0");
        }

        return true;
    }

    get id(): string { 
        return this._id;
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