import express, { Request, Response } from 'express';
import { connectToDB } from './lib/database';
import './lib/redis';

connectToDB();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('WeWitness API is running!');
});

app.post('/upload', (req: Request, res: Response) => {
  // Placeholder for handling encrypted video chunk uploads
  console.log('Received upload request');
  res.status(200).send({ message: 'Chunk received' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
