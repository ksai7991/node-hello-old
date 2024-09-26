const http = require('http');

// Function to get the current timestamp for logging purposes
function getCurrentTime() {
  return new Date().toISOString();
}

const server = http.createServer((req, res) => {
  console.log('Request Headers:', req.headers);
  
  // Set a timeout to respond after 120 seconds (120,000 milliseconds)
  const responseTimeout = setTimeout(() => {
    try {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Hello World\n');
      console.log('Response sent at:', getCurrentTime());
    } catch (error) {
      console.error('Error responding:', error.message);
    }
  }, 120000); // 120 seconds

  // Handle potential errors like timeouts
  req.on('error', (err) => {
    clearTimeout(responseTimeout); // Ensure the timeout doesn't continue
    console.error('Request error at:', getCurrentTime(), '| Error:', err.message);
  });

  res.on('error', (err) => {
    clearTimeout(responseTimeout);
    console.error('Response error at:', getCurrentTime(), '| Error:', err.message);
  });
});

server.listen(8080, () => {
  console.log('Server running on http://localhost:8080/');
});
