import express from 'express';
import * as handlers from './handlers';

export const router = express.Router();

router.post('/users', handlers.createUserFn);
router.get('/users', handlers.getUsersFn);
router.get('/users/:id', handlers.getUserByIdFn);
router.patch('/users/:id', handlers.updateUserByIdFn);
router.delete('/users/:id', handlers.deleteUserByIdFn);

router.post('/tasks', handlers.createTaskFn);
router.get('/tasks', handlers.getTasksFn);
router.get('/tasks/:id', handlers.getTaskByIdFn);
router.patch('/tasks/:id', handlers.updateTaskByIdFn);
router.delete('/tasks/:id', handlers.deleteTaskByIdFn);
