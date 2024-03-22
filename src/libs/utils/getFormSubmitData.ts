type SubmitImagesArrayProps = {
    data: any;
    handle: string;
    value: string;
};

const submitImagesArray = ({ data, handle, value }: SubmitImagesArrayProps) => {
    if (typeof data[handle] === 'undefined') {
        data[handle] = [value];
    } else {
        data[handle].push(value);
    }
};

export const getFormSubmitData = (form: HTMLElement) => {
    const submitForm: any = {};

    form.querySelectorAll('input[id], select[id]').forEach((element: HTMLInputElement | Element) => {
        const tag = element.tagName;
        const type = element.getAttribute('type');
        const id = element.id;

        if (id === 'selectFrom') return;

        switch (tag) {
            case 'INPUT':
                switch (type) {
                    case 'checkbox':
                        if ('checked' in element) submitForm[id] = element?.checked;
                        break;

                    default:
                        const isImageArr = id.includes('image');

                        if ('value' in element && isImageArr) {
                            submitImagesArray({ data: submitForm, handle: 'images', value: element.value });
                        }

                        if ('value' in element && !isImageArr) {
                            submitForm[id] = element.value;
                        }
                        break;
                }
                break;

            case 'SELECT':
                if ('value' in element) submitForm[id] = element.value;
                break;
        }
    });

    return submitForm;
};
