const http = require('http');

const server = http.createServer((req, res) => {
  console.log('Request Headers:', req.headers);
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(8080, () => {
  console.log('Server running on http://localhost:8080/');
});
