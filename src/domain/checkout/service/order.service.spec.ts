import Customer from "../../customer/entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import OrderService from "./order.service";

describe("Order service unit tests", () => {

    it("should placa an order", () => {
        const customer = new Customer("1", "Customer 1");
        const item1 = new OrderItem("1", "item 1", 10, "product 1", 1);

        const order = OrderService.placeOrder(customer, [item1]);

        expect(customer.rewardPoints).toBe(5);
        expect(order.total()).toBe(10);
    });


    it("should get total of all orders", () => {

        const order_item1 = new OrderItem("1", "item 1", 100, "product 1", 1);
        const order_item2 = new OrderItem("2", "item 2", 200, "product 2", 2);

        
        const order1 = new Order("1", "Customer 1", [order_item1]);
        const order2 = new Order("2", "Customer 1", [order_item2]);
        
        const total = OrderService.total([order1, order2]);

        expect(total).toBe(500);
    });

    it("should add reward points to customer", () => {
        const customer = new Customer("1", "Customer 1");
        expect(customer.rewardPoints).toBe(0);

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(10);

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(20);
    });
});
