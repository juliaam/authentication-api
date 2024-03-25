const express = require("express");
const cors = require("cors");
const app = express();

var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/teste', function (req, res) {
  res.send('server running');
});

app.listen(3000, () => {
  console.log(`Server is running on port 3000.`);
});