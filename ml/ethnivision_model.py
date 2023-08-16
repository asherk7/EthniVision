import numpy as np
import pandas as pd
import tensorflow as tf
from keras.preprocessing.image import ImageDataGenerator
from tensorflow.python.keras.layers import Dense, Flatten, Conv2D, MaxPooling2D
from tensorflow.python.keras.models import Sequential
from tensorflow.python.keras.optimizers import Adam

csv_file_path = "C:\Users\mashe\Downloads\\fairface-img-margin125-trainval\\fairface_label_train.csv"
data_df = pd.read_csv(csv_file_path)
image_dir = "C:\Users\mashe\Downloads\\fairface-img-margin125-trainval\\train"  # Directory containing the images

# update readme with image of website making predictions, and the model accuracy
# create the model, experiment, visualize, do all ML steps
# add validation data to fitting the model with validation generator and val folder

# ethnivision_model.py - trains the ethnicity model and saves model
# final model from the jupyter notebook, save code here for the model
# use name==main, and import model, and use it to predict the testing images
# model should already be trained and saved, so this file will not need to be used

# use model in backend for actual functionality
# Make the ML aspect perfect, use chatgpt to ensure model and code format is perfect
# research models/loss functions/optimizers, etc, make model very big and look complicated
# create graphs and functions and visualizations throughout the process and document it

# Creating an ImageDataGenerator for data augmentation and loading images
batch_size = 32
image_size = (128, 128)

train_datagen = ImageDataGenerator(
    rescale=1./255,
    shear_range=0.2,
    zoom_range=0.2,
    horizontal_flip=True
)

train_generator = train_datagen.flow_from_dataframe(
    data_df,
    directory=image_dir,
    x_col='file',
    y_col='race',
    target_size=image_size,
    batch_size=batch_size,
    class_mode='categorical',  # For multi-class classification
    shuffle=True
)

# Building the model
num_classes = len(data_df['race'].unique())
model = Sequential()
model.add(Conv2D(32, (3, 3), activation='relu', input_shape=(image_size[0], image_size[1], 3)))
model.add(MaxPooling2D(pool_size=(2, 2)))
model.add(Conv2D(64, (3, 3), activation='relu'))
model.add(MaxPooling2D(pool_size=(2, 2)))
model.add(Flatten())
model.add(Dense(128, activation='relu'))
model.add(Dense(num_classes, activation='softmax'))  # num_classes is the number of ethnicities

# Compiling the model
learning_rate = 0.001
model.compile(optimizer=Adam(learning_rate=learning_rate),
              loss='categorical_crossentropy',
              metrics=['accuracy'])

# Training the model
epochs = 10  # Adjust this based on the size of dataset and how long it takes to train
history = model.fit(train_generator,
                    epochs=epochs,
                    verbose=1)

# Evaluate the model on a separate test dataset to get its performance metrics

model.save('models/')

# Make predictions on new images (inference) using the trained model
# Load the model using `tf.keras.models.load_model` and pass new images through it to get predictions
# Get these images from MongoDB database in the express backend

# Step 10: Deploy the model to the website and fine-tune it
