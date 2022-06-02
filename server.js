const express = require('express')
const path = require('path');
const app = express();
app.use(express.static(__dirname + '/dist/frontend'));
app.get('/', function(req, res) {
    console.log("/ root route...");
    return res.sendFile(path.join(__dirname + 'dist/frontend/index.html'));
});
app.use(function(req, res) {
    console.log("wild route..........");
    return res.sendFile(path.join(__dirname + 'dist/frontend/index.html'));
});
app.listen(process.env.PORT || 8080);


//