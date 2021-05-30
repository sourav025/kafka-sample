# kafka-example

This is a sample project demonstrate the usage of partitions and consumer groups.


## How to run this:
This project requires a docker network so that all the container runs in that network and discover each other. 


### Step to get Kafka and Zookeeper running

#### Requirements

- Docker should be installed
- Your favorite code editor

#### Get Kafka and Zookeeper running

Go to `kafka-example` and execute below commands

```
docker-compose up -d
```

If previous command failed, execute below commands to create a network
```
docker network create my-bridge0
```

### How to create `Topic`
To create the topic execute below command
```
docker run -t --rm -v "$PWD":'/app' --network my-bridge0 node /bin/sh -c 'cd /app; node topic.js'
```

### How to create `Producer`
To create the topic execute below command
```
docker run -t --rm -v "$PWD":'/app' --network my-bridge0  node /bin/sh -c 'cd /app; node producer.js'
```


### How to create `Consumer`
Check `topic.js` file look for `numPartitions`. At least number of consumer should be equal to the number of partitions.

To create the start consumer use below command
```
docker run -t --rm -v "$PWD":'/app' --network my-bridge0  node /bin/sh -c 'cd /app; node consumer.js'
```
