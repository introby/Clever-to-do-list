import { FilterValuesType } from 'pages/Home';
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { Button, Heading, HStack, List, Stack } from '@chakra-ui/react';
import firebase from 'firebase/compat';
import TaskModal from './TaskModal';
import Timestamp = firebase.firestore.Timestamp;
import useAuth from '../hooks/useAuth';
import Todo from './Todo';
import TaskType from './TaskType';

type PropsType = {
    title: string;
    tasks: Array<TaskType>;
    editTask: (task: TaskType) => void;
    removeTask: (taskId: string) => void;
    changeCheckBox: (task: TaskType) => void;
    addTask: (title: string, date: Date, description: string) => void;
    changeFilter: (value: FilterValuesType) => void;
};

function Todolist(props: PropsType) {
    const {
        title,
        tasks,
        editTask,
        removeTask,
        changeCheckBox,
        changeFilter,
        addTask,
    } = props;
    const [taskId, setTaskId] = useState('');
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [date, setDate] = useState(new Date());
    const [showModal, setShowModal] = useState(false);
    const [isNewTask, setIsNewTask] = useState(true);
    const { email } = useAuth();

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value);
    };

    const onDescriptionChangeHandler = (
        e: ChangeEvent<HTMLTextAreaElement>
    ) => {
        setTaskDescription(e.currentTarget.value);
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask(taskTitle, date, taskDescription);
            setTaskTitle('');
        }
    };

    const saveTaskHandler = () => {
        if (isNewTask) {
            addTask(taskTitle, date, taskDescription);
            setTaskTitle('');
        } else {
            editTask({
                id: taskId,
                email,
                title: taskTitle,
                isDone: false,
                date: Timestamp.fromDate(date),
                description: taskDescription,
            });
        }
        setShowModal(false);
    };

    const onAllClickHandler = () => {
        changeFilter('all');
    };

    const onActiveClickHandler = () => {
        changeFilter('active');
    };

    const onCompletedClickHandler = () => {
        changeFilter('completed');
    };

    const createNewTaskHandler = () => {
        setIsNewTask(true);
        setTaskTitle('');
        setDate(new Date());
        setTaskDescription('');

        setShowModal(true);
    };

    const editTaskHandler = (task: TaskType) => {
        setIsNewTask(false);
        setTaskId(task.id);
        setTaskTitle(task.title);
        setDate(task.date.toDate());
        setTaskDescription(task.description);

        setShowModal(true);
    };

    return (
        <Stack>
            <HStack>
                <Heading size="xl">{title}</Heading>
                <Button title="Create task" onClick={createNewTaskHandler}>
                    +
                </Button>
            </HStack>

            <TaskModal
                open={showModal}
                onClose={() => setShowModal(false)}
                newTask={isNewTask}
                date={date}
                onChangeDate={setDate}
                title={taskTitle}
                onChangeTitle={onNewTitleChangeHandler}
                onKeyPress={onKeyPressHandler}
                onChangeDescription={onDescriptionChangeHandler}
                description={taskDescription}
                onClickSave={saveTaskHandler}
            />
            <List spacing={3}>
                {tasks.map((task) => {
                    const onEditHandler = () => editTaskHandler(task);
                    const onRemoveHandler = () => removeTask(task.id);
                    const onCheckBoxChangeHandler = () => changeCheckBox(task);
                    return (
                        <Todo
                            key={task.id}
                            task={task}
                            onChange={onCheckBoxChangeHandler}
                            onClickEdit={onEditHandler}
                            onClickDelete={onRemoveHandler}
                        />
                    );
                })}
            </List>
            <Stack spacing={1} direction="row" align="center">
                <Button size="sm" onClick={onAllClickHandler}>
                    All
                </Button>
                <Button size="sm" onClick={onActiveClickHandler}>
                    Active
                </Button>
                <Button size="sm" onClick={onCompletedClickHandler}>
                    Completed
                </Button>
            </Stack>
        </Stack>
    );
}

export default Todolist;
