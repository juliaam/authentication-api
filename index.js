
import express from "express";
import cors from "cors";
import sequelize from './db.js';

import userRouter from './app/routes/user.js';
import personRouter from './app/routes/person.js';

export const app = express();

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

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch((error) => {
  console.error('Unable to connect to the database: ', error);
});

//routers 

app.use('/api/user', userRouter);
app.use('/api/person', personRouter);
