
import express from "express";
import cors from "cors";
import sequelize from './db.js';

import authMiddleware from './app/middlewares/auth.js'
import { loginValidator } from './app/validators/auth.js'
import { registerValidator } from './app/validators/users.js'

import swaggerUi from 'swagger-ui-express';
import { specs } from './docs/swagger.js'

import userRouter from './app/routes/user.js';
import personRouter from './app/routes/person.js';
import authRouter from './app/routes/auth.js';

export const app = express();

var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(authMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))


app.listen(3000, () => {
  console.log(`Server is running on port 3000.`);
});

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch((error) => {
  console.error('Unable to connect to the database: ', error);
});

//routers 

app.use('/api/users', registerValidator, userRouter);
app.use('/api/person', personRouter);
app.use('/api/auth', loginValidator, authRouter);
