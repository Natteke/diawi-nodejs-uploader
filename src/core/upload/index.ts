import { ApiStatusResponse, UploadOptions } from '@app/types';
import { rawUpload, fetchJobStatus } from '@app/core';
import { JOB_STATUS, MAX_API_STATUS_CALLS } from '@app/constants';

interface Options {
    maxApiStatusCalls?: number;
}

// upload file, and wait for proceeding
export const upload = async (props: UploadOptions, options: Options = {}) => {
    const { token } = props;
    const {
        maxApiStatusCalls = MAX_API_STATUS_CALLS,
    } = options;

    const { job } = await rawUpload(props);
    let statusCallsCount = 0;

    const checkStatus = async (): Promise<ApiStatusResponse> => {
        const jobStatus = await fetchJobStatus({ token, job });
        const { status, message } = jobStatus;

        if (statusCallsCount > maxApiStatusCalls) {
            statusCallsCount += 1;
            throw new Error('max status api calls exceeded');
        }

        console.log('status', status);

        switch (status) {
            case JOB_STATUS.ERROR: {
                throw new Error(message);
            }
            case JOB_STATUS.PROCEEDING: {
                console.log('status PROCEEDING', status);
                return checkStatus();
                break;
            }
            default: {
                return jobStatus;
            }
        }
    };

    return checkStatus();
};
