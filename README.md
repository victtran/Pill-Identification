# Pill-Identification

This Folder consists all source code and datasets utilized (excluding data-preprocessing python script)
Instruction to run the demo (website) are listed below along with information for each zip folder

There are:
-2 folders for datasets: Result (2089 labels + images) and Pill_Dataset_FRONTEND (10 labels + images)

-4 folders with name of the proposed models (EfficientNet, Inception, MobileNet, ResNet). These model are trained using the "Result" dataset

-Pill_identifier-main : The main website

!!!!!!!!!!!!!! TO RUN THE WEBSITE/DEMO !!!!!!!!!!!!!!!!!!!!!!

REQUIRED: Please have an up-to-date version of NODE.js installed on your desktop (https://nodejs.org/en/download/)
RECOMMENDED: Visual Studio Code, Google Chrome

1. Unzip "Pill_identifier-main" to a location that can be accessed by the terminal. Alternatively open in Visual Studio Code

2. Open the terminal (if using VScode open terminal through VSCODE) and access the folder 

3. Change directory into the "frontend" folder by typing "cd frontend" in the terminal. The filepath in the terminal should end in "frontend"

4. type "npm install" in the terminal to install all required packages for the project

5. type "npm start" to start the website

6. Insert an image of a pill (most preferably an image from the Pill_Dataset_FRONTEND file) 

7. Hit Identify! 

8. View Result

9. To stop the website; simply CTRL+C in the terminal 
