/* eslint-disable no-multi-spaces */

export interface ApiUploadProps {
    token: string;                             // your API access token
    file: string;                              // path to file
    find_by_udid?: boolean;                    // allow your testers to find the app on Diawi's mobile web app using their UDID (iOS only)
    wall_of_apps?: boolean;                    // allow Diawi to display the app's icon on the wall of apps
    password?: string;                         // protect your app with a password; it will be required to access the installation page
    comment?: string;                          // additional information to your users on this build; the comment will be displayed on the installation page
    callback_url?: string;                     // the URL Diawi should call with the result
    callback_emails?: string;                  // the email addresses Diawi will send the result to (up to 5 separated by commas for starter/premium/enterprise accounts, 1 for free accounts)
    installation_notifications?: boolean;      // receive notifications each time someone installs the app (only starter/premium/enterprise accounts)
}

export interface UploadOptions extends ApiUploadProps {
    onUploadProgress?: AnyFunction;
}

export interface ApiUploadResponse {
    job: string;
}

export interface ApiStatusParams {
    token: string;                              // your API access token
    job: string;                                // the upload job hash from the upload response
}

export interface ApiStatusResponse {
    status: number;
    message: string;
    hash?: string;
    link?: string;
    qrcode?: string,
    links?: string[],
    qrcodes?: string[]
}

export type AnyFunction = (...args: any) => any;
export type AnyObject = Record<any, any>;
