import CreateCustomerUseCase from "./create.customer.usecase"

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

let input = {
    name: "Lennon",
     address: {
       street: "Bear Meade Dr",
       city: "New York",
       number: 120,
       zip: "9999999100"
	}  
}



describe('Create customer usecase', () => {
    it('Should create a customer', async ()=> {
        const mockRepository = MockRepository()
        const usecase = new CreateCustomerUseCase(mockRepository)
        const output = await usecase.execute(input)

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            address: {
                street: input.address.street,
                city: input.address.city,
                number: input.address.number,
                zip: input.address.zip
            }
        })

    })

    it('Should thrown an error when name is missing', async () => {
        const mockRepository = MockRepository()
        const usecase = new CreateCustomerUseCase(mockRepository)
        
        input.name = "";

        await expect(usecase.execute(input)).rejects.toThrow(
          "Name is required"
        );
    })

    it("should thrown an error when street is missing", async () => {
        const customerRepository = MockRepository();
        const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);
    
        input.address.street = "";
    
        await expect(customerCreateUseCase.execute(input)).rejects.toThrow(
          "Street is required"
        );
      });

      it("should thrown an error when number is missing", async () => {
        const customerRepository = MockRepository();
        const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);
    
        input.address.street = "Street"
        input.address.number = 0;
    
        await expect(customerCreateUseCase.execute(input)).rejects.toThrow(
          "Number is required"
        );
      });

      it("should thrown an error when zip code is missing", async () => {
        const customerRepository = MockRepository();
        const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);
    
        input.address.street = "Street"
        input.address.number = 150;
        input.address.zip = "";
    
        await expect(customerCreateUseCase.execute(input)).rejects.toThrow(
          "Zip is required"
        );
    });

    it("should thrown an error when zip code is missing", async () => {
        const customerRepository = MockRepository();
        const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);
    
        input.address.street = "Street"
        input.address.number = 150;
        input.address.zip = "000000000";
        input.address.city = "";
    
        await expect(customerCreateUseCase.execute(input)).rejects.toThrow(
          "City is required"
        );
    });
})