import Address from "../value-object/address";
import Customer from "./customer";

describe("Customer unit tests", () => {
    it("should throw error when ID is empty", () => {

        expect(() => {
            let customer = new Customer("", "John Doe");

        }).toThrowError("ID é requerido"); //As mensagens das exceções devem ser iguais
    });

    it("should throw error when name is empty", () => { //O nome do teste deve ser claro e objetivo

        expect(() => {
            let customer = new Customer("123", "");
        }).toThrowError("Nome inválido"); //As mensagens das exceções devem ser iguais
    });

    it("should change name", () => {
        //Triple A (Arrange, Act, Assert)
        //Arrange
        let customer = new Customer("123", "John Doe");

        //Act
        customer.changeName("John Doe 2");

        //Assert
        expect(customer.name).toBe("John Doe 2");

        
    });

    it("should activate customer", () => {
        //Arrange
        let customer = new Customer("123", "John Doe");
        let address = new Address("Rua 1", 10, "12345-123", "123");
        customer.changeAddress(address);

        customer.activate();

        expect(customer.isActive()).toBe(true);
    });

    it("should throw error when activating customer without address", () => {
        //Arrange
        expect(() => {
            let customer = new Customer("123", "John Doe");
            customer.activate();
        }).toThrowError("The address is required to activate the customer");
    });
});