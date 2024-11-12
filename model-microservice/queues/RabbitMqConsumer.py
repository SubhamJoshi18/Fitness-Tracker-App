import json
import logging

from config.queueConfig import setup_channel

class RabbitMqConsumer:
    def __init__(self, queue_name, queue_exchange, queue_rk):
        self.queue_name = queue_name
        self.queue_exchange = queue_exchange
        self.queue_rk = queue_rk
        self.channel = None
        self.connection = None
        self.create_queue_connect_consumer()

    def create_queue_connect_consumer(self):
        result = setup_channel(
            queue_name=self.queue_name,
            queue_exchange=self.queue_exchange,
            queue_rk=self.queue_rk
        )

        if result is None:
            print(f'Error creating an consumer in the RabbitMQ')

        channel , connection = result
        self.channel = channel
        self.connection = connection

    def consume_message(self):
    
        if self.channel is None:
            raise Exception("Channel is not initialized. Ensure the connection is established.")

        def on_message(ch, method, properties, body):
            try:
            
                message = json.loads(body.decode('utf-8'))
                print(f"Received message: {message}")
                
        
                ch.basic_ack(delivery_tag=method.delivery_tag)
            except Exception as e:
                logging.error(f"Error processing message: {e}")
              
                ch.basic_nack(delivery_tag=method.delivery_tag, requeue=True)


        self.channel.basic_consume(
            queue=self.queue_name,
            on_message_callback=on_message,
            auto_ack=False  
        )
        print(f"Started consuming messages from {self.queue_name}")
        self.channel.start_consuming()

    def stop_consuming(self):

        if self.channel:
            self.channel.stop_consuming()
        if self.connection:
            self.connection.close()
        logging.info("Stopped consuming and closed the connection.")
