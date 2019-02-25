var http = require("http");
var firmata = require("firmata");

var board = new firmata.Board("/dev/ttyACM0", function(){
    
    board.pinMode(13, board.MODES.OUTPUT);
    
});

http.createServer(function(req, res){
    
    var parts = req.url.split("/");
    var operator = parseInt(parts[1], 10);
    
    if(operator == 0) {
        board.digitalWrite(13, board.LOW);
    }
    else if(operator == 1) {
        board.digitalWrite(13, board.HIGH);
    }
    
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end("Vrednost operatorja je: " + operator + ".");
}).listen(8080, "192.168.1.117");