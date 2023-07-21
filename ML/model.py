import numpy as np
import pandas as pd
import tensorflow as tf
from keras.preprocessing.image import ImageDataGenerator
from tensorflow.python.keras.layers import Dense, Flatten, Conv2D, MaxPooling2D
from tensorflow.python.keras.models import Sequential
from tensorflow.python.keras.optimizers import Adam

# Step 1: Load the CSV file containing image filenames and ethnicities
csv_file_path = "C:\Users\mashe\Downloads\\fairface-img-margin125-trainval\\fairface_label_train.csv"
data_df = pd.read_csv(csv_file_path)
image_dir = "C:\Users\mashe\Downloads\\fairface-img-margin125-trainval\\train"  # Directory containing the images

# Step 2: Preprocess the data
# Convert ethnicities to numerical labels (e.g., 0 for Asian, 1 for Caucasian, etc.)
# Split the data into training and testing sets (80-20 or as desired)

# Step 3: Create an ImageDataGenerator for data augmentation and loading images
batch_size = 32
image_size = (128, 128) # Image dimensions

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

# Step 4: Build the model
num_classes = len(data_df['race'].unique())
model = Sequential()
model.add(Conv2D(32, (3, 3), activation='relu', input_shape=(image_size[0], image_size[1], 3)))
model.add(MaxPooling2D(pool_size=(2, 2)))
model.add(Conv2D(64, (3, 3), activation='relu'))
model.add(MaxPooling2D(pool_size=(2, 2)))
model.add(Flatten())
model.add(Dense(128, activation='relu'))
model.add(Dense(num_classes, activation='softmax'))  # num_classes is the number of ethnicities

# Step 5: Compile the model
learning_rate = 0.001
model.compile(optimizer=Adam(learning_rate=learning_rate),
              loss='categorical_crossentropy',
              metrics=['accuracy'])

# Step 6: Train the model
epochs = 10  # Adjust this based on the size of dataset and how long it takes to train
history = model.fit(train_generator,
                    epochs=epochs,
                    verbose=1)

# Step 7: Evaluate the model
# Evaluate the model on a separate test dataset to get its performance metrics

# Step 8: Save the model for future use
model.save('face_ethnicity_model.h5')

# Step 9: Make predictions on new images (inference) using the trained model
# Load the model using `tf.keras.models.load_model` and pass new images through it to get predictions
# Get these images from MongoDB database in the express backend

# Step 10: Deploy the model to the website and fine-tune it
