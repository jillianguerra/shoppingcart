<h2>Prerequisites</h2>
<ul>
<li>node.js</li>
<li>nodemon</li>
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
To start the application, type: "npm run dev" in the terminal. This will start a server on localhost:3000.
</li>
<li>
To close the server, go into the terminal and type control-C.
</li>
<li>
router.post('/new', userController.createUser, cartController.createCart)
router.post('/login', userController.loginUser)
router.post('/logout', userController.auth, userController.logoutUser)
router.put('/:id', userController.auth, userController.updateUser)
router.delete('/:id', userController.auth, userController.deleteUser, cartController.deleteCart)
</li>
<li>

</li>
<li>
router.post('/new', itemController.createItem)
router.get('/', itemController.showIndex)
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