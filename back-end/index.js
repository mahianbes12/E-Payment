// Import necessary packages and modules
const express = require('express');
const bodyParser = require('body-parser');



const cors = require('cors');
const app = express();

var corOptions = {
  origin: 'https://localhost:3306'
}

//middleware
app.use(cors(corOptions))
app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({extended : true}))




//
const db = require('./models/index.js')
db.sequelize.sync();

db.sequelize.sync({force: false })
.then(() => {

  console.log('DB connected and it is working');
}); 

// Import controllers
const billController = require('./controller/billController.js')
const serviceController = require('./controller/serviceProviderController.js')
const paymentController = require('./controller/paymentController.js');
const userController = require('./controller/userController.js');
const AgentController = require('./controller/agentController.js');

// Import routes

const billsRouter = require('./routes/billRoute.js')
const serviceProvidersRouter = require('./routes/serviceProviderRoute.js');
const paymentRouter = require('./routes/paymentRoute.js');
const usersRouter = require('./routes/userRoute.js');
const AgentsRouter = require('./routes/agentRoute.js');

// Mount routes
app.use('/bill', billsRouter);
app.use('/serviceProvider', serviceProvidersRouter);
app.use('/payment', paymentRouter);


app.use('/user', usersRouter);
app.use('/agent', AgentsRouter);
app.use ('/Images',express.static('./Images'))



//testing api
app.get('/',(req,res)=>{
  res.json({message: 'hello there'})
})
app.post('/',(req,res)=>{
  res.json({message: 'hello from post....'})
})

//Port

const PORT = process.env.PORT || 3001


// start server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});



// app.use('/agents', AgentController);
// app.use('/bills', billController);
// app.use('/payments', paymentController);
// app.use('/services', serviceController);
// app.use('/users', userController);
// app.use('/agentHistory', agentHistoryController);
// app.use('/serviceHistory', serviceHistoryController);
// app.use('/userHistory', userHistoryController);

// start server
// app.listen(PORT, () => {



//   console.log(Server started on port ${PORT});



//   connection.connect(function(err){
//     if (err) throw err;
//     console.log('database connected');

//   })
// });