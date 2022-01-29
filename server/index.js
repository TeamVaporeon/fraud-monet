const cors = require('cors');
const express = require('express');
const path = require('path');
const port = 8080;

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname + './public')));

app.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});

//fraudmonet.com/room?[hash code here]
app.get(/room/, (req, res) => {
  console.log(req.query);
});
