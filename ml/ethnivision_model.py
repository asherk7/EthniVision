import numpy as np
import pandas as pd
import tensorflow as tf
import matplotlib.pyplot as plt
from keras.preprocessing.image import ImageDataGenerator
from tensorflow.python.keras.layers import Dense, Flatten, Conv2D, MaxPooling2D, Dropout, BatchNormalization
from tensorflow.python.keras.models import Sequential, Model
from tensorflow.python.keras.optimizers import Adam
from tensorflow.python.keras.callbacks import ModelCheckpoint

# loading preprocessed data
data_dir = "C:\\Users\\mashe\\Downloads\\cropped_images"
train_csv = "C:\\Users\\mashe\\Downloads\\csv\\train.csv"
val_csv = "C:\\Users\\mashe\\Downloads\\csv\\val.csv"
test_csv = "C:\\Users\\mashe\\Downloads\\csv\\test.csv"

train_df = pd.read_csv(train_csv)
val_df = pd.read_csv(val_csv)
test_df = pd.read_csv(test_csv)

batch_size=32
img_size=(128, 128)
input_shape = (128, 128, 3)

# Creating data generators for data preprocessing and augmentation
train_datagen = ImageDataGenerator(
    rescale=1./255,
    shear_range=0.2,
    zoom_range=0.2,
    horizontal_flip=True,
    rotation_range=20,
    width_shift_range=0.2,
    height_shift_range=0.2,
    fill_mode='nearest'
)

val_datagen = ImageDataGenerator(rescale=1./255)

train_generator = train_datagen.flow_from_dataframe(
    dataframe=train_df,
    directory=data_dir, 
    x_col='file',
    y_col=['age', 'gender', 'race'],
    target_size=img_size,
    batch_size=batch_size,
    class_mode='multi_output',
)

val_generator = val_datagen.flow_from_dataframe(
    dataframe=val_df,
    directory=data_dir,
    x_col='file',
    y_col=['age', 'gender', 'race'],
    target_size=img_size,
    batch_size=batch_size,
    class_mode='multi_output',
)

# Creating our new model
tf.random.set_seed(42)

model = Sequential()

model.add(Conv2D(32, (3, 3), activation='relu', input_shape=input_shape))
model.add(BatchNormalization(axis=-1))
model.add(MaxPooling2D((2, 2)))
model.add(Dropout(0.2))

model.add(Conv2D(64, (3, 3), activation='relu'))
model.add(BatchNormalization(axis=-1))
model.add(MaxPooling2D((2, 2)))
model.add(Dropout(0.2))

model.add(Conv2D(128, (3, 3), activation='relu'))
model.add(BatchNormalization(axis=-1))
model.add(MaxPooling2D((2, 2)))
model.add(Dropout(0.2))

# Building seperate branches for each output

age_output = Flatten()(model.layers[-1].output)
age_output = Dense(256, activation='relu')(age_output)
age_output = BatchNormalization()(age_output)
age_output = Dropout(0.5)(age_output)
age_output = Dense(9, activation='softmax', name='age')(age_output)

gender_output = Flatten()(model.layers[-1].output)
gender_output = Dense(256, activation='relu')(gender_output)
gender_output = BatchNormalization()(gender_output)
gender_output = Dropout(0.5)(gender_output)
gender_output = Dense(2, activation='sigmoid', name='gender')(gender_output)

race_output = Flatten()(model.layers[-1].output)
race_output = Dense(256, activation='relu')(race_output)
race_output = BatchNormalization()(race_output)
race_output = Dropout(0.5)(race_output)
race_output = Dense(7, activation='softmax', name='race')(race_output)

ethnivision_model = Model(inputs=model.input, outputs=[age_output, gender_output, race_output], name='ethnivision')

losses = {
    'age': 'sparse_categorical_crossentropy',
    'gender': 'sparse_categorical_crossentropy',
    'race': 'sparse_categorical_crossentropy'
}

learning_rate = 1e-5
epochs = 100

ethnivision_model.compile(
    loss=losses,
    optimizer=Adam(learning_rate=learning_rate),
    metrics=['accuracy']
)

callbacks = [
    ModelCheckpoint("/model_checkpoint", monitor='val_loss', save_best_only=True)
]

history = ethnivision_model.fit(
    train_generator,
    validation_data=val_generator,
    epochs=epochs,
    callbacks=callbacks
)
