import { ApiStatusParams, ApiStatusResponse, StatusOptions } from '@app/types';
import fetch from 'node-fetch';

export const fetchJobStatus = async ({ token, job }: ApiStatusParams, { apiStatusEndpoint }: StatusOptions): Promise<ApiStatusResponse> => {
    const url = `${apiStatusEndpoint}/?token=${token}&job=${job}`;
    const res = await fetch(url);

    return res.json();
};
