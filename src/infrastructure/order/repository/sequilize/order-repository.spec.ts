import { Sequelize } from "sequelize-typescript";

import OrderRepository from "./order.repository";
import CustomerModel from "../../../customer/repository/sequilize/customer.model";
import OrderModel from "./order.model";
import OrderItemModel from "./order-item.model";
import ProductModel from "../../../product/repository/sequilize/product.model";
import CustomerRepository from "../../../customer/repository/sequilize/customer.repository";
import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/customer/value-object/address";
import ProductRepository from "../../../product/repository/sequilize/product.repository";
import Product from "../../../../domain/product/entity/products";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import Order from "../../../../domain/checkout/entity/order";


describe("Order repository test", () => {
    let sequelize: Sequelize;
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        });

        sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a new order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", "City 1", "zipcode 1", 1);
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 10);
        await productRepository.create(product);

        const orderItem = new OrderItem("1", product.name, product.price, product.id, 2);

        const order = new Order("11", customer.id, [orderItem]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({
            where: { id: order.id },
            include: ['items']
        });

        expect(orderModel.toJSON()).toStrictEqual({
            id: "11",
            customer_id: "123",
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    quantity: orderItem.quantity,
                    price: orderItem.price,
                    order_id: "11",
                    product_id: "123",
                }
            ]
        });
    });

    it("should update an order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("c123", "Customer 1");
        const address = new Address("Street 1", "Zipcode 1", "City 1", 1);
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("p123", "Product 1", 10);
        await productRepository.create(product);

        const orderItem = new OrderItem("i1", product.name, product.price, product.id, 2);
        const order = new Order("o123", customer.id, [orderItem]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        orderItem.changeQuantity(2);
        await orderRepository.update(order);

        const updatedOrderModel = await OrderModel.findOne(
            {
                where: { id: order.id },
                include: ["items"],
            }
        );

        expect(updatedOrderModel.toJSON()).toStrictEqual({
            id: order.id,
            customer_id: customer.id,
            total: 40,
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: 4,
                    product_id: orderItem.productId,
                    order_id: order.id
                }
            ],
        });
    });

    it("should find an order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("c123", "Customer 1");
        const address = new Address("Street 1", "Zipcode 1", "City 1", 1);
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("p123", "Product 1", 10);
        await productRepository.create(product);

        const orderItem = new OrderItem("i1", product.name, product.price, product.id, 2);
        const order = new Order("o123", customer.id, [orderItem]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne(
            {
                where: { id: order.id },
                include: ["items"],
            }
        );

        const foundOrder = await orderRepository.find(order.id);
        expect(orderModel.toJSON()).toStrictEqual({
            id: foundOrder.id,
            customer_id: foundOrder.customerID,
            items: [
                {
                    id: foundOrder.items[0].id,
                    name: foundOrder.items[0].name,
                    price: foundOrder.items[0].price,
                    quantity: foundOrder.items[0].quantity,
                    product_id: foundOrder.items[0].productId,
                    order_id: foundOrder.id
                }
            ],
            total: foundOrder.total(),
        });
    });

    it("should find all orders", async () => {
        const customerRepository = new CustomerRepository();
        const productRepository = new ProductRepository();
        const orderRepository = new OrderRepository();

        // order 1 => product 1 vs customer 1
        const customer1 = new Customer("c123", "Customer 1");
        const address1 = new Address("Street 1", "Zipcode 1", "City 1", 1);
        customer1.changeAddress(address1);
        await customerRepository.create(customer1);

        const product1 = new Product("p123", "Product 1", 10);
        await productRepository.create(product1);

        const orderItem1 = new OrderItem("i1", product1.name, product1.price, product1.id, 2);
        const order1 = new Order("o123", customer1.id, [orderItem1]);
        await orderRepository.create(order1);

        // order 2 => product 2 and 2 vs customer 2
        const customer2 = new Customer("c890", "Customer 2");
        const address2 = new Address("Street 2", "Zipcode 2", "City 2", 2);
        customer2.changeAddress(address2);
        await customerRepository.create(customer2);

        const product2 = new Product("p890", "Product 9", 5);
        await productRepository.create(product2);

        const orderItem2 = new OrderItem("i9", product2.name, product2.price, product2.id, 5);
        const orderItem3 = new OrderItem("i10", product1.name, product1.price, product1.id, 2);
        const order2 = new Order("o890", customer2.id, [orderItem3, orderItem2]);
        await orderRepository.create(order2);

        const orders = [order1, order2];
        const allOrders = await orderRepository.findAll();

        expect(orders).toEqual(allOrders);
    });
});