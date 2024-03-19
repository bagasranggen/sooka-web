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

    form.querySelectorAll('input, select').forEach((element: HTMLInputElement | Element) => {
        const tag = element.tagName;
        const type = element.getAttribute('type');

        switch (tag) {
            case 'INPUT':
                switch (type) {
                    case 'text':
                    case 'number':
                        const isImageArr = element.id.includes('image');

                        if ('value' in element && isImageArr) {
                            submitImagesArray({ data: submitForm, handle: 'images', value: element.value });
                        }

                        if ('value' in element && !isImageArr) {
                            submitForm[element.id] = element.value;
                        }
                        break;

                    case 'checkbox':
                        if ('checked' in element) submitForm[element.id] = element?.checked;
                        break;
                }
                break;

            case 'SELECT':
                if ('value' in element) submitForm[element.id] = element.value;
                break;
        }
    });

    return submitForm;
};
