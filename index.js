const express = require("express");
const cors = require("cors");
const app = express();
const sequelize = require('./db')

const userRouter = require('./app/routes/user')

var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(3000, () => {
  console.log(`Server is running on port 3000.`);
});

//routers 

app.use('/api/user', userRouter);


sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch((error) => {
  console.error('Unable to connect to the database: ', error);
});