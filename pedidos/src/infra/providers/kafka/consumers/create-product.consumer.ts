import { prismaClient } from "../../../database/prismaClient";
import { kafkaConsumer } from "../kafka.consumer"

type ProductConsumer = {
    id: string;
    code: string;
}

export async function createProductConsumer() {
    console.log("PRODUCT CONSUMER");
    const consumer = await kafkaConsumer("product_created", "order_product_app");
    await consumer.run({
        eachMessage: async ({message}) => {
            const messageToString = message.value!.toString();
            const consumer = JSON.parse(messageToString) as ProductConsumer;

            await prismaClient.product.create({
                data:{
                    externalId: consumer.id,
                    code: consumer.code,
                }
            })
        }
    })
}

createProductConsumer();