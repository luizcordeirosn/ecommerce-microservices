import { prismaClient } from "../../infra/database/prismaClient";
import { KafkaSendMessage } from "../../infra/providers/kafka/producer";

type CreateClientRequest = {
  name: string;
  password: string;
  email: string;
  phone: string;
};

export class CreateClientUseCase {
  constructor() {}

  async execute(data: CreateClientRequest) {
    const costumer = await prismaClient.client.findFirst({
      where: {
        email: data.email,
      },
    });

    if (costumer) {
      throw new Error("Costumer already exists!");
    }

    const customerCreated = await prismaClient.client.create({
      data: {
        ...data,
      },
    });

    const kafkaProducer = new KafkaSendMessage();
    await kafkaProducer.execute("customer_created", {
      id: customerCreated.id,
      email: customerCreated.email,
    });

    return customerCreated;
  }
}
