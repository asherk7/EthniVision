FROM tensorflow/serving:latest-gpu

WORKDIR /usr/src/models

COPY ./models /usr/src/models/

RUN set -xe && apt-get -yqq update && apt-get -yqq install python3-pip && pip3 install --upgrade pip

COPY requirements.txt /tmp/requirements.txt

RUN python3 -m pip install -r /tmp/requirements.txt

EXPOSE 5000

CMD ["tensorflow_model_server", "--port=5000", "--model_name=ML_model", "--model_base_path=/usr/src/models"]
