type ReorderArrayProps = {
    data: any[];
    from: number;
    to: number;
};

export const reorderArray = ({ data, from, to }: ReorderArrayProps): any[] => {
    const duplicateArr: any[] = [...data];

    duplicateArr.splice(to, 0, duplicateArr.splice(from, 1)[0]);

    return duplicateArr;
};
