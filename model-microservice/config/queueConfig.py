import pika
import pika.channel
import pika.connection
import pika.exceptions
from pika.exchange_type import ExchangeType




def setup_channel(queue_name:str, queue_exchange:str,queue_rk:str):

    try:

        connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
        channel = connection.channel()

        channel.exchange_declare(exchange=queue_exchange,exchange_type=ExchangeType.direct,durable=True)

        channel.queue_declare(queue=queue_name,durable=True)

        channel.queue_bind(queue=queue_name,exchange=queue_exchange,routing_key=queue_rk)

        return channel , connection
    
    except (pika.exceptions.AMQPError, Exception) as amqp_error:
        print(f'Error Occur in Amqp : {amqp_error}')