const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const cors = require("cors");
const app = express();
const db = require("./models");
// cors
app.use(cors({
  origin: "http://localhost:3000"
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
db.sequelize.sync();
// routes
require("./routes")(app);

app.use(express.static(path.join(__dirname, 'client/build')));
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);
