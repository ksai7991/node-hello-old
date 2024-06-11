const http = require('http');
const port = process.env.PORT || 3000;
let count = 0;

const server = http.createServer((req, res) => {
  count++; // Increment the request count
  console.log(`Request number ${count} received To be, or not to be: that is the question: whether 'tis nobler in the mind to suffer the slings and arrows of outrageous fortune, or to take arms against a sea of troubles, and by opposing end them? To die: to sleep; no more; and, by a sleep to say we end the heart-ache and the thousand natural shocks that flesh is heir to, 'tis a consummation devoutly to be wish'd. To die, to sleep; to sleep: perchance to dream: ay, there's the rub; for in that sleep of death what dreams may come when we have shuffled off this mortal coil, must give us pause. There's the respect that makes calamity of so long a life; for who would bear the whips and scorns of time, the oppressor's wrong, the proud man's contumely, the pangs of dispriz'd love, the law's delay, the insolence of office, and the spurns that patient merit of the unworthy takes, when he himself might his quietus make with a bare bodkin? Who would fardels bear, to grunt and sweat under a weary life, but that the dread of something after death, the undiscover'd country from whose bourn no traveller returns, puzzles the will, and makes us rather bear those ills we have, than fly to others that we know not of? Thus consience doth make cowards of us all; and thus the native hue of resolution is sicklied o'er with the pale cast of thought, and enterprises of great pith and moment with this regard their currents turn awry, and lose the name of action.fweTo be, or not to be: that is the question: whether 'tis nobler in the mind to suffer the slings and arrows of outrageous fortune, or to take arms against a sea of troubles, and by opposing end them? To die: to sleep; no more; and, by a sleep to say we end the heart-ache and the thousand natural shocks that flesh is heir to, 'tis a consummation devoutly to be wish'd. To die, to sleep; to sleep: perchance to dream: ay, there's the rub; for in that sleep of death what dreams may come when we have shuffled off this mortal coil, must give us pause. There's the respect that makes calamity of so long a life; for who would bear the whips and scorns of time, the oppressor's wrong, the proud man's contumely, the pangs of dispriz'd love, the law's delay, the insolence of office, and the spurns that patient merit of the unworthy takes, when he himself might his quietus make with a bare bodkin? Who would fardels bear, to grunt and sweat under a weary life, but that the dread of something after death, the undiscover'd country from whose bourn no traveller returns, puzzles the will, and makes us rather bear those ills we have, than fly to others that we know not of? Thus consience doth make cowards of us all; and thus the native hue of resolution is sicklied o'er with the pale cast of thought, and enterprises of great pith and moment with this regard their currents turn awry, and lose the name of action.fweTo be, or not to be: that is the question: whether 'tis nobler in the mind to suffer the slings and arrows of outrageous fortune, or to take arms against a sea of troubles, and by opposing end them? To die: to sleep; no more; and, by a sleep to say we end the heart-ache and the thousand natural shocks that flesh is heir to, 'tis a consummation devoutly to be wish'd. To die, to sleep; to sleep: perchance to dream: ay, there's the rub; for in that sleep of death what dreams may come when we have shuffled off this mortal coil, must give us pause. There's the respect that makes calamity of so long a life; for who would bear the whips and scorns of time, the oppressor's wrong, the proud man's contumely, the pangs of dispriz'd love, the law's delay, the insolence of office, and the spurns that patient merit of the unworthy takes, when he himself might his quietus make with a bare bodkin? Who would fardels bear, to grunt and sweat under a weary life, but that the dread of something after death, the undiscover'd country from whose bourn no traveller returns, puzzles the will, and makes us rather bear those ills we have, than fly to others that we know not of? Thus consience doth make cowards of us all; and thus the native hue of resolution is sicklied o'er with the pale cast of thought, and enterprises of great pith and moment with this regard their currents turn awry, and lose the name of action.fwe`);

  // Delay response for 10 seconds
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

    // Make the HTTP request
    const reqInternal = http.request(options, (resInternal) => {

      let data = '';

      // A chunk of data has been received.
      resInternal.on('data', (chunk) => {
        data += chunk;
      });

      // The whole response has been received.
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
  }, 1); // 10 seconds delay
});

const delayInMilliseconds = 30 * 60 * 1000; // 30 minutes in milliseconds

setTimeout(() => {
  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}, delayInMilliseconds);
});
