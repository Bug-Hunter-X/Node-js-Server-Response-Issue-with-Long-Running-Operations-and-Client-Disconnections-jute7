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

  // Handle client disconnection properly
  req.on('close', () => {
    console.log('Client disconnected!');
    clearInterval(interval);
    // Ensure the response is sent even if client disconnects
    res.end('Request processing stopped');
  });
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});