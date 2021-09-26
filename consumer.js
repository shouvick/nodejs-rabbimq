const amqplib  = require("amqplib");


async function connection() {
    const connection = await amqplib.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    const job = await channel.assertQueue("newJob");
    channel.consume("newJob", message => {
        const recieve = message.content.toString();
        console.log(recieve);
        channel.ack(message);
        
    })
}

connection();