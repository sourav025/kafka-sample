const { Kafka } = require("kafkajs");
require("dotenv").config();

function randomCharacter() {
  let dig = 65 + Math.floor(Math.random() * 26);
  return String.fromCharCode(dig);
}

const msg =
  process.argv[2] || `${randomCharacter()} Any string string with a word `;
// console.log(`This the message I am sending now!! ${msg}`);

function selectPartition() {
  //   console.log(":: Choosing random partition");
  return Math.floor(Math.random() * JSON.parse(process.env.BROKERS).length);
}

async function run_producer() {
  try {
    const kafka = new Kafka({
      clientId: process.env.CLIENT_ID,
      brokers: JSON.parse(process.env.BROKERS),
    });
    const producer = kafka.producer();
    // console.log("Connecting to kafka as producer");
    await producer.connect();
    // console.log("app-producer is connected connected");

    // Choose partition based on message via process arguments
    // const partition =
    //   msg[0] < "G" ? 0 : msg[0] < "N" ? 1 : msg[0] < "T" ? 2 : 3;

    // Choose partition by randomly from the total brokers / partitions
    const partition = selectPartition();

    // console.log(`Current partition = ${partition}`);
    const result = await producer.send({
      topic: process.env.TOPIC,
      messages: [
        {
          value: msg,
          partition,
        },
      ],
    });
    console.log(`Send Successfully!! ${JSON.stringify(result)}`);
    await producer.disconnect();
  } catch (ex) {
    console.log(`Error happended ${ex}`);
  } finally {
    process.exit(0);
  }
}

run_producer();
