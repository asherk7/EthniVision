# EthniVision
* EthniVision is a website created using React and Express that takes in an image of the user and returns their predicted ethnicity, age, and gender.  
* It utilizes a machine learning model created using the FairFace dataset.  
* Created using Docker, Tensorflow, Keras, pandas, Numpy, React, Express, Node.js, and MongoDB.

# Prerequisites  
* This project was built and ran entirely using docker, so to use this project you will need to have docker installed on your machine.  
* Docker provides a self-contained environment, ensuring that all the necessary dependencies, libraries, and configurations are encapsulated within the Docker containers.

# Installing
You can find the installation instructions for docker [here](https://docs.docker.com/get-docker/).  
Verify the installation by running the following command in your terminal:  
```
docker --version
``` 
Install the project by cloning the repository:  
```
git clone git@github.com:asherk7/EthniVision.git
```

# Running the program
Make sure you have docker installed and running.  
In the root directory of the project, run the following command:  
```
docker-compose up --build
```
This will build the docker images and run the containers.  
The website will be available at http://localhost:3000/  
To stop the program, run the following command:  
```
docker-compose down
```
To remove the docker images, run the following command:  
```
docker rmi <image_name>
```

# Machine Learning Process
* The neural network was created using Tensorflow and Keras.
* The dataset contained over 100,000 images, which was split into a train, val, and test set.
* the entire machine learning process is documented and can be found in the [machine_learning](https://github.com/asherk7/EthniVision/blob/main/ml/ethnivision_model_building.ipynb) notebook.
* The model utilized multiclass-multioutput classification by predicting between 9 age categories, 2 gender categories, and 6 ethnicity categories.
* The model achieved 56% accuracy for age, 87% accuracy for gender, and 72% accuracy for ethnicity on the test set.
* The model was then saved and incorporated into the backend, where it is used to make predictions on the user's image sent from the frontend.

# References  
* The dataset I used was the FairFace face image dataset. It contains 108,501 race-balanced images from 7 different race groups: White, Black, Indian, East Asian, Southeast Asian, Middle Eastern, and Latino.  
* The data was sourced from the [FairFace Github Repository](https://github.com/dchen236/FairFace)  

# Citation
Karkkainen, Kimmo and Joo, Jungseock. (2021). FairFace: Face Attribute Dataset for Balanced Race, Gender, and Age for Bias Measurement and Mitigation. Proceedings of the IEEE/CVF Winter Conference on Applications of Computer Vision. 1548-1558. 10.1109/WACV48630.2021.00159