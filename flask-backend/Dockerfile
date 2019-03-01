
# Pull base image.
FROM python:3.6

RUN git clone https://github.com/codingmak/discovery_app_final 

COPY requirements.txt /tmp

WORKDIR /tmp

# Install dependencies
RUN pip install -r requirements.txt



# Expose port to Host
EXPOSE 5000

COPY parser.py /tmp

WORKDIR /tmp

# Define default command.
ENTRYPOINT ["python3", "parser.py"]
