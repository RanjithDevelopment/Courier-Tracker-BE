# Courier-Tracker-BE  
# instructions to run the appliction 
1 => clone it to your system and install the Npm Package By using the command (npm install) 
if you want to access the app you need Environment variables 
            MONGODB_URL = " your DB connection String " => used to connect to  mongoDb database 
            PORT = 5000  => to make your app listen 
	   SECRET_KEY = " any sring " => for token Generation 

2 => to Run the application just simply give the command (npm start) it will start the application

Live api :         1) https://courier-tracker-service.onrender.com/api
                       endPoints :-
                                    Post   =>  '/signUp',
                                    Post   =>  '/signin'
                                    Get     =>  '/getPackage/:Id' => authenticated , and authorizied only to the users 
                                    Get     =>  '/getUsers'       => authenticated , and authorizied only to the admin
                                    Delete => '/user/delete/:id'
                   2)  https://courier-tracker-service.onrender.com/api/admin
                              endPoints :- 
			           ( authenticated , and authorizied only to the admin )
                                     Post   =>  '/addPackage',
                                     Get    =>   '/getPackages'
                                     Put    =>  '/update/:id'
                                     Delete => '/delete/:id'
