// Generated by CoffeeScript 1.9.3
(function() {
  var PORT, http, server;

  http = require('http');

  server = http.createServer(function(req, res) {
    res.writeHeader(200, {
      'Content-Type': 'text/plain'
    });
    res.write('Hello, World!');
    return res.end();
  });

  server.listen(PORT = 3000);

  console.log("Server running at http://localhost:" + PORT + "/");

}).call(this);

//# sourceMappingURL=web_server.js.map
