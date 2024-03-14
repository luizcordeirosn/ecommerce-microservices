import { prismaClient } from "../../../database/prismaClient";
import { kafkaConsumer } from "../kafka.consumer";

type CustomerConsumer = {
  customerId: string;
  status: string;
};

export async function notificationUserConsumer() {
  console.log("ORDER STATUS");
  const consumer = await kafkaConsumer("order_status", "customer_app");
  await consumer.run({
    eachMessage: async ({ message }) => {
      const messageToString = message.value!.toString();
      const stautsConsumer = JSON.parse(messageToString) as CustomerConsumer;

      console.log(`ATUALIZAÇÂO DE STATUS - CLIENT ${stautsConsumer.customerId} - STATUS
         ${stautsConsumer.status}`);
    },
  });
}

notificationUserConsumer();
