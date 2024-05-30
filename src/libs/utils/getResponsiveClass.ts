import type { ResponsiveClassProps } from '@/libs/@types';
import { joinClassnameString } from '@/libs/utils/joinClassnameString';

export const getResponsiveClass = ({ obj, className }: { obj: ResponsiveClassProps; className: string }) => {
    const tempClass: string[] = [];

    Object.keys(obj).map((key: string) => {
        tempClass.push(`${className}-${key}-${obj[key as keyof typeof obj]}`);
    });

    return joinClassnameString(tempClass);
};
