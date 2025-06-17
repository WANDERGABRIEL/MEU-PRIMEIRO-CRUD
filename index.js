import express from 'express';
import userRoutes from './src/routes/userRoutes.js';
import './src/config/firebaseConfig.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(userRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});