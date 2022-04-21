import {RequestHandler} from 'express';
import {Todo} from '../models/todo';
import todo from '../routes/todo';


const todos: Todo[] = [

]

export const createTodo: RequestHandler = (req, res, next) => {
  const newTodo = new Todo(req.body.id, req.body.text)
  todos.push(newTodo);
  res.status(201).json({message: 'Created new TODO', createdTodo: newTodo})
};

export const getTodo: RequestHandler<{id: string}> = (req, res, next) => {
  console.log(req.params);
  const foundTodo = todos.filter(it => it.id === req.params.id);
  res.status(200).json({message: 'Found todo', foundTodo: foundTodo});
};

export const getTodos: RequestHandler = (req, res, next) => {
  res.status(200).json({todos: todos});
};

export const updateTodo: RequestHandler<{id: string}> = (req, res, next) => {
  const todoId = req.params.id;
  const updatedText = req.body as {text: string};

  const todo = todos.find(it => it.id === todoId);
  if (todo) {
    todo.text = updatedText.text;
    res.status(200).json({message: 'updated todo', updatedTodo: todo});
  } else {
    res.status(404).json({message: 'not found'});
  }
};

export const deleteTodo: RequestHandler<{id: string}> = (req, res, next) => {
  const todoId = req.params.id;

  const todoIndex = todos.findIndex(it => it.id === todoId);
  console.log(todoIndex);
  if (todoIndex >= 0) {
    todos.splice(todoIndex, 1);
    res.status(200).json({message: 'deleted todo'});
  } else {
    res.status(404).json({message: 'not found'});
  }
};
