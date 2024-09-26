import ProductB from "../entity/product-b";
import ProductInterface from "../entity/product.interface";
import Product from "../entity/products";
import { v4 as uuid } from 'uuid';

export default class ProductFactory {
    public static create(type: string, name: string, price: number): ProductInterface {
        if (type === "a") {
            return new Product(uuid(), name, price);
        } else if (type === "b") {
            return new ProductB(uuid(), name, price);
        }
        throw new Error("Invalid product type");
    }
}