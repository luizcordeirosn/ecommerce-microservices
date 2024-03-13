import { Kafka, logLevel } from "kafkajs";

const kafka = new Kafka({
    brokers: ['ultimate-bedbug-9334-us1-kafka.upstash.io:9092'],
    ssl: true,
    sasl: {
        mechanism: 'scram-sha-256',
        username: 'dWx0aW1hdGUtYmVkYnVnLTkzMzQkQmThE2MdPuKZbMcBPIQVfiNxmakfUN7brNE',
        password: 'OTZlODY0MDctZmVhYy00MWJhLTk2ZWEtODlmNTM0MTA2YzVk'
    },
    logLevel: logLevel.ERROR,
  });

  export { kafka }