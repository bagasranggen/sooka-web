export const getFormSubmitData = (form: HTMLElement) => {
    const submitForm: any = {};

    form.querySelectorAll('input, select').forEach((element: HTMLInputElement | Element) => {
        const type = element.getAttribute('type');

        switch (type) {
            case 'text':
            case 'number':
                if ('value' in element) submitForm[element.id] = element.value;
                break;

            case 'checkbox':
                if ('checked' in element) submitForm[element.id] = element?.checked;
                break;
        }
    });

    return submitForm;
};
