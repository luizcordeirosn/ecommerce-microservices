import { Request, Response } from "express";
import { UpdateOrderUseCase } from "./update-order.usecase";

export class UpdateOrderController {
  constructor() {}

  async handle(request: Request, response: Response) {
    const useCase = new UpdateOrderUseCase();
    try {
      const result = await useCase.execute(request.body);

      return response.json(result);
    } catch (error) {
      return response.status(400).json(error);
    }
  }
}
