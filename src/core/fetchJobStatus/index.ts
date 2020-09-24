import { API_STATUS } from '@app/constants';
import { ApiStatusParams, ApiStatusResponse } from '@app/types';
import fetch from 'node-fetch';

export const fetchJobStatus = async ({ token, job }: ApiStatusParams): Promise<ApiStatusResponse> => {
    const url = `${API_STATUS}/?token=${token}&job=${job}`;
    const res = await fetch(url);

    return res.json();
};
