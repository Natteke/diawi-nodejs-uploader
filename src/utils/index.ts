import * as FormData from 'form-data';

// async await timer
export const sleep = async (ms: number): Promise<void> => (
    new Promise((resolve) => setTimeout(resolve, ms))
);

export const createFormData = (data: Record<string, any>): FormData => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => formData.append(key, data[key]));
    return formData;
};

export const noop = () => {};
