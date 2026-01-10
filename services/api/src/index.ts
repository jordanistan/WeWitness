import express, { Request, Response } from 'express';
import { connectToDB } from './lib/database';
import './lib/redis';
import uploadRouter from './routes/upload';

connectToDB();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('WeWitness API is running!');
});

app.use('/upload', uploadRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
