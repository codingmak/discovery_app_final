
# Pull base image.
FROM python:3.6

RUN git clone https://github.com/codingmak/discovery_app_final /data

WORKDIR /data

# Install dependencies
RUN pip install -r requirements.txt

# Change bind host
RUN sed -i 's/host=config.HOST/host="0.0.0.0"/g' parser.py

# Expose port to Host
EXPOSE 5000

# Define default command.
CMD ["python3", "parser.py"]
