import React, { useContext } from 'react';
import styles from './Calendar.module.scss';
import { TodoContext } from '../../pages/Home';
import { TaskType } from '../Todolist';

function Calendar() {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    function dateRange(steps = 1) {
        const dateArray = [];
        const minus = new Date(new Date().setDate(new Date().getDate() - 10));
        const plus = new Date(new Date().setDate(new Date().getDate() + 10));

        while (minus <= plus) {
            dateArray.push(new Date(minus));
            minus.setUTCDate(minus.getUTCDate() + steps);
        }

        return dateArray;
    }

    const dates = dateRange();

    const { setDay, tasks } = useContext(TodoContext);

    const dayClick = (date: Date) => {
        setDay(date);
    };

    function isToday(dateParameter: Date) {
        const today = new Date();
        return (
            dateParameter.getDate() === today.getDate() &&
            dateParameter.getMonth() === today.getMonth() &&
            dateParameter.getFullYear() === today.getFullYear()
        );
    }

    const taskMap = () => {
        // TODO смапить таски по дате и проверять, если ли в этот день таски
        const tasks2 = [
            { key: 'key1', val: 'val1' },
            { key: 'key2', val: 'val2' },
            { key: 'key3', val: 'val3' },
            { key: 'key3', val: 'val4' },
        ];
        const result = new Map();
        tasks2.map((task2) => {
            const items = result.get(task2.key);
            let newList: string[] = [];
            if (items) {
                newList = [].concat(items);
            }
            newList.push(task2.val);
            result.set(task2.key, newList);
        });

        return result;
    };

    return (
        <div className={styles.container}>
            <ul className={styles.stripe}>
                {dates.map((date) => {
                    return (
                        <li
                            key={date.toString()}
                            onClick={() => dayClick(date)}
                            className={isToday(date) ? 'today' : undefined}
                        >
                            <ul>
                                <li>{days[date.getDay()]}</li>
                                <li>{date.getDate()}</li>
                                {/* // TODO здесь метка, есть ли таски в этот день */}
                                <li>{taskMap().size}</li>
                            </ul>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default Calendar;
