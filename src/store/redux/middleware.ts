import { createLogger } from 'redux-logger';

const logger = createLogger({
    duration: true,
    timestamp: false,
    collapsed: true,
    colors: {
        title: () => '#139BFE',
        prevState: () => '#1C5FAF',
        action: () => '#149945',
        nextState: () => '#A47104',
        error: () => '#FF0005',
    },
    predicate: () => typeof window !== 'undefined',
});

const middleware: any[] = [];

if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_REDUX_LOGGER === '1') middleware.push(logger);

export { middleware };