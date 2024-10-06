# About

Welcome to your Geine Workshop Exercise. The purpose of this exercise is to equip participants with practical skills and hands-on experience in building SAP Cloud Application Programming Model (CAP) based applications that leverage Generative AI capabilities from the SAP Generative AI Hub. 

Objectives :
1. CAP-Provided Plugin : Utilized to abstract the complexities of GenAI consumption and employ simplified APIs for LLM inference.
2. Semantic Search Functionality : Explore and implement this functionality powered by SAP HANA Vector Engine.
3. Source of Knowledge Management : Enable administrators to upload documents for chat conversations. These documents will be stored as embeddings using a Partner embedding LLM and HANA Vector Store.
4. Contextual Chat Conversations : Facilitate user interaction by informing LLMs with the context provided by the HANA Vector Store.


It contains these folders and files, following our recommended project layout:

File or Folder | Purpose
---------|----------
`app/` | content for UI frontends goes here
`db/` | your domain models and data go here
`srv/` | your service models and code go here
`package.json` | project metadata and configuration
`readme.md` | this getting started guide

# Architecture 
Architecture
![alt text](https://github.com/vijayrajput/geineExercise/blob/main/image/Architecture.png?raw=true)

# Getting Start

Step 1: Connect to Generative AI Hub

1.1

From the explorer tab on the right, navigate to the file named package.json. Scroll down until you reach the gen-ai-hub property.
![alt text](https://github.com/vijayrajput/geineExercise/blob/main/image/1.webp?raw=true)

1.2

We now have to fill in the information from Exercise 2 in order to access our deployed models. Anything in <> is a placeholder and needs to be swapped with your own data!

![alt text](https://github.com/vijayrajput/geineExercise/blob/main/image/2.webp?raw=true)

1.3

Go back to the Launchpad app to get the necessary data. The resource group is just the name of the resource group you created, which should be unique service.

![alt text](https://github.com/vijayrajput/geineExercise/blob/main/image/3.webp?raw=true)

![alt text](https://github.com/vijayrajput/geineExercise/blob/main/image/4.webp?raw=true)

1.4

We will be using to models in this application, one for embedding data (EMEBEDDING_MODEL) and one LLM for prompting (CHAT_MODEL). When it comes to the LLM, we have some choice, as we deployed a few of them. For this exercise, we suggest using your gpt-4o deployment for best results. We only deployed one embedding model, OpenAI's text-embedding-3-large. 

![alt text](https://github.com/vijayrajput/geineExercise/blob/main/image/5.webp?raw=true)

Important! Be careful to paste the ID's in the correct fields → GPT in CHAT_MODEL and embedding in EMBEDDING_MODEL.

![alt text](https://github.com/vijayrajput/geineExercise/blob/main/image/6.webp?raw=true)

Step 2: Install Dependencies

2.1 

Go to the menu and open a terminal like so:

![alt text](https://github.com/vijayrajput/geineExercise/blob/main/image/7.png?raw=true)

2.2

Type the following in the terminal and press Enter:

npm i

![alt text](https://github.com/vijayrajput/geineExercise/blob/main/image/8.png?raw=true)

Wait for the installation process to finish.

![alt text](https://github.com/vijayrajput/geineExercise/blob/main/image/9.png?raw=true)

Step 3: Connect to Cloud Foundry

3.1

Find the Cloud Foundry icon in the side toolbar, navigate to either services or applications and click on the Login arrow.

![alt text](https://github.com/vijayrajput/geineExercise/blob/main/image/10.png?raw=true)

3.2

Leave the authenticated method as the default SSO Passcode option and click on the link to generate a new password.

![alt text](https://github.com/vijayrajput/geineExercise/blob/main/image/11.png?raw=true)

3.3

Choose to sign in with default identity provider.

![alt text](https://github.com/vijayrajput/geineExercise/blob/main/image/12.png?raw=true)

3.4

Use the copy icon to get the password.

![alt text](https://github.com/vijayrajput/geineExercise/blob/main/image/13.png?raw=true)


3.5

Go back to your BAS page, paste the password and click on Sign in.

![alt text](https://github.com/vijayrajput/geineExercise/blob/main/image/14.png?raw=true)

3.6

Select the genie-ai-emea-btp organization from the drop down and leave the default value for the space. Click on Apply.

![alt text](https://github.com/vijayrajput/geineExercise/blob/main/image/15.png?raw=true)

Step 4: Connect to Services and Run Locally

4.1

First we connect to an instance of Hana Cloud in order to use the Hana Vector Engine service. Go back to the terminal and type:

cds deploy --to hana:genieExercise-db-<unique-number like Emp# or S-User ID>

Substitute the end of the command with your own employee number as in the example below.

![alt text](https://github.com/vijayrajput/geineExercise/blob/main/image/16.png?raw=true)

Press Enter. The process will take a while since a new HDI Container will be created for you. When it finishes successfully you should see an output ending with this:

![alt text](https://github.com/vijayrajput/geineExercise/blob/main/image/17.png?raw=true)

4.2

To connect to our destination service, type the following command into the terminal and press Enter: 

cds bind --to geineExercise-destination

![alt text](https://github.com/vijayrajput/geineExercise/blob/main/image/18.png?raw=true)

4.3

We are finally ready to run the application. Type: 

cds watch --profile hybrid

Press Enter. Once the server is up, you can use the pop-up to open the application in a new tab.

![alt text](https://github.com/vijayrajput/geineExercise/blob/main/image/19.png?raw=true)

Step 5: Testing the Application

5.1

Start by accessing the chatbot webapp using the following path:

![alt text](https://github.com/vijayrajput/geineExercise/blob/main/image/20.png?raw=true)

5.2

You should see the following chatbot UI. 

![alt text](https://github.com/vijayrajput/geineExercise/blob/main/image/21.webp?raw=true)

Try asking a question related to your area of expertise. In this example, we will be asking about BTP. 

![alt text](https://github.com/vijayrajput/geineExercise/blob/main/image/22.webp?raw=true)

5.3

In this case, the answer we got is wrong, as the Kyma runtime does not support mtar deployment. From question to question, the accuracy of the answer and the details provided might vary. Yet, we are guaranteed to get better accuracy and more relevant answers when using embeddings. To get started with that, go to this link and select your area of expertise.

![alt text](https://github.com/vijayrajput/geineExercise/blob/main/image/23.webp?raw=true)

In the page header, you will find a Download PDFs button. Click on it, then select a relevant document and click on Download.
![alt text](https://github.com/vijayrajput/geineExercise/blob/main/image/24.webp?raw=true)

5.3

Make sure to extract the file from the zip. Easiest way to do this on any operating system is opening the zip file, copying the PDF and pasting it in a folder of your choice. You can also right click on the file and choose the Extract all. 

![alt text](https://github.com/vijayrajput/geineExercise/blob/main/image/25.png?raw=true)

5.4

Now that we have the document, we can create an embedding using our other application. Navigate back to the starting page and open the second web app. 
![alt text](https://github.com/vijayrajput/geineExercise/blob/main/image/26.webp?raw=true)

5.5

Start by clicking on the Create button.

![alt text](https://github.com/vijayrajput/geineExercise/blob/main/image/27.webp?raw=true)

Now click on the Upload button and select the file we just downloaded and extracted. You can optionally add a note for future reference to the contents of the file. 
![alt text](https://github.com/vijayrajput/geineExercise/blob/main/image/28.webp?raw=true)

Wait for the icon to change from the empty file icon to the PDF file icon, which will indicate that the file has uploaded successfully.
![alt text](https://github.com/vijayrajput/geineExercise/blob/main/image/29.png?raw=true)

5.6

You can now check out the embedding chunks by going back and selecting the DocumentChunk endpoint.

![alt text](https://github.com/vijayrajput/geineExercise/blob/main/image/30.png?raw=true)

![alt text](https://github.com/vijayrajput/geineExercise/blob/main/image/31.webp?raw=true)

5.7

Now we can see how the embedded information will actually change the response of the chatbot. Try the same question you asked before! In our example, we actually got the correct answer this time around, as the model now has the necessary context.


![alt text](https://github.com/vijayrajput/geineExercise/blob/main/image/32.webp?raw=true)