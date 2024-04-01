const {Kafka} = require('kafkajs');
require('dotenv').config();

const topic = process.env.TOPIC;
const numPartitions = 3; // Number of consumer should be equal to this number
const replicationFactor = 2;

// Random String to select partitions
// function random() {
//     shuf -er -n8  {A..Z} {a..z} {0..9} | paste -sd "2"
// }
// 

async function run(){
    try{
        console.log(process.env.CLIENT_ID);
        const kafka = new Kafka({
            "clientId": process.env.CLIENT_ID,
            "brokers": JSON.parse(process.env.BROKERS)
        });
        const admin = kafka.admin();
        console.log('Connecting to kafka');
        await admin.connect();
        console.log('Admin is connected');
        // await admin.deleteTopics({
        //     "topics": ["users"]
        // });
        await admin.createTopics({
            topics: [
                { topic, numPartitions, replicationFactor }
            ]
        });
        console.log(`Topic "${topic}" with partitions="${numPartitions}" has been created successfully`);
    }catch(ex){
        console.log(`Error occurred ${ex}`);
    } finally {
        process.exit(0);
    }

}

run();
