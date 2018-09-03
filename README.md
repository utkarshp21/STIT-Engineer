# STIT PROGRAMMING CHALLENGE 

Heroku Working Application Link - https://eastvillage1.herokuapp.com/

Steps to setup application:

1) Clone the repository using command -  git clone https://github.com/utkarshp21/STIT-Engineer.git

2) Go to folder eastvillage and install all packages using command - npm install

3) Create a file credentials.js inside src folder and add the following lines with the correct api keys(correct way is using environmental variables but there was some problem in setting them up because of webpack configuration)
        
        export const google_api_key = YOUR_GOOGLE_MAP_API_KEY;
        export const yelp_api_key = YOUR_YELP_API_KEY;

4) Start the application by using command - npm start

5) Open localhost:3000 in your browser

6) Don't forget to allow the application to use your location
      
# Screenshot

1)![ScreenShot](https://raw.githubusercontent.com/utkarshp21/STIT-Engineer/master/Screenshots/1.png)

2)![ScreenShot](https://raw.githubusercontent.com/utkarshp21/STIT-Engineer/master/Screenshots/2.png)
