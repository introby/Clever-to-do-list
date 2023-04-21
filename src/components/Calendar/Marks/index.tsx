import React from 'react';
import { TaskType } from '../../Todolist';
import styles from './Marks.module.scss';

type MarksType = {
    tasks: Array<TaskType>;
    date: Date;
};
function Marks({ tasks, date }: MarksType) {
    const result = tasks.filter((task) => {
        return (
            date.getDate() === task.date.toDate().getDate() &&
            date.getMonth() === task.date.toDate().getMonth() &&
            date.getFullYear() === task.date.toDate().getFullYear()
        );
    });
    const hasCompletedTasks = result.filter((task) => task.isDone).length > 0;
    const hasUncompletedTasks =
        result.filter((task) => !task.isDone).length > 0;
    return (
        <>
            {hasCompletedTasks && <span className={styles.done} />}
            <span className={styles.hidden} />
            {hasUncompletedTasks && <span className={styles.inProgress} />}
        </>
    );
}

export default Marks;
