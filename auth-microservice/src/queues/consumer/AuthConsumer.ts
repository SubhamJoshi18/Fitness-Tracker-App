import amqp from 'amqplib';
import { queueConfig } from '../../constants/queueConstant';
import { processMessage } from '../handlers/AuthHandler';

export const authConsumer = async () => {
  let connection: amqp.Connection | null = null;
  let channel: amqp.Channel | null = null;

  const closeConnection = async () => {
    if (channel) await channel.close();
    if (connection) await connection.close();
    console.log('RabbitMQ connection closed.');
  };

  try {
    connection = await amqp.connect('amqp://localhost');
    channel = await connection.createChannel();

    await channel.assertExchange(queueConfig.queueExchange, 'direct', {
      durable: true,
    });
    await channel.assertQueue(queueConfig.queueName, { durable: true });
    await channel.bindQueue(
      queueConfig.queueName,
      queueConfig.queueExchange,
      queueConfig.queueRk
    );

    console.log(`Waiting for messages in queue: ${queueConfig.queueName}`);

    await channel.consume(
      queueConfig.queueName,
      async (message) => {
        if (message) {
          try {
            const messageContent = message.content.toString();
            console.log(`Received message: ${messageContent}`);

            await processMessage(messageContent);

            channel!.ack(message);
          } catch (error) {
            console.error('Error processing message:', error);
            channel!.nack(message, false, true);
          }
        }
      },
      { noAck: false }
    );

    process.on('SIGINT', closeConnection);
    process.on('SIGTERM', closeConnection);
  } catch (err) {
    console.error('Failed to set up consumer:', err);
    await closeConnection();
  }
};

authConsumer();
