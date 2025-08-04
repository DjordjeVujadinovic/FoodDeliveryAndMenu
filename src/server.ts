import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api', (req, res) => {
  res.send('Ketering backend radi!');
});

app.listen(3000, () => {
  console.log('Server radi na http://localhost:3000');
});
