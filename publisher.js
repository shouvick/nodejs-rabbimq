const ampqlib = require('amqplib');

const message = process.argv[2];

async function connection () {

    try {

        const connection = await ampqlib.connect("amqp://localhost:5672");
        const channel = await connection.createChannel();
        const job = await channel.assertQueue("newJob");
        channel.sendToQueue("newJob",Buffer.from(JSON.stringify(message)));
        console.log(`job created successfully ${message}`);
    }   
    catch (err) {
        console.error(err);
    }
}

connection();

