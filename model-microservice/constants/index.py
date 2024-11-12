import os
from dotenv import find_dotenv,load_dotenv

load_dotenv(find_dotenv())



rabbit_mq_localhost = os.getenv('RABBITMQ_LOCALHOST')
