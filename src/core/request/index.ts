import * as https from 'https';
import { RequestOptions } from 'https';
import * as FormData from 'form-data';

interface Params extends RequestOptions {
    formData: FormData
}

export const request = async (props: Params): Promise<any> => {
    const { formData, ...requestOptions } = props;

    return new Promise((resolve, reject) => {
        const request = https.request(requestOptions, (request) => {
            request.on('data', (data) => {
                resolve(data);
            });

            request.on('error', reject);
        });

        request.on('response', (res) => {
            if (res.statusCode !== 200) {
                reject(new Error(`API Response error: Status: ${res.statusCode}; Message: ${res.statusMessage} `));
            }
        });

        formData.pipe(request);
    });
};
