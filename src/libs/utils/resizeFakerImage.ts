export const resizeFakerImage = (url: string, width: number, height: number) =>
    url.replace('640', width.toString()).replace('480', height.toString());
