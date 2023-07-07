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
To see every item in the database, go to localhost:3000/items/
</li>
</ul>
<li>
router.post('/new', itemController.createItem)
router.get('/', itemController.showIndex)
router.get('/all/:category', itemController.showCategory)
router.get('/:id', itemController.showItem)
router.put('/:id',itemController.updateItem)
router.delete('/:id', itemController.deleteItem)
router.post('/:id', userController.auth, itemController.addItemToCart)
</li>
<li>
</li>
<li>
router.post('/checkout', userController.auth, cartController.checkOut)
router.get('/history', userController.auth, cartController.showHistory)
router.get('/:id', userController.auth, cartController.showCart)
router.put('/:id', userController.auth, cartController.updateItemInCart)
</li>
<li>
</li>
</ul>