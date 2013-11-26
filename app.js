var connect = require('connect');
var port = process.env.PORT || 5000;
connect.createServer(
    connect.static('./web')
).listen(port, function() {
    console.log("Listening on " + port);
});