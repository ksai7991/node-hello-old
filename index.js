It seems you want to log more information from your Node.js server. You can achieve this by adding more `console.log` statements at various points in your code to track the flow and debug any issues. Here's an expanded version of your code with additional logging:

```javascript
const http = require('http');
const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  console.log('Received request');
  
  res.statusCode = 200;
  const msg = 'Hello Node!\n';
  res.write(msg);

  // Options for the HTTP request
  const options = {
    hostname: 'internal-app',
    port: 8080,
    path: '/',
    method: 'GET'
  };

  // Make the HTTP request
  const reqInternal = http.request(options, (resInternal) => {
    console.log('Internal request made');

    let data = '';

    // A chunk of data has been received.
    resInternal.on('data', (chunk) => {
      data += chunk;
    });

    // The whole response has been received.
    resInternal.on('end', () => {
      console.log('Internal request completed');
      res.write(data); // Write the response from internal-service to the main response
      res.end(); // End the main response
    });
  });

  // Handle errors for internal HTTP request
  reqInternal.on('error', (error) => {
    console.error(`Error making internal HTTP request: ${error.message}`);
    res.end(); // End the main response even if there's an error
  });

  // End the internal HTTP request
  reqInternal.end();
});

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/`);
});
```

With these additional log statements, you can track the flow of your server more closely and identify any issues that may arise. Adjust the log statements as needed to suit your debugging needs.
