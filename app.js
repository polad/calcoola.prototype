var connect = require('connect');
connect.createServer(
    connect.static('./web')
).listen(process.env.PORT || 5000, function() {
    console.log("Listening on " + port);
});