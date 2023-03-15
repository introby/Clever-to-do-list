import React, { createContext, useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { v1 } from 'uuid';
import { Button, Stack, WrapItem } from '@chakra-ui/react';
import { setDoc, doc, deleteDoc, onSnapshot } from 'firebase/firestore';
import useAuth from '../hooks/useAuth';
import Todolist, { TaskType } from '../components/Todolist';
import { todosCollection } from '../lib/firebase.collections';
import { db } from '../firebase';
import AuthContext from '../components/AuthContext';
import Calendar from '../components/Calendar';

export type FilterValuesType = 'all' | 'active' | 'completed';

interface TodoContextType {
    day: Date;
    setDay: (day: Date) => void;
    tasks: TaskType[];
}

export const TodoContext = createContext<TodoContextType>({
    day: new Date(),
    setDay(): void {},
    tasks: [],
});

function Home() {
    const { isAuth, email } = useAuth();
    const [tasks, setTasks] = useState<TaskType[]>([]);
    const [filter, setFilter] = useState<FilterValuesType>('all');
    const { setEmail, setToken } = useContext(AuthContext);
    const [day, setDay] = useState(new Date());

    useEffect(() => {
        const unsubscribe = onSnapshot(todosCollection, (snapshot) => {
            setTasks(
                snapshot.docs.map((document) => ({
                    title: document.data().title,
                    isDone: document.data().isDone,
                    id: document.id,
                    date: document.data().date,
                }))
            );
        });
        return () => {
            unsubscribe();
        };
    }, [day]);

    const removeTask = (id: string) => {
        const docRef = doc(db, 'todos', id);
        deleteDoc(docRef)
            .then(() => {
                console.log('deleted');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const addTask = (newTitle: string) => {
        const newTask = {
            id: v1(),
            title: newTitle,
            isDone: false,
            date: new Date(), // из датапикера
        };

        const docRef = doc(db, 'todos', newTask.id);
        setDoc(docRef, newTask)
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

    return isAuth ? (
        <Stack>
            <TodoContext.Provider value={{ day, setDay, tasks }}>
                <Calendar />
                <Todolist
                    title="What to learn"
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                />
            </TodoContext.Provider>

            <WrapItem>
                <Button onClick={clearAuth}>Log out from {email}</Button>
            </WrapItem>
        </Stack>
    ) : (
        <Navigate to="/login" />
    );
    // return isAuth ? (
    //     <Stack>
    //         <Todolist
    //             title="What to learn"
    //             tasks={tasksForTodolist}
    //             removeTask={removeTask}
    //             changeFilter={changeFilter}
    //             addTask={addTask}
    //         />
    //         <WrapItem>
    //             <Button onClick={clearAuth}>Log out from {email}</Button>
    //         </WrapItem>
    //     </Stack>
    // ) : (
    //     <Navigate to="/login" />
    // );
}

export default Home;
