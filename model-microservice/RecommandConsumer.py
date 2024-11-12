from constants.queueConstant import recommend_model_queue
from queues.RabbitMqConsumer import RabbitMqConsumer


def recommend_consumer():

    queue_name = recommend_model_queue['queue_name']
    queue_exchange = recommend_model_queue['queue_exchange']
    queue_rk = recommend_model_queue['queue_rk']

    recommend_queue_consumer = RabbitMqConsumer(queue_name=queue_name,queue_exchange=queue_exchange,queue_rk=queue_rk)
    recommend_queue_consumer.consume_message()

recommend_consumer()


