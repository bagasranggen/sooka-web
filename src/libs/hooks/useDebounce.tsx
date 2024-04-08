import { useEffect, useRef, useState } from 'react';

export const useDebounce = (value: any, delay: number = 500) => {
    const [debouncedValue, setDebouncedValue] = useState('');
    const timerRef = useRef<null | any>();

    useEffect(() => {
        timerRef.current = setTimeout(() => setDebouncedValue(value), delay);

        return () => {
            clearTimeout(timerRef.current);
        };
    }, [value, delay]);

    return debouncedValue;
};
