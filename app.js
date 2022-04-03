// Persona 5 Calling Card - Express Static Page (@skyventuree)
// While it's possible to open the webpage in your browser through the `file://` protocol,
// due to security issues, downloading image and some feature won't be available without using localhost.
const express = require('express');
const favicon = require('serve-favicon');
const app = express();

const port = 4200; // make sure the port you are using is not in use by other apps

app.use(express.static('.'));
app.use(favicon('./favicon.ico'));

app.get('/', (req, res) => {
    res.send("try /index.html");
})

app.listen(port, () => {
    console.info("p5cc launched");
    console.log('localhost:' + port);
})