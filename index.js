const http = require('http');

// Function to get the current timestamp for logging purposes
function getCurrentTime() {
  return new Date().toISOString();
}

// Function to calculate the time difference in seconds
function calculateTimeDifference(startTime) {
  const endTime = new Date();
  const timeDifference = (endTime - startTime) / 1000; // Time in seconds
  return timeDifference;
}

const server = http.createServer((req, res) => {
  const requestStartTime = new Date(); // Capture the start time of the request
  console.log('Request received at:', getCurrentTime());
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
  }, 10); // 120 seconds

  // Handle aborted connections
  req.on('aborted', () => {
    clearTimeout(responseTimeout); // Clear the timeout if the connection is aborted
    const elapsedTime = calculateTimeDifference(requestStartTime); // Calculate time until abort
    console.error(`Connection aborted after ${elapsedTime} seconds at ${getCurrentTime()}`);
  });

  // Handle potential request errors
  req.on('error', (err) => {
    clearTimeout(responseTimeout);
    const elapsedTime = calculateTimeDifference(requestStartTime);
    console.error(`Request error after ${elapsedTime} seconds at ${getCurrentTime()} | Error: ${err.message}`);
  });

  // Handle potential response errors
  res.on('error', (err) => {
    clearTimeout(responseTimeout);
    const elapsedTime = calculateTimeDifference(requestStartTime);
    console.error(`Response error after ${elapsedTime} seconds at ${getCurrentTime()} | Error: ${err.message}`);
  });
});

server.listen(8080, () => {
  console.log('Server running on http://localhost:8080/');
});
