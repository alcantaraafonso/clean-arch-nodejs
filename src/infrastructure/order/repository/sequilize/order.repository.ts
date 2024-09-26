
import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-respository.interface";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";




export default class OrderRepository implements OrderRepositoryInterface {
    async create(entity: Order): Promise<void> {
      await OrderModel.create(
        {
          id: entity.id,
          customer_id: entity.customerID,
          total: entity.total(),
          items: entity.items.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            product_id: item.productId,
          })),
        },
        {
          include: [{ model: OrderItemModel }],
        }
      );
    }
  
    async update(entity: Order): Promise<void> {
      const order = await OrderModel.findByPk(entity.id, {
        include: ["items"],
      });
      await order
        .update({
          total: entity.total(),
        })
        .then(() => {
          OrderItemModel.bulkCreate(
            entity.items.map((item) => ({
              id: item.id,
              name: item.name,
              price: item.price,
              quantity: item.quantity,
              order_id: entity.id,
              product_id: item.productId,
            })),
            {
              updateOnDuplicate: ["name", "price", "quantity", "product_id"],
            }
          );
        });
    }
    async find(id: string): Promise<Order> {
      const orderResult = await OrderModel.findByPk(id, {
        include: ["items"],
      });
      return new Order(
        orderResult.id,
        orderResult.customer_id,
        orderResult.items.map(
          (item) =>
            new OrderItem(
              item.id,
              item.name,
              item.price,
              item.product_id,
              item.quantity
            )
        )
      );
    }
    async findAll(): Promise<Order[]> {
      const orders = await OrderModel.findAll({
        include: ["items"],
      });
      return orders.map(
        (order) =>
          new Order(
            order.id,
            order.customer_id,
            order.items.map(
              (item) =>
                new OrderItem(
                  item.id,
                  item.name,
                  item.price,
                  item.product_id,
                  item.quantity
                )
            )
          )
      );
    }
  }