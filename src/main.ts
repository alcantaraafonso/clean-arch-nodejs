import Customer from "./domain/customer/entity/customer";
import Order from "./domain/checkout/entity/order";
import OrderItem from "./domain/checkout/entity/order_item";

let customer = new Customer('1', 'John Doe');
customer.activate();

const item1 = new OrderItem('1', 'Item 1', 100, "p1", 2);
const item2 = new OrderItem('2', 'Item 2', 200, "p2", 2);

const order = new Order('1', customer.id, [item1, item2]);