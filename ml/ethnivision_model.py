import numpy as np
import pandas as pd
import tensorflow as tf
import matplotlib.pyplot as plt
from keras.preprocessing.image import ImageDataGenerator
from tensorflow.python.keras.layers import Dense, Conv2D, MaxPooling2D, BatchNormalization, GlobalAveragePooling2D, Input, ReLU, add
from tensorflow.python.keras.models import Model
from tensorflow.python.keras.optimizers import Adam
from tensorflow.python.keras.callbacks import EarlyStopping, ModelCheckpoint

# Turning the training, validation, and testing sets into dataframes
data_dir = "C:\\Users\\mashe\\Downloads\\cropped_images"
train_csv = "C:\\Users\\mashe\\Downloads\\csv\\train.csv"
val_csv = "C:\\Users\\mashe\\Downloads\\csv\\val.csv"
test_csv = "C:\\Users\\mashe\\Downloads\\csv\\test.csv"

train_df = pd.read_csv(train_csv)
val_df = pd.read_csv(val_csv)
test_df = pd.read_csv(test_csv)

batch_size=32
img_size=(224, 224)
input_shape = (224, 224, 3)

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

# we use the general directory, since each dataframe has a relative path to the image from this directory
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

# Creating our model
tf.random.set_seed(42)

inputs = Input(shape=input_shape)

x = Conv2D(64, kernel_size=(7, 7), strides=(2, 2), padding='same', use_bias=False)(inputs)
x = BatchNormalization()(x)
x = ReLU()(x)
x = MaxPooling2D(pool_size=(3, 3), strides=(2, 2), padding='same')(x)

# Residual block 1
for _ in range(4):
    shortcut = x
    
    x = Conv2D(64, kernel_size=(3, 3), strides=(1, 1), padding='same', use_bias=False)(x)
    x = BatchNormalization()(x)
    x = ReLU()(x)
    
    x = Conv2D(64, kernel_size=(3, 3), strides=(1, 1), padding='same', use_bias=False)(x)
    x = BatchNormalization()(x)
    
    x = add([x, shortcut])
    x = ReLU()(x)

# Transition
x = Conv2D(128, kernel_size=(1, 1), strides=(2, 2), use_bias=False)(x)
x = BatchNormalization()(x)

# Residual block 2
for _ in range(4):
    shortcut = x
    
    x = Conv2D(128, kernel_size=(3, 3), strides=(1, 1), padding='same', use_bias=False)(x)
    x = BatchNormalization()(x)
    x = ReLU()(x)
    
    x = Conv2D(128, kernel_size=(3, 3), strides=(1, 1), padding='same', use_bias=False)(x)
    x = BatchNormalization()(x)
    
    x = add([x, shortcut])
    x = ReLU()(x)

# Transition
x = Conv2D(256, kernel_size=(1, 1), strides=(2, 2), use_bias=False)(x)
x = BatchNormalization()(x)

# Residual block 3
for _ in range(6):
    shortcut = x
    
    x = Conv2D(256, kernel_size=(3, 3), strides=(1, 1), padding='same', use_bias=False)(x)
    x = BatchNormalization()(x)
    x = ReLU()(x)
    
    x = Conv2D(256, kernel_size=(3, 3), strides=(1, 1), padding='same', use_bias=False)(x)
    x = BatchNormalization()(x)
    
    x = add([x, shortcut])
    x = ReLU()(x)

# Transition
x = Conv2D(512, kernel_size=(1, 1), strides=(2, 2), use_bias=False)(x)
x = BatchNormalization()(x)

# Residual block 4
for _ in range(2):
    shortcut = x
    
    x = Conv2D(512, kernel_size=(3, 3), strides=(1, 1), padding='same', use_bias=False)(x)
    x = BatchNormalization()(x)
    x = ReLU()(x)
    
    x = Conv2D(512, kernel_size=(3, 3), strides=(1, 1), padding='same', use_bias=False)(x)
    x = BatchNormalization()(x)
    
    x = add([x, shortcut])
    x = ReLU()(x)

x = GlobalAveragePooling2D()(x)

age_output = Dense(9, activation='softmax', name='age')(x)
gender_output = Dense(2, activation='sigmoid', name='gender')(x)
race_output = Dense(6, activation='softmax', name='race')(x)

ethnivision_model = Model(inputs=inputs, outputs=[age_output, gender_output, race_output], name='ethnivision')

losses = {
    'age': 'sparse_categorical_crossentropy',
    'gender': 'sparse_categorical_crossentropy',
    'race': 'sparse_categorical_crossentropy'
}

loss_weights = {
    'age': 2.5,
    'gender': 0.3,
    'race': 4
}

learning_rate = 1e-4
epochs = 100

ethnivision_model.compile(
    loss=losses,
    loss_weights=loss_weights,
    optimizer=Adam(learning_rate=learning_rate),
    metrics=['accuracy']
)

callbacks = [
    EarlyStopping(
    monitor='val_loss', 
    patience=5, 
    restore_best_weights=True),
    ModelCheckpoint(
    filepath='./model_checkpoint',
    save_weights_only=True,
    monitor='val_loss',
    save_best_only=True)
]

history = ethnivision_model.fit(
    train_generator,
    validation_data=val_generator,
    epochs=epochs,
    callbacks=callbacks
)

test_datagen = ImageDataGenerator(rescale=1./255)
test_generator = test_datagen.flow_from_dataframe(
    dataframe=test_df,
    directory=data_dir,
    x_col="file",
    y_col=['age', 'gender', 'race'],
    target_size=img_size,
    batch_size=batch_size,
    class_mode='multi_output',
)

test_loss, age_loss, gender_loss, race_loss, test_accuracy_age, test_accuracy_gender, test_accuracy_race = ethnivision_model.evaluate(test_generator)
print(f"Test accuracy (Age): {test_accuracy_age}")
print(f"Test accuracy (Gender): {test_accuracy_gender}")
print(f"Test accuracy (Race): {test_accuracy_race}")
