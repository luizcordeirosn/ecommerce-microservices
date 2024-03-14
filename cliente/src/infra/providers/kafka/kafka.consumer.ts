import { kafka } from ".";

export const kafkaConsumer = async (topic: string, groupId: string) => {
  const consumer = kafka.consumer({
    groupId,
  });
  await consumer.connect();

  await consumer.subscribe({topic, fromBeginning: true});

  return consumer;
};
