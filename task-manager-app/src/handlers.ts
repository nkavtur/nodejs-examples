import {RequestHandler} from 'express';
import {User} from './model/user';
import {Task} from './model/task';


export const createUserFn: RequestHandler = async (req, res, next) => {
  const newUser = new User(req.body);

  try {
    await newUser.save();
    res.status(201).send();
  } catch (error) {
    res.status(400).send({message: error});
  }
};

export const getUsersFn: RequestHandler = async (req, res, next) => {

  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({message: error});
  }
};

export const getUserByIdFn: RequestHandler<{ id: string }> = async (req, res, next) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id);
    if (!user) {
      res.status(404).send({message: `User with id ${id} does not exist!`});
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({message: error});
  }
};

export const updateUserByIdFn: RequestHandler<{ id: string }> = async (req, res, next) => {
  const id = req.params.id;

  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'age', 'password'];
  const isValidUpdate = updates.every(update => allowedUpdates.includes(update));

  if (!isValidUpdate) {
    res.status(400).send({message: `Allowed to update only following fields: ${allowedUpdates}`});
  }

  try {
    const user = await User.findByIdAndUpdate(id, req.body, {new: true, runValidators: true});
    if (!user) {
      res.status(404).send({message: `User with id ${id} does not exist!`});
    }

    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({message: error});
  }
};

export const deleteUserByIdFn: RequestHandler<{ id: string }> = async (req, res, next) => {
  const id = req.params.id;
  console.log('id: ' + id);

  try {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      res.status(404).send({message: `User with id ${id} does not exist!`});
    }

    res.status(200).send();
  } catch (error) {
    res.status(500).send({message: error});
  }
};

export const createTaskFn: RequestHandler = async (req, res, next) => {
  const newTask = new Task(req.body);

  try {
    await newTask.save();
    res.status(201).send();
  } catch (error) {
    res.status(400).send({message: error});
  }
};

export const getTasksFn: RequestHandler = async (req, res, next) => {
  try {
    const tasks = await Task.find({});
    res.status(200).send(tasks);
  } catch (error) {
    res.status(500).send({message: error});
  }
};

export const getTaskByIdFn: RequestHandler<{ id: string }> = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      res.status(404).send({message: `Task with id ${req.params.id} does not exist!`});
    }

    res.status(200).send(task);
  } catch (error) {
    res.status(500).send({message: error});
  }
};

export const updateTaskByIdFn: RequestHandler<{ id: string }> = async (req, res, next) => {
  const id = req.params.id;

  const updates = Object.keys(req.body);
  const allowedUpdates = ['description', 'completed'];
  const isValidUpdate = updates.every(update => allowedUpdates.includes(update));

  if (!isValidUpdate) {
    res.status(400).send({message: `Allowed to update only following fields: ${allowedUpdates}`});
  }


  try {
    const task = await Task.findByIdAndUpdate(id, req.body, {new: true, runValidators: true});
    if (!task) {
      res.status(404).send({message: `Task with id ${id} does not exist!`});
    }

    res.status(200).send(task);
  } catch (error) {
    res.status(500).send({message: error});
  }
};


export const deleteTaskByIdFn: RequestHandler<{ id: string }> = async (req, res, next) => {
  const id = req.params.id;

  try {
    const task = await Task.findByIdAndDelete(id);
    console.log(task);

    if (!task) {
      res.status(404).send({message: `Task with id ${id} does not exist!`});
    }

    res.status(200).send();
  } catch (error) {
    res.status(500).send({message: error});
  }
};
