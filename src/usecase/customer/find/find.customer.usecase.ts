
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-respository.interface";
import {
  InputFindCustomerDto,
  OutputFindCustomerDto,
} from "./find.customer.dto";

export default class FindCustomerUseCase {
  private customerRepository: CustomerRepositoryInterface;

  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository;
  }

  async execute(input: InputFindCustomerDto): Promise<OutputFindCustomerDto> {

    // O método find é um método de um repositório que consulta o customer pelo id
    // e retorna um objeto DTO.
    // O objeto Customer (entity) nunca deve ser retornado/trafegado para fora do domínio.
    const customer = await this.customerRepository.find(input.id);

    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.address.street,
        city: customer.address.city,
        number: customer.address.number,
        zip: customer.address.zipCode,
      },
    };
  }
}
