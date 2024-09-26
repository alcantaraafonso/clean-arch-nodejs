import Order from "./order";
import OrderItem from "./order_item";

describe('Order', () => {
    it("should throw an erro when id is empty", () => {
        expect(() => {
            new Order("", "customerID", []);
        }).toThrowError("ID is required");
    });

    it("should throw an error when customerID is empty", () => {
        expect(() => {
            new Order("id", "", []);
        }).toThrowError("CustomerID is required");
    });

    it("should calculate the total of the order", () => {
        const order = new Order("id", "customerID", [
            new OrderItem("id1", "name 1", 100, "productId", 2),
            new OrderItem("id2", "name 2", 200, "productId", 2)
        ]);

        let total = order.total();

        expect(total).toBe(600);
    });


    it("should throw error whether quantity is less or equal than zero", () => {
        
        expect(() => {
            const order = new Order("id", "customerID", [
                new OrderItem("id1", "name 1", 100, "productId", 0)
            ]);
            
        }).toThrowError("Quantity must be greater than 0");
    });

});