import { ApiUploadProps, ApiUploadResponse, UploadOptions } from '@app/types';
import * as fs from 'fs';
import * as path from 'path';
import { createFormData, noop } from '@app/utils';
import { API_UPLOAD } from '@app/constants';
import { request } from '@app/core';

// upload file, without checking the status
export const rawUpload = async (params: ApiUploadProps, options: UploadOptions = {}): Promise<ApiUploadResponse> => {
    const {
        file,
        ...restParams
    } = params;

    const {
        onUploadProgress = noop,
    } = options;

    const filePath = path.resolve(file);

    // check file existence
    if (!fs.existsSync(filePath)) throw new Error(`file ${filePath} not found`);

    const fileStream = fs.createReadStream(filePath);
    const form = createFormData({ file: fileStream, ...restParams });

    // displays file upload progress
    const fileSize = fs.lstatSync(filePath).size;
    let bytesWritten = 0;
    fileStream.on('data', (chunk) => {
        bytesWritten += chunk.length;
        const progressPercent = Number(((bytesWritten / fileSize) * 100).toFixed(2));
        onUploadProgress(progressPercent, { bytesWritten, fileSize });
    });

    const data = await request({
        method: 'post',
        host: new URL(API_UPLOAD).host,
        headers: form.getHeaders(),
        formData: form,
    });

    return JSON.parse(data);
};
