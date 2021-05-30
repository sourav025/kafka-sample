const {Kafka} = require('kafkajs');

async function run_consumer(){
    try{
        const kafka = new Kafka({
            "clientId": "srv-consumer",
            "brokers": ["kafka-1:19092","kafka-2:29092","kafka-3:39092"]
        });
        const consumer = kafka.consumer({
            "groupId": "first-test"
        });
        console.log('Connecting to kafka as consumer');
        await consumer.connect();
        console.log('app-consumer is connected');
        
        consumer.subscribe({
            "topic": "users",
            "fromBeginning": true
        });

        await consumer.run({
            "eachMessage": async result => {
                console.log(`Received message "${result.message.value}" on partition "${result.partition}"`);
            }
        });

    }catch(ex){
        console.log(`Error happended ${ex}`);
    }

}

run_consumer();
