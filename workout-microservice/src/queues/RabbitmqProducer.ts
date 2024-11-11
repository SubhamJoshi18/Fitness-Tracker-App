import { setupChannel } from '../config/queueConfig';
import amqp from 'amqplib';
import fitnessLogger from '../libs/logger';

class Producer {
  public queueName: string;
  public queueExchange: string;
  public queueRk: string;

  constructor(queueName: string, queueExchange: string, queueRk: string) {
    this.queueName = queueName;
    this.queueExchange = queueExchange;
    this.queueRk = queueRk;
  }

  async getChannel() {
    return await setupChannel(this.queueName, this.queueExchange, this.queueRk);
  }

  async sendToQueue(messageContent: any) {
    const {
      channel,
      connection,
    }: { channel: amqp.Channel; connection: amqp.Connection } =
      await this.getChannel();
    try {
      channel.publish(
        this.queueExchange,
        this.queueRk,
        Buffer.from(JSON.stringify(messageContent))
      );

      fitnessLogger.info(`Message send to the ${this.queueName}`);

      await channel.close();
      await connection.close();
      return;
    } catch (err) {
      if (err && connection) {
        console.log('Queue Error', err);
        await channel.close();
        await connection.close();
      }
    }
  }
}

export default Producer;
