const express = require('express');
const favicon = require('serve-favicon');
const app = express();

console.info("This Express Server should be used for local debugging only.");

app.use(express.static('.'));
app.use(favicon('./favicon.ico'));

app.get('/', (req, res) => {
    res.send("try /index.html");
})

app.listen(8080, () => {
    console.log('localhost:8080');
})