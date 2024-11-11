import amqp from 'amqplib';
import fitnessLogger from '../libs/logger';

export const setupChannel = async (
  queueName: string,
  queueExchange: string,
  queueRk: string
) => {
  let retryCount = 4;

  let connection: amqp.Connection | null = null;
  let channel: amqp.Channel | null = null;
  try {
    connection = await amqp.connect('localhost');

    channel = await connection.createChannel();

    await channel.assertExchange(queueExchange, 'direct', { durable: true });

    await channel.assertQueue(queueName, { durable: true });

    await channel.bindQueue(queueName, queueExchange, queueRk);

    return {
      channel,
      connection,
    };
  } catch (err) {
    fitnessLogger.error(
      `Error creating an channel for ${queueName}, Retrying Again : ${retryCount}`
    );
    while (retryCount > 0) {
      fitnessLogger.info(`Retrying at count : ${retryCount}`);
      setupChannel(queueName, queueExchange, queueRk);
      retryCount = retryCount - 1;
    }

    if (retryCount.toString().startsWith('0')) {
      fitnessLogger.info(`Retrying count is finished`);
      process.exit(1);
    }
  }
};
