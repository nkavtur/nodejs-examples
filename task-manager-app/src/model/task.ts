import {model, Schema} from 'mongoose';

export interface ITask {
  description: string;
  completed: boolean;
}

const taskSchema = new Schema<ITask>({
  description: {type: String, required: true, trim: true},
  completed: {type: Boolean, default: false}
});


export const Task = model<ITask>('Task', taskSchema);
