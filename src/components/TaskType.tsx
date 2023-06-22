import firebase from 'firebase/compat';
import Timestamp = firebase.firestore.Timestamp;

type TaskType = {
    id: string;
    email: string;
    title: string;
    isDone: boolean;
    date: Timestamp;
    description: string;
};

export default TaskType;
