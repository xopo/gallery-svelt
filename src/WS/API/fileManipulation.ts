import { promises as fs } from 'fs';
import type {Task} from '../../WS/types';
import { getMessage, setMessage } from '../wsHelper';

const storiesFile = 'static/data/stories.json';

export const getTasks = async ():Promise<Array<Task>> => getMessage(await fs.readFile(storiesFile, 'utf8'));

export const setTasks = async (tasks: Array<Task>):Promise<void> => await fs.writeFile(storiesFile, setMessage(tasks, true));

export const updateTask = async (data): Promise<void> => {
    const tasks: Array<Task> = await getTasks();
    const {id, v, c} = data;
    const targetIndex = tasks.findIndex(task => task.id === id);
    tasks[targetIndex] = {...tasks[targetIndex], ...{id, c, v}};
    await fs.writeFile(storiesFile, setMessage(tasks, true));
}