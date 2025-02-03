const http = require('http');

const server = http.createServer((req, res) => {
  // Simulate a long-running operation
  let count = 0;
  const interval = setInterval(() => {
    count++;
    if (count === 5) {
      clearInterval(interval);
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Request processed!');
    }
  }, 1000);

  //This is the problem area, the request might close before the response is sent
  req.on('close', () => {
    console.log('Client disconnected!');
    clearInterval(interval);
  });
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});