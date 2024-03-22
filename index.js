const express = require("express") 
const app = express();
const bodyParser = require("body-parser")

const userRouter = require('./app/routes/user')

app.use(express.json());
app.get('/', (req, res) => {
    res.send('REQUEST /')
})
app.use('/api/user', userRouter);

app.listen(3000, () => console.log("Server running in the port: 3000"));
