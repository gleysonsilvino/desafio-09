import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import ICreateCustomerDTO from '@modules/customers/dtos/ICreateCustomerDTO';
import { v4 as uuid } from 'uuid';
import Customer from '../../infra/typeorm/entities/Customer';

class FakeCustomersRepository implements ICustomersRepository {
  private customers: Customer[] = [];

  public async create(data: ICreateCustomerDTO): Promise<Customer> {
    const customer = new Customer();

    Object.assign(customer, { id: uuid() }, data);

    this.customers.push(customer);

    return customer;
  }

  public async findById(id: string): Promise<Customer | undefined> {
    const findCustomer = this.customers.find(customer => customer.id === id);

    return findCustomer;
  }

  public async findByEmail(email: string): Promise<Customer | undefined> {
    const findCustomer = this.customers.find(
      customer => customer.email === email,
    );

    return findCustomer;
  }
}

export default FakeCustomersRepository;
