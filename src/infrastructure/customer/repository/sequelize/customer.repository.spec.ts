import { Sequelize } from "sequelize-typescript";
import CustomerModel from "./customer.model";
import CustomerRepository from "./customer.repository";
import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/customer/value-object/address";


const makeCustomer = (
  id: string,
  name: string,
  street: string,
  houseNumber: number,
  zip: string,
  city:string
  ) => {

    const inputCustomer = {
      id,
      name,
      street,
      number: houseNumber,
      zip,
      city,
    }

    const customer = new Customer(inputCustomer.id, inputCustomer.name);
    const address = new Address(inputCustomer.street, inputCustomer.number, inputCustomer.zip, inputCustomer.city);
    customer.Address = address;
    return {
        customer
    }
}

describe('', () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
      sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        sync: { force: true },
      });
  
      await sequelize.addModels([CustomerModel]);
      await sequelize.sync();
    });
  
    afterEach(async () => {
      await sequelize.close();
    });
  

    it('Should create a customer', async ()=> {
        const { customer } = makeCustomer("123", "John", "Street 1", 12, "12662459", "New York")
        const customerRepository = new CustomerRepository();
 
        await customerRepository.create(customer);

        const customerModel = await CustomerModel.findOne({ where: { id: "123" } });

        expect(customerModel?.toJSON()).toEqual({
            id: "123",
            name: "John",
            street: "Street 1",
            number: 12,
            zipcode: "12662459",
            city: "New York",
            active: false,
            rewardPoints: 0
          })

    })

    it('Should update a customer', async ()=> {
      const { customer } = makeCustomer("123", "John", "Street 1", 12, "12662459", "New York")
      const customerRepository = new CustomerRepository();

      await customerRepository.create(customer);
      const customerModel = await CustomerModel.findOne({ where: { id: "123" } });
      
      expect(customerModel!.id).toBe("123")
      expect(customerModel!.name).toBe("John")

      customer.changeName("Name Updated")

      await customerRepository.update(customer)

      const customerModelUpdated = await CustomerModel.findOne({ where: { id: "123" } });

      expect(customerModelUpdated!.id).toBe("123")
      expect(customerModelUpdated!.name).toBe("Name Updated")
  })

    it('Should find a customer', async ()=> {
      const { customer } = makeCustomer("123", "John", "Street 1", 12, "12662459", "New York")
        const customerRepository = new CustomerRepository();
 
        await customerRepository.create(customer);

        const output = await customerRepository.find("123")

        const data = {
            id: output.id,
            name: output.name,
            street: output.Address.street,
            number: output.Address.number,
            zipcode: output.Address.zip,
            city: output.Address.city,
            active: output.isActive(),
            rewardPoints: output.rewardPoints
        }
        expect(data).toEqual({
            id: "123",
            name: "John",
            street: "Street 1",
            number: 12,
            zipcode: "12662459",
            city: "New York",
            active: false,
            rewardPoints: 0
        })
    })

    it('Should throw an exception if the user does not exist', async ()=> {
        const customerRepository = new CustomerRepository();

        expect(() => {
          return customerRepository.find("123")
        }).rejects.toThrow("Customer not found");

    })

    it('Should find all customer', async ()=> {
        const { customer: customer1 } = makeCustomer("123", "John 1", "Street 1", 12, "200000", "New York")
        const { customer: customer2 } = makeCustomer("1234", "John 2", "Street 2", 22, "300000", "Miami")
        const customerRepository = new CustomerRepository();

        await customerRepository.create(customer1);
        await customerRepository.create(customer2);

        const customers = await customerRepository.findAll()

        expect(customers).toHaveLength(2)
        expect(customers[0].id).toBe("123")
        expect(customers[0].name).toBe("John 1")
        expect(customers[0].Address.street).toBe("Street 1")
        expect(customers[0].Address.number).toBe(12)
        expect(customers[0].Address.zip).toBe("200000")
        expect(customers[0].Address.city).toBe("New York")
        expect(customers[0].isActive()).toBeFalsy()
        expect(customers[0].rewardPoints).toBe(0)

        expect(customers[1].id).toBe("1234")
        expect(customers[1].name).toBe("John 2")
        expect(customers[1].Address.street).toBe("Street 2")
        expect(customers[1].Address.number).toBe(22)
        expect(customers[1].Address.zip).toBe("300000")
        expect(customers[1].Address.city).toBe("Miami")
        expect(customers[1].isActive()).toBeFalsy()
        expect(customers[1].rewardPoints).toBe(0)

    })
})