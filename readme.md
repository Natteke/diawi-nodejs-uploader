# diawi-nodejs-uploader

A NodeJS tool for [Diawi](https://www.diawi.com/) integration written with [Typescript](https://www.typescriptlang.org/)
## Installation

```sh
$ yarn add diawi-nodejs-uploader
=== or ===
$ npm install diawi-nodejs-uploader
```

## Usage

#### Programmatic

All options except token and file are optional.

```js
import { upload } from 'diawi-nodejs-uploader';

const result = await upload({
        file: '/files/bundle.apk',
        token: 'token',
    });
console.log(result);
```

Full example

```js
import { upload } from 'diawi-nodejs-uploader';

const result = await upload({
    file: '/file/bundle.apk',
    token: 'token',
    callback_emails: 'email@mail.com',
    callback_url: 'myUrl.com/cb',
    comment: 'comment text',
    find_by_udid: true,
    installation_notifications: true,
    password: 'passwordForBundle',
    wall_of_apps: true,
}, {
    apiUploadEndpoint: 'rewriteDefauitDiawiUploadEndpoint',
    apiStatusEndpoint: 'rewriteDefauitDiawiStatusEndpoint',
    maxApiStatusCalls: 99,
    onUploadProgress: (progressPercent) => {
        console.log(`uploading: ${progressPercent}`);
    },
    onStatusProgress: (status) => {
        console.log(`status: ${status}`);
    },
});

console.log(result);
```




#### CLI

```js
// in development
```
