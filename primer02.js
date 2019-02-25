var http = require("http");
var firmata = require("firmata");

var board = new firmata.Board("/dev/ttyACM0", function() {// ACM (Abstract Control Model)
                                                         // za serijsko komunikacijo z Arduinom (lahko je USB)
    board.pinMode(13, board.MODES.OUTPUT); // Posamezni pin konfiguriramo, da deluje kot vhod ali izhod
    board.pinMode(8, board.MODES.OUTPUT); // Posamezni pin konfiguriramo, da deluje kot vhod ali izhod
});

http.createServer(function(req, res) { // http.createServer([requestListener])
                                      // "requestListener" je funkcija, ki se avtomatsko doda
                                      // k dogodku 'request'.
    var deli = req.url.split("/");// razdelimo url glede na znak "/"
    var operator = parseInt(deli[1], 10); // 10 osnova številskega sistema, dacimalno (od 2 do 36)
        
    if (operator == 10) {
        board.digitalWrite(13, board.LOW);
    }
    if (operator == 11) {
        board.digitalWrite(13, board.HIGH);
    }
    if (operator == 20) {
        board.digitalWrite(8, board.LOW);
    }
    if (operator == 21) {
        board.digitalWrite(8, board.HIGH);
    }
    if (operator == 99) {
        board.digitalWrite(8, board.HIGH);
        board.digitalWrite(13, board.HIGH);
    }
    if (operator == 00) {
        board.digitalWrite(8, board.LOW);
        board.digitalWrite(13, board.LOW);
    }
        
    res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
    res.write("Za test vpišite v brskalnikovo vrstico z naslovom: http://192.168.1.117:8080/1 <br>");
    res.write("ali: http://192.168.1.117:8080/0<br>");
    res.end("Vrednost operatorja: " + operator);
}).listen(8080, "192.168.1.117");