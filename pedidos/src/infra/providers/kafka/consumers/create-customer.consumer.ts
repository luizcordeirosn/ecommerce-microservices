import { prismaClient } from "../../../database/prismaClient";
import { kafkaConsumer } from "../kafka.consumer"

type CustomerConsumer = {
    id: string;
    email: string;
}

export async function createCustomerConsumer() {
    console.log("CUSTOMER CONSUMER");
    const consumer = await kafkaConsumer("customer_created", "order_customer_app");
    await consumer.run({
        eachMessage: async ({message}) => {
            const messageToString = message.value!.toString();
            const consumer = JSON.parse(messageToString) as CustomerConsumer;

            await prismaClient.customer.create({
                data:{
                    externalId: consumer.id,
                    email: consumer.email,
                }
            })
        }
    })
}

createCustomerConsumer();