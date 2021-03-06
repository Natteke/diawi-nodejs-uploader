import { ApiStatusResponse, ApiUploadProps, StatusOptions, UploadOptions } from '@app/types';
import { rawUpload, fetchJobStatus } from '@app/core';
import { JOB_STATUS, DEFAULT_MAX_API_STATUS_CALLS, API_UPLOAD, API_STATUS } from '@app/constants';
import { noop, sleep } from '@app/utils';

interface Options extends UploadOptions, StatusOptions {
    maxApiStatusCalls?: number;
    onStatusProgress?: (status: JOB_STATUS) => any;
}

// upload file, and wait for proceeding
export const upload = async (props: ApiUploadProps, options: Options = {}) => {
    const { token } = props;

    // default params
    const {
        maxApiStatusCalls = DEFAULT_MAX_API_STATUS_CALLS,
        onUploadProgress = noop,
        onStatusProgress = noop,
        apiUploadEndpoint = API_UPLOAD,
        apiStatusEndpoint = API_STATUS,
    } = options;

    const { job } = await rawUpload(props, {
        onUploadProgress,
        apiUploadEndpoint,
    });

    let statusCallsCount = 0;

    // recursive status checks
    const checkStatus = async (): Promise<ApiStatusResponse> => {
        if (statusCallsCount > maxApiStatusCalls) throw new Error('max api calls exceeded');

        const jobStatus = await fetchJobStatus({ token, job }, { apiStatusEndpoint });
        const { status, message } = jobStatus;

        statusCallsCount += 1;
        onStatusProgress(status);

        switch (status) {
            case JOB_STATUS.ERROR: {
                throw new Error(message);
            }
            case JOB_STATUS.PROCEEDING: {
                await sleep(300);
                return checkStatus();
            }
            default: {
                return jobStatus;
            }
        }
    };

    return checkStatus();
};
