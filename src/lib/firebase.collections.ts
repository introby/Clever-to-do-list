import {
    collection,
    deleteDoc,
    updateDoc,
    doc,
    query,
    where,
    FirestoreError,
    onSnapshot,
    QuerySnapshot,
    setDoc,
} from 'firebase/firestore';
import { db } from '../firebase';
import { TaskType } from '../components/Todolist';

export const todosCollection = collection(db, 'todos');
const dataQuery = (email: string) =>
    query(todosCollection, where('email', '==', email));
export const getTask = (id: string) => doc(db, 'todos', id);
export const deleteTaskFromDB = (id: string) => deleteDoc(getTask(id));
export const updateTask = (id: string, editedTask: TaskType) =>
    updateDoc(getTask(id), editedTask);
export const addTaskToDB = (id: string, newTask: TaskType) =>
    setDoc(getTask(id), newTask);

export const unsubscribeFunction = (
    email: string,
    observer: {
        (snapshot: QuerySnapshot): void;
        next?: ((snapshot: QuerySnapshot) => void) | undefined;
        error?: ((error: FirestoreError) => void) | undefined;
        complete?: (() => void) | undefined;
    }
) => onSnapshot(dataQuery(email), observer);
