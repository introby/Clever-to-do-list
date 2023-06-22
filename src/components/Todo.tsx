import { Button, Checkbox, HStack, ListItem, Text } from '@chakra-ui/react';
import TaskType from './TaskType';

function Todo(props: {
    task: TaskType;
    onChange: () => void;
    onClickEdit: () => void;
    onClickDelete: () => void;
}) {
    // const _tmp_webstorm_ = props;
    const { onClickDelete, task, onChange, onClickEdit } = props;
    return (
        <ListItem>
            <HStack>
                <Checkbox isChecked={task.isDone} onChange={onChange} />
                <Text onClick={onClickEdit}>{task.title}</Text>
                <Button size="xs" colorScheme="blue" onClick={onClickEdit}>
                    ...
                </Button>
                <Button size="xs" colorScheme="blue" onClick={onClickDelete}>
                    x
                </Button>
            </HStack>
        </ListItem>
    );
}

export default Todo;
