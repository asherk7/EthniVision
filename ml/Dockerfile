FROM tensorflow/serving:latest-gpu

WORKDIR /usr/src/models

COPY ./models /usr/src/models/

RUN pip install -r requirements.txt

EXPOSE 5000

CMD ["tensorflow_model_server", "--port=5000", "--model_name=ML_model", "--model_base_path=/usr/src/models"]
