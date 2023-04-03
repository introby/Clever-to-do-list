import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { v1 } from 'uuid';
import { Button, HStack, Stack, WrapItem } from '@chakra-ui/react';
import firebase from 'firebase/compat';
import { QueryDocumentSnapshot } from 'firebase/firestore';
import useAuth from '../hooks/useAuth';
import Todolist, { TaskType } from '../components/Todolist';
import {
    addTaskToDB,
    deleteTaskFromDB,
    unsubscribeFunction,
    updateTask,
} from '../lib/firebase.collections';
import AuthContext from '../components/contexts/AuthContext';
import TodoContext from '../components/contexts/TodoContext';
import Calendar from '../components/Calendar';
import Timestamp = firebase.firestore.Timestamp;

export type FilterValuesType = 'all' | 'active' | 'completed';

function Home() {
    const { isAuth, email } = useAuth();
    const [tasks, setTasks] = useState<TaskType[]>([]);
    const [filter, setFilter] = useState<FilterValuesType>('all');
    const { setEmail, setToken } = useContext(AuthContext);
    const [day, setDay] = useState(new Date());

    useEffect(() => {
        const unsubscribe = unsubscribeFunction((snapshot) => {
            setTasks(
                snapshot.docs.map((document: QueryDocumentSnapshot) => ({
                    title: document.data().title,
                    isDone: document.data().isDone,
                    id: document.id,
                    date: document.data().date,
                    description: document.data().description,
                }))
            );
        });
        return () => unsubscribe();
    }, [day]);

    const editTask = (task: TaskType) => {
        updateTask(task.id, task)
            .then(() => {
                console.log('edited');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const removeTask = (id: string) => {
        deleteTaskFromDB(id)
            .then(() => {
                console.log('deleted');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const changeCheckBox = (task: TaskType) => {
        const editedTask = { ...task };
        editedTask.isDone = !task.isDone;
        updateTask(task.id, editedTask)
            .then(() => {
                console.log('edited');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const addTask = (newTitle: string, date: Date, description: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: newTitle,
            isDone: false,
            date: Timestamp.fromDate(date),
            description,
        };

        addTaskToDB(newTask.id, newTask)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    let tasksForTodolist = tasks.filter((task) => {
        const timestamp = task.date;
        const selectedDate = timestamp ? timestamp.toDate().toDateString() : '';
        return selectedDate === day.toDateString();
    });

    if (filter === 'active') {
        tasksForTodolist = tasksForTodolist.filter((t) => !t.isDone);
    }
    if (filter === 'completed') {
        tasksForTodolist = tasksForTodolist.filter((t) => t.isDone);
    }

    const changeFilter = (value: FilterValuesType) => setFilter(value);
    const clearAuth = () => {
        setEmail('');
        setToken('');
    };

    const todoContextProviderValue = useMemo(
        () => ({ day, setDay, tasks }),
        [day, setDay, tasks]
    );

    return isAuth ? (
        <HStack
            padding="5px 2rem"
            spacing={5}
            align="top"
            justifyContent="space-between"
        >
            <Stack>
                <TodoContext.Provider value={todoContextProviderValue}>
                    <Calendar />
                    <Todolist
                        title="Tassker"
                        tasks={tasksForTodolist}
                        editTask={editTask}
                        removeTask={removeTask}
                        changeCheckBox={changeCheckBox}
                        changeFilter={changeFilter}
                        addTask={addTask}
                    />
                </TodoContext.Provider>
            </Stack>
            <WrapItem>
                <Button onClick={clearAuth}>Log out</Button>
            </WrapItem>
        </HStack>
    ) : (
        <Navigate to="/login" />
    );
}

export default Home;
