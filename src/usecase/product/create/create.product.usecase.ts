import Product from "../../../domain/product/entity/products";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import {
  InputCreateProductDto,
  OutputCreateProductDto,
} from "./create.product.dto";

export default class CreateCustomerUseCase {
  private productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(
    input: InputCreateProductDto
  ): Promise<OutputCreateProductDto> {
    const p = ProductFactory.create("a",input.name, input.price);
    const prod = new Product(p.id,p.name,p.price);
    await this.productRepository.create(prod);
    
    return {
      id: p.id,
      name: p.name,
      price: p.price,
    };
  }
}
