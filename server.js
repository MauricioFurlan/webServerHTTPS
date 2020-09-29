const express = require("express");
const https = require("https");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(express.static("public"));
app.use(express.urlencoded());
app.use(express.json());
app.post("/", function (request, response) {
  let req = request.body.user.name;
  let req_splited = req.split(' ');
  let inverted_phrase = '';
  for (let i = req_splited.length - 1; i >= 0; --i) {
      inverted_phrase += req_splited[i] + " ";
  }
  response.send(inverted_phrase);
});

const sslServer = https.createServer(
  {
    key: fs.readFileSync(path.join(__dirname, "cert", "key.pem")),
    cert: fs.readFileSync(path.join(__dirname, "cert", "cert.pem")),
  },
  app
);

sslServer.listen(3443, () => console.log("Secure server on port 3443"));
