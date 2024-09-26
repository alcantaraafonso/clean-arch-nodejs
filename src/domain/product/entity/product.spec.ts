import Product from "./products";

describe("Product unit tests", () => {

    it("should throw error when ID is empty", () => {
        
        //Assert
        expect(() => {
            let product = new Product("", "Product 1", 100);
        }).toThrowError("ID is required");

        
    });

    it("should throw error when name is empty", () => {
        //Arrange
        //Act
        //Assert
        expect(() => { 
            let product = new Product("123", "", 100);
        }).toThrowError("Name is required");
    });

    it("should throw error when price is less than or equal to 0", () => {
        //Arrange
        //Act
        //Assert
        expect(() => {
            let product = new Product("123", "Product 1", 0);
        }).toThrowError("Price must be greater than 0");
    });

    it("should change name", () => { 
        //Arrange
        let product = new Product("123", "Product 1", 100);

        //Act
        product.changeName("Product 2");

        //Assert
        expect(product.name).toBe("Product 2");
    });


    it("should change price", () => {
        //Arrange
        let product = new Product("123", "Product 1", 100);

        //Act
        product.changePrice(200);

        //Assert
        expect(product.price).toBe(200);
    });
});