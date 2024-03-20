export const truncateString = (str: string, num: number | { start: number; end: number }): string => {
    const start = typeof num === 'object' ? num.start : 0;
    const end = typeof num === 'number' ? num : num.end;

    // If the length of str is less than or equal to num
    // just return str--don't truncate it.
    if (str.length <= end) {
        return str;
    }
    // Return str truncated with '...' concatenated to the end of str.
    return str.slice(start, end) + '...';
};
