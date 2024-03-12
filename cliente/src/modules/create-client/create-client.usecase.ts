import { prismaClient } from "../../infra/database/PrismaClient";

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

    return await prismaClient.client.create({
      data: {
        ...data,
      },
    });
  }
}
