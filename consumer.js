const { Kafka } = require("kafkajs");
require("dotenv").config();

async function run_consumer() {
  try {
    const kafka = new Kafka({
      clientId: process.env.CLIENT_ID,
      brokers: JSON.parse(process.env.BROKERS),
    });

    const consumer = kafka.consumer({
      groupId: "first-test",
    });

    await consumer.connect();

    console.log(`app-consumer ${process.env.CLIENT_ID} is connected`);

    consumer.subscribe({
      topic: process.env.TOPIC,
      fromBeginning: false,
    });

    await consumer.run({
      eachMessage: async (result) => {
        console.log(
          `Received message "${result.message.value}" on partition "${result.partition}"`
        );
      },
    });
  } catch (ex) {
    console.log(`Error happended ${ex}`);
  }
}

run_consumer();
