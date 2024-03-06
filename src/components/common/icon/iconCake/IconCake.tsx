import React from 'react';
import { ICON_VARIANTS } from '@/libs/handles/icon';
import type { ButtonColorsProps } from '@/libs/@types';

export type IconCakeProps = {
    variant: typeof ICON_VARIANTS.CAKE;
    id?: string;
    color: ButtonColorsProps;
};

const IconCake = ({ color, id }: IconCakeProps): React.ReactElement => {
    const iconId = `sooka_cake_${id}`;

    return <svg
        version="1.1"
        id={iconId}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        style={{ enableBackground: 'new 0 0 1080 1080', width: '100%', ...color === 'light' ? { '--icon-color': '#FFFFFF' } : {} } as any}
        xmlSpace="preserve"
        viewBox="447.67 372.68 357.15 409.09">
        <style
            dangerouslySetInnerHTML={{ __html: `#${iconId} .st0{fill:var(--icon-color, #F7613F);} .st1{fill:#FFFFFF;} #${iconId} .st2{fill:var(--icon-color, #FF9A00);}` }} />
        <path
            className="st2"
            d="M608.73,411.3c18.27,2.91,34.94,4.37,50.83,8.72c5.88,1.61,10.49,9.57,14.69,15.35 &#9;c15.32,21.11,29.84,42.8,45.37,63.74c15.62,21.06,33.42,40.63,47.64,62.55c7.59,11.71,18.25,19.27,26.98,29.19 &#9;c1.22,1.38,1.75,3.76,1.82,5.7c0.82,25.54,1.09,51.1,2.36,76.62c0.93,18.73,3.32,37.37,4.65,56.08c0.68,9.56,3.75,21.05-0.31,28.26 &#9;c-3.96,7.04-5.71,16.01-12.12,21.43c-2.64,2.23-7.49,3.18-11.08,2.72c-16.54-2.13-32.92-5.64-49.49-7.35 &#9;c-16.76-1.73-32.12-8.25-48.14-11.86c-11.96-2.7-23.07-7.96-35.24-9.77c-14.56-2.16-29.08-5.01-43.32-8.69 &#9;c-13.59-3.51-26.66-8.99-40.22-12.64c-9.94-2.67-20.45-3.2-30.44-5.75c-9.09-2.32-17.75-6.32-26.75-9.07 &#9;c-4.1-1.25-8.63-1.01-12.86-1.91c-5.96-1.26-11.76-3.3-17.74-4.38c-20.11-3.63-22.27-19.85-24.24-35.4 &#9;c-1.55-12.29-1.26-24.83-1.6-37.26c-0.38-14.04-0.73-28.09-0.76-42.13c-0.05-20.99,2.91-42.43-0.46-62.84 &#9;c-3.31-20.06,6.96-32.61,17.2-45.31c13.31-16.51,27.57-32.82,43.88-46.22c20.26-16.65,44.72-25.9,71.33-28.02 &#9;c3.2-0.25,6.48,0.08,9.6-0.53c5.28-1.03,8.61-2.69,7.69-10.04c-0.96-7.7,0.57-15.98,2.5-23.62c0.67-2.65,5.81-4.16,8.92-6.19 &#9;c0.42,2.84,1.31,5.71,1.19,8.53C610.15,391.49,609.36,401.7,608.73,411.3z M770.17,589.06c-4.3-4.88-8.49-9.51-12.55-14.24 &#9;c-12.92-15.05-26.04-29.94-38.62-45.27c-10.35-12.61-20.29-25.58-29.98-38.71c-7.82-10.6-14.9-21.76-22.49-32.53 &#9;c-4.89-6.94-11.95-12.98-14.74-20.62c-3.25-8.91-9.69-9.9-16.6-11.2c-5.86-1.11-11.92-1.6-17.88-1.54 &#9;c-2.88,0.03-7.68-0.01-7.68-0.01s0.09,7.77,0.31,10.16c0.23,2.43,0.1,4.9,0.11,7.35c0.03,12.19,3.91,18.05,11.76,15.7 &#9;c9.02-2.7,13.03,4.6,15.38,8.74c4.48,7.9,7.24,17.04,5.05,27.21c-1.68,7.82-6.94,10.72-12.15,15.19 &#9;c-7.72,6.61-16.25,7.69-24.99,5.84c-8.17-1.73-15.72-3.87-20.27-13.91c-7.47-16.45-7.34-22.98,6.74-34.41 &#9;c2.37-1.93,4.31-5.46,4.72-8.49c0.58-4.27-0.54-8.76-0.77-13.16c-0.36-6.64-0.58-13.29-0.86-19.93 &#9;c-58.05,9.74-96.15,42.59-123.07,91.38c5.56,1.59,10.78,3.52,16.18,4.52c9.06,1.68,18.42,1.98,27.31,4.24 &#9;c20.45,5.2,40.66,11.38,61.04,16.88c17.73,4.78,35.75,8.57,53.32,13.87c24.31,7.34,48.53,14.34,73.79,18.22 &#9;c20.15,3.1,39.75,9.74,59.64,14.62C765.32,589.58,768.04,589.06,770.17,589.06z M778.77,761.88c0-7.11,0.13-12.23-0.03-17.34 &#9;c-0.26-8.23-1.47-16.51-0.9-24.68c0.73-10.41-2.25-17.01-13.28-18.83c-9.71-1.6-19.54-2.99-28.96-5.7 &#9;c-24.73-7.13-49.23-15.06-73.92-22.35c-4.76-1.4-10.14-0.68-14.94-2.01c-20.02-5.55-39.89-11.6-59.87-17.29 &#9;c-22.47-6.4-45.05-12.46-67.49-18.96c-16.81-4.87-33.49-10.22-51.55-15.77c2.57,25.45,5,49.58,7.27,72.05 &#9;c8.39,2.45,14.37,4.28,20.39,5.93c8.42,2.32,16.77,5.08,25.34,6.64c19.8,3.63,39.9,5.85,59.54,10.15 &#9;c17.94,3.93,35.4,10.04,53.16,14.87c19.15,5.2,39.01,8.43,57.44,15.45c21.51,8.2,43.27,11.34,65.91,11.52 &#9;c3.53,0.03,7.06,1.81,10.58,2.84C770.68,759.36,773.9,760.38,778.77,761.88z" />
    </svg>;
};

export default IconCake;