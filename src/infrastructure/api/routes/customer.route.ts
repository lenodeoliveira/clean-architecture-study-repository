import express, { Request, Response } from "express";
import CreateCustomerUseCase from "../../../usecase/customer/create/create.customer.usecase";
import CustomerRepository from "../../customer/repository/sequelize/customer.repository";
import NotificationError from "../../../domain/@shared/notification/notification.error";

export const customerRoute = express.Router();

customerRoute.post("/", async (req: Request, res: Response) => {
  const usecase = new CreateCustomerUseCase(new CustomerRepository());
  try {
    const customerDto = {
      name: req?.body?.name,
      address: {
        street: req?.body?.address?.street,
        city: req?.body?.address?.city,
        number: req?.body?.address?.number,
        zip: req?.body?.address?.zip,
      },
    };
    const output = await usecase.execute(customerDto);
    res.send(output);
  } catch (err) {
    if(err instanceof NotificationError) {
      res.status(400).send(err)
    } else {
      res.status(500).send(err);
    }
  }
});