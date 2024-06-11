const http = require('http');
const port = process.env.PORT || 3000;
let count = 0;

const server = http.createServer((req, res) => {
  count++; // Increment the request count
  console.log(`Request number ${count} received`);

  // Simulated delay for 30 minutes (in milliseconds)
  const delayInMilliseconds = 30 * 60 * 1000;

  setTimeout(() => {
    res.statusCode = 200;
    const msg = `Hello Node!\n`;
    res.write(msg);

    // Options for the HTTP request
    const options = {
      hostname: 'internal-app',
      port: 8080,
      path: '/',
      method: 'GET'
    };

    // Make the HTTP request to internal service
    const reqInternal = http.request(options, (resInternal) => {
      let data = '';

      // A chunk of data has been received
      resInternal.on('data', (chunk) => {
        data += chunk;
      });

      // The whole response has been received
      resInternal.on('end', () => {
        res.write(data); // Write the response from internal-service to the main response
        res.end(); // End the main response
      });
    });

    // Handle errors for internal HTTP request
    reqInternal.on('error', (error) => {
      res.end(); // End the main response even if there's an error
    });

    // End the internal HTTP request
    reqInternal.end();

  }, delayInMilliseconds); // 30 minutes delay

});

// Start the server after 30 minutes
server.listen(port, () => {
  console.log(`Server will start listening on http://localhost:${port}/ after 30 minutes.`);
});

