import { Navigate } from 'react-router-dom';
import React, { useState } from 'react';
import { v1 } from 'uuid';
import { Button, Stack, WrapItem } from '@chakra-ui/react';
import useAuth from '../hooks/useAuth';
import Todolist from '../components/Todolist';

export type FilterValuesType = 'all' | 'active' | 'completed';

function Home() {
    const { isAuth, email } = useAuth();
    const [tasks, setTasks] = useState([
        { id: v1(), title: 'HTML&CSS', isDone: true },
        { id: v1(), title: 'Java', isDone: false },
        { id: v1(), title: 'JS', isDone: false },
        { id: v1(), title: 'React', isDone: true },
    ]);
    const [filter, setFilter] = useState<FilterValuesType>('all');

    const removeTask = (id: string) => {
        const filteredTasks = tasks.filter((t) => t.id !== id);
        setTasks(filteredTasks);
    };

    const addTask = (newTitle: string) => {
        const newTask = { id: v1(), title: newTitle, isDone: false };
        const newTasks = [newTask, ...tasks];
        setTasks(newTasks);
    };

    let tasksForTodolist = tasks;

    if (filter === 'active') {
        tasksForTodolist = tasks.filter((t) => !t.isDone);
    }
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter((t) => t.isDone);
    }

    const changeFilter = (value: FilterValuesType) => setFilter(value);

    return isAuth ? (
        <Stack>
            <Todolist
                title="What to learn"
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
            />
            <WrapItem>
                <Button onClick={() => {}}>Log out from {email}</Button>
            </WrapItem>
        </Stack>
    ) : (
        <Navigate to="/login" />
    );
}

export default Home;
