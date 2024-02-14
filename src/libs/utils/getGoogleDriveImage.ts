export const getGoogleDriveImage = (url: string) => {
    const split = new URL(url).pathname.split('/');

    return 'https://drive.google.com/thumbnail?id=' + split[3];
};