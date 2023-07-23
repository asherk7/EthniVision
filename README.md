# EthniVision
* EthniVision is a website created using React and Express that takes in an image of the user and returns their predicted ethnicity.  
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

# References  
* The dataset I used was the FairFace face image dataset. It contains 108,501 race-balanced images from 7 different race groups: White, Black, Indian, East Asian, Southeast Asian, Middle Eastern, and Latino.  
* The data was sourced from the [FairFace Github Repository](https://github.com/dchen236/FairFace)  

# Citation
```
 @inproceedings{karkkainenfairface,
  title={FairFace: Face Attribute Dataset for Balanced Race, Gender, and Age for Bias Measurement and Mitigation},
  author={Karkkainen, Kimmo and Joo, Jungseock},
  booktitle={Proceedings of the IEEE/CVF Winter Conference on Applications of Computer Vision},
  year={2021},
  pages={1548--1558}
}
```