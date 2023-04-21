import { createContext } from 'react';
import { TaskType } from '../Todolist';

interface TodoContextType {
    day: Date;
    setDay: (day: Date) => void;
    tasks: TaskType[];
}

const TodoContext = createContext<TodoContextType>({
    day: new Date(),
    setDay(): void {},
    tasks: [],
});

export default TodoContext;
