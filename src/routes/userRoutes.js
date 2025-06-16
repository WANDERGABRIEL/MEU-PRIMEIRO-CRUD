import jwt from 'jsonwebtoken';
import express from 'express';
import { userController } from '../controllers/userController.js';

const router = express.Router();

console.log('userController:', userController);
console.log('typeof criar:', typeof userController.criar);
router.post('/user', userController.criar);
router.get('/user', userController.listar);
router.get('/users/buscar', userController.buscar);
router.put('/users/:id', userController.atualizar);
router.patch('/users/:id', userController.atualizar);
router.delete('/users/:id', userController.deletar);
router.post('/login', userController.login);

export default router;