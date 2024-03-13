import { kafkaConsumer } from "../kafka.consumer"

export async function createCostumerConsumer() {
    console.log("COSTUMER CONSUMER");
    const consumer = await kafkaConsumer("customer_created");
    await consumer.run({
        eachMessage: async ({message}) => {
            const messageToString = message.value?.toString();
            console.log(messageToString);
        }
    })
}

createCostumerConsumer();