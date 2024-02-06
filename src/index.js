import express from 'express';
import authRoutes from './routes/authRoutes';

const app = express();
const port = 3000;

app.use(express.json());

// authRoutes 사용
app.use('/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
