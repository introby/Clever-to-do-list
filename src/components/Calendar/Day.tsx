import React, { forwardRef, useContext } from 'react';
import TodoContext from '../contexts/TodoContext';
import styles from './Calendar.module.scss';
import Marks from './Marks';

interface IProps {
    isActive: boolean;
    date: Date;
    onDayChange: () => void;
    isToday: boolean;
}

const Day = forwardRef<HTMLDivElement, IProps>(
    ({ date, onDayChange, isActive, isToday }: IProps, ref) => {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        const { setDay, tasks } = useContext(TodoContext);

        const dayClick = () => {
            onDayChange();
            setDay(date);
        };

        const getClassName = () => {
            if (isToday) {
                return isActive ? styles.active : styles.today;
            }
            return isActive ? styles.active : undefined;
        };
        const item = (
            <li className={getClassName()}>
                <button type="button" onClick={dayClick}>
                    <p>{days[date.getDay()]}</p>
                    <p>{date.getDate()}</p>
                    <Marks tasks={tasks} date={date} />
                </button>
            </li>
        );

        return ref ? <div ref={ref}>{item}</div> : <div>{item}</div>;
    }
);

Day.displayName = 'Day';
export default Day;
