<h2>Prerequisites</h2>
<ul>
<li>node.js</li>
<li>nodemon</li>
</ul>
<h2>Recommended Software</h2>
<ul>
<li>Postman</li>
<li>Visual Code Studio</li>
</ul>
<h2>Installation</h2>
<ol>
<li>
Fork the repository to your github and download the files.
</li>
<li>
Open the terminal, change directory into the main folder.
</li>
<li>
In the terminal, run "npm i" to install the necessary packages.
</li>
<li>
In the terminal, type "touch .env" to create an .env file. You will need a MONGO_URI (see Mongo.db for details) and a SECRET typed underneath the MONGO_URI. (SECRET should be in all capital letters like that, too.) Use a hashed secret word for the code. Your .env should look like this:
<li>
<p>MONGO_URI=*your mongo uri*</p>
<p>SECRET=*secret code*</p>
</li>
</li>
</ol>
<h2>Application Instructions</h2>
<ul>
<li>
To start the application, type: "npm run dev" in the terminal. This will start a server on localhost:3000, which updates every time the application is saved. Otherwise use "npm run start" to run the application, that will not restart when changes are made to the program.
</li>
<li>
To close the server, go into the terminal and type control-C.
</li>
<li>
To run the tests, make sure the application is running on localhost:3000, then open another terminal and type "npm run test." This should run tests on all the routes. There are 18 tests in total. All of them should pass.
</li>
<li>
To run the artillery test, type "npm run load." This will make 1200 test items in the data base, and give information about how long the response time is. (How fast the application is). The time will vary depending on how fast the computer running the application is.
</li>
<h3>User Routes</h3>
<ul>
<li>
<p>
To create a new user, go to localhost:3000/users/new in Postman. Change to a 'POST' request. Go to the 'body' tab, change the type to 'raw' and then change from 'text' to 'JSON.' Type the following:
</p>
<p>{</p>
    <p>"name": "*YOUR NAME*",</p>
    <p>"email": "*YOUR EMAIL*",</p>
    <p>"password": "*YOUR PASSWORD*"</p>
<p>}</p>
<p>
Then press 'SEND'. This will create a new user in the database. The password is automatically encrypted in the user model when the password is created or edited. You should already be logged in and have a json web token (which authorizes the user as logged in) when you first create a user. The token expires every 24 hours, so you will have to log in again.
</p>
<p>
A cart is automatically generated when you create a new user. The application routes first to creating the user in the user controller, then to the cart controller, where it creates a new cart using the new user data. Then it updates the user's cart information according to the new cart that was just created.
</p>
</li>
<li>
To log in, go to localhost:3000/users/login. Make sure the request is a 'post' request. Send your email and password. The application first encrypts the password you send and then compares that to the encrypted password in the database. If the two match, and the email matches the email in the database, it will generate a new json web token and switch the status of the user to "logged in: true".
</li>
<li>
To user the next few routes, you will need to have a token in Postman under authorization. Go to the authorization tab, set the type to 'bearer token' and copy paste the token you got when you either created the user, or logged in the user. Adding this will make the next few routes possible.
</li>
<li>
To log out, go to localhost:3000/users/logout. Make sure the request is a 'post' request. This will first authenticate the user by comparing the user token, then it will set the user status from "logged in: true" to "logged in: false".
</li>
<li>
To update a user, find your user _id from your Mongo DB database. Go to localhost:3000/users/*YOUR USER ID*. Change from 'POST' to 'PUT' on Postman. Then send the information like you are creating a new user, but make whatever changes you want to the user name, email or password. 
</li>
<li>
To delete a user, go to localhost:3000/users/delete. Change the request type to 'delete'. The application will automatically check your user information from the json web token. The user and cart are automatically deleted when you press 'send'.
</li>
</ul>
<h3>Item Routes</h3>
<ul>
<li>
<p>
To create a new item, go to localhost:3000/items/new. In a post request, send the following data in the body tab, set to raw, JSON.
</p>
<p>{</p>
    <p>"name": "*ITEM NAME*",</p>
    <p>"description": "*ITEM DESCRIPTION*",</p>
    <p>"category": "*ITEM CATEGORY*"</p>
    <p>"price": *ITEM PRICE AS A REGULAR NUMBER*</p>
<p>}</p>
<p>
Then press 'SEND'. This will create a new item in your Mongo database.
</p>
</li>
<li>
To see every item in the database, go to localhost:3000/items/. Make sure this is a get request in Postman.
</li>
<li>
To see every item in a particular category in the database, go to localhost:3000/items/all/*NAME OF CATEGORY*. Make sure this is a get request in Postman.
</li>
<li>
To see one particular item, find the item's _id in Mongo. Go to localhost:3000/items/*ID OF THE ITEM* and make sure it's a get request in Postman.
</li>
<li>
Hold on to that item ID because you'll need it for updating an item. Change to a put request. Go to localhost:3000/items/*ID OF THE ITEM* and enter the information the same way you did for creating an item, but with any changes you want to make.
</li>
<li>
To delete an item, grab the item _id from Mongo, and go to localhost:3000/items/*ID OF THE ITEM* and make a delete request. Poof it's gone.
</li>
<li>
To put an item in your cart, get that item ID one more time and go to localhost:3000/items/*ID OF THE ITEM* and make a post request. Make sure you have a token set in your authorization folder. See the user routes instructions above. If you make this request again, it will change the quantity of that item to 2, 3, 4, however many times you make the post request.
</li>
</ul>
<h3>Cart Routes</h3>
<ul>
<li>
To make any of the cart routes function in Postman, you will need to have a JSON web token set in the authorization tab with the type "bearer token". See user routes above for a detailed explanation.
</li>
<li>
To check out your cart, make a post request on localhost:3000/cart/checkout. It just changes the cart from 'isPaid: false' to 'isPaid: true'. Then it makes a fresh new cart for you with no items in it.
</li>
<li>
To get the history of all the paid carts, make a get requestion on localhost:3000/cart/history. It will give you a list of all the past orders that were made.
</li>
<li>
To just look at your cart, make a get request at localhost:3000/cart/. It uses the authorization token to find your user and find the current cart that the user has.
</li>
<li>
<p>
To change a quantity or delete an item from the cart, make a put request to localhost:3000/cart/. Include the following in the body:
</p>
<p>{</p>
    <p>"item": "*ITEM ID*",</p>
    <p>"quantity": *NUMBER*</p>
<p>}</p>
<p>
If you put down quantity: 0, the item will be deleted from the cart. Otherwise, it will update the quantity to the desired number.
</p>
</ul>
</ul>
<h2>Artillery Test Result*</h2>
<p><small>*Done on a 2018 MacBook Air</small></p>
<p>Summary report @ 20:40:52(-0400) 2023-07-06
  <p>Scenarios launched:  1200</p>
  <p>Scenarios completed: 1200</p>
  <p>Requests completed:  1200</p>
  <p>Mean response/sec: 19.84</p>
  <p>Response time (msec):</p>
   <p> min: 29</p>
   <p> max: 924</p>
   <p> median: 49</p>
   <p> p95: 234.5</p>
   <p> p99: 416.5</p>
  <p>Scenario counts:</p>
    <p>0: 1200 (100%)</p>
  <p>Codes:</p>
   <p> 200: 1200</p>
<h2>Trello Board</h2>
<a href="https://trello.com/b/aCdsX1R0/shopping-cart">Trello Time</a>
<h2>Wire Frames</h2>
<p>Homepage</p>
<img src="https://i.imgur.com/KYI2L6n.png">
<p>Item Page</p>
<img src="https://i.imgur.com/t4O1JBQ.png">
<p>Cart Page</p>
<img src="https://i.imgur.com/VFkuJgW.png">
<p>User Page</p>
<img src="https://i.imgur.com/MjdUtlZ.png">
<p>Item Category Index Page</p>
<img src="https://imgur.com/a/4IQ1D72">