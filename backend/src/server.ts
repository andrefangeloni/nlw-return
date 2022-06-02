import express from 'express';

const app = express();

app.get('/users', (req, res) => res.send('Hello World'));

app.listen(3333, () => {
  console.log('Server running on port 3333');
});
