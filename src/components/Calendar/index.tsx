import React, { useState, useRef, useCallback, useEffect } from 'react';
import styles from './Calendar.module.scss';
import Day from './Day';

function Calendar() {
    const [activeDayIndex, setActiveDayIndex] = useState<number>();
    const [datesRange, setDatesRange] = useState<Date[]>([]);
    const [nextRange, setNextRange] = useState(1);

    function generateDatesRange(page: number, steps = 1) {
        const dateArray = [];
        const minus = new Date(new Date().setDate(new Date().getDate() - 14));
        const plus = new Date(
            new Date().setDate(new Date().getDate() + 14 * page)
        );

        while (minus <= plus) {
            dateArray.push(new Date(minus));
            minus.setUTCDate(minus.getUTCDate() + steps);
        }
        setDatesRange(dateArray);
    }

    useEffect(() => {
        generateDatesRange(nextRange);
    }, [nextRange]);

    const todayRef = useRef<null | HTMLDivElement>(null);
    useEffect(() => {
        if (todayRef.current) {
            todayRef.current.scrollIntoView({
                behavior: 'smooth',
                inline: 'center',
            });
        }
    });

    const intObserver = useRef<IntersectionObserver | null>();

    const lastDayRef = useCallback((date: Element) => {
        if (intObserver.current) intObserver.current.disconnect();

        intObserver.current = new IntersectionObserver((dates) => {
            if (dates[0].isIntersecting) {
                setNextRange((prevState) => prevState + 1);
            }
        });

        if (date) intObserver.current.observe(date);
    }, []);

    const onClickDay = (index: number) => {
        setActiveDayIndex(index);
    };

    function isToday(dateParameter: Date) {
        const today = new Date();
        return (
            dateParameter.getDate() === today.getDate() &&
            dateParameter.getMonth() === today.getMonth() &&
            dateParameter.getFullYear() === today.getFullYear()
        );
    }

    function getRef(date: Date, i: number) {
        let resultRef;
        if (isToday(date)) {
            resultRef = todayRef;
        }
        if (datesRange.length === i + 1) {
            resultRef = lastDayRef;
        }
        return resultRef;
    }

    return (
        <div className={styles.container}>
            <ul className={styles.stripe}>
                {datesRange.map((date, i) => {
                    return (
                        <Day
                            ref={getRef(date, i)}
                            key={date.toString()}
                            isActive={activeDayIndex === i}
                            date={date}
                            onDayChange={() => onClickDay(i)}
                            isToday={isToday(date)}
                        />
                    );
                })}
            </ul>
        </div>
    );
}

export default Calendar;
