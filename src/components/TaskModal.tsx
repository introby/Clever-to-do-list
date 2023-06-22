import {
    Button,
    HStack,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Textarea,
} from '@chakra-ui/react';
import { SingleDatepicker } from 'chakra-dayzed-datepicker';
import React from 'react';
import DatepickerConfigProp from './DatepickerConfigProp';

type PropsType = {
    open: boolean;
    onClose: () => void;
    newTask: boolean;
    date: Date;
    onChangeDate: (value: ((prevState: Date) => Date) | Date) => void;
    title: string;
    onChangeTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    onChangeDescription: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    description: string;
    onClickSave: () => void;
};

function TaskModal({
    open,
    onClose,
    newTask,
    date,
    onChangeDate,
    title,
    onChangeTitle,
    onKeyPress,
    onChangeDescription,
    description,
    onClickSave,
}: PropsType) {
    return (
        <Modal isOpen={open} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    {newTask ? 'Create task' : 'Edit task'}
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <HStack>
                        <SingleDatepicker
                            name="date-input"
                            date={date}
                            onDateChange={onChangeDate}
                            propsConfigs={DatepickerConfigProp}
                        />
                        <Input
                            width="100%"
                            placeholder="Task name"
                            value={title}
                            onChange={onChangeTitle}
                            onKeyPress={onKeyPress}
                        />
                    </HStack>
                    <Textarea
                        value={description}
                        mt={5}
                        placeholder="Description"
                        onChange={onChangeDescription}
                    >
                        {description}
                    </Textarea>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClickSave}>
                        Save task
                    </Button>
                    <Button mr={3} onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default TaskModal;
