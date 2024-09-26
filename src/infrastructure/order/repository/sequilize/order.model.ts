import { BelongsTo, Column, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import OrderItemModel from "./order-item.model";
import CustomerModel from "../../../customer/repository/sequilize/customer.model";

@Table({
    tableName: "orders",
    timestamps: false
})
export default class OrderModel extends Model {
    @PrimaryKey
    @Column
    declare id: string;

    //Recupera só o ID
    @ForeignKey(() => CustomerModel)
    @Column({allowNull: false})
    declare customer_id: string;

    //Recupera o objeto inteiro de Customer
    @BelongsTo(() => CustomerModel)
    declare customer: CustomerModel;

    //Relacionamento 1:N
    @HasMany(() => OrderItemModel)
    declare items: OrderItemModel[];

    @Column({allowNull: false})
    declare total: number;
}