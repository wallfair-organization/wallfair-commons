const amqplib = require('amqplib');

const rabbitUrl = process.env.RABBITMQ_CONNECTION;

let channel;

const initAmqp = async () => {
  const connection = await amqplib.connect(rabbitUrl, {
    heartbeat: 60,
    noDelay: true,
  });
  channel = await connection.createChannel();
};

const sendMessage = async (exchange, routingKey, data) => {
  try {
    await channel.assertExchange(exchange, 'topic', { durable: true });
    channel.publish(exchange, routingKey, Buffer.from(data));
    console.log('PUBLISH %s - %s', exchange, routingKey);
  } catch (e) {
    console.error('Error in publishing message', e);
  }
};

module.exports = {
  initAmqp,
  sendMessage,
};
