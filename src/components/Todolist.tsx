import { FilterValuesType } from 'pages/Home';
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import {
    Button,
    Checkbox,
    Heading,
    HStack,
    Input,
    List,
    ListItem,
    Stack,
} from '@chakra-ui/react';
import { SingleDatepicker } from 'chakra-dayzed-datepicker';
import firebase from 'firebase/compat';
import Timestamp = firebase.firestore.Timestamp;

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
    date: Timestamp;
};

type PropsType = {
    title: string;
    tasks: Array<TaskType>;
    removeTask: (taskId: string) => void;
    addTask: (title: string) => void;
    changeFilter: (value: FilterValuesType) => void;
};

function Todolist(props: PropsType) {
    const { title, tasks, removeTask, changeFilter, addTask } = props;
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [date, setDate] = useState(new Date());

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value);
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask(newTaskTitle);
            setNewTaskTitle('');
        }
    };

    const addTaskHandler = () => {
        addTask(newTaskTitle);
        setNewTaskTitle('');
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

    return (
        <Stack>
            <Heading>{title}</Heading>

            <HStack>
                <SingleDatepicker
                    name="date-input"
                    date={date}
                    onDateChange={setDate}
                    propsConfigs={{
                        dayOfMonthBtnProps: {
                            defaultBtnProps: {
                                _hover: {
                                    background: 'blue.300',
                                },
                            },
                            selectedBtnProps: {
                                background: '#0085f230',
                            },
                        },
                        dateNavBtnProps: {
                            _hover: {
                                background: '#0085f230',
                            },
                        },
                        popoverCompProps: {
                            popoverContentProps: {
                                background: 'gray.700',
                                color: 'white',
                            },
                        },
                        inputProps: {
                            width: '115px',
                        },
                    }}
                />
                <Input
                    width="auto"
                    placeholder="Task name"
                    value={newTaskTitle}
                    onChange={onNewTitleChangeHandler}
                    onKeyPress={onKeyPressHandler}
                />
                <Button onClick={addTaskHandler}>+</Button>
            </HStack>
            <List spacing={3}>
                {tasks.map((t) => {
                    const onRemoveHandler = () => removeTask(t.id);
                    return (
                        <ListItem key={t.id}>
                            <Checkbox isChecked={t.isDone}>
                                {t.title} + {t.id}
                                <Button
                                    size="xs"
                                    colorScheme="blue"
                                    onClick={onRemoveHandler}
                                >
                                    x
                                </Button>
                            </Checkbox>
                        </ListItem>
                    );
                })}
            </List>
            <Stack spacing={1} direction="row" align="center">
                <Button onClick={onAllClickHandler}>All</Button>
                <Button onClick={onActiveClickHandler}>Active</Button>
                <Button onClick={onCompletedClickHandler}>Completed</Button>
            </Stack>
        </Stack>
    );
}

export default Todolist;
