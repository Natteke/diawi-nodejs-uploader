# diawi-nodejs-uploader

A NodeJS tool for [Diawi](diawi.com) integration written with [Typescript](https://www.typescriptlang.org/)
## Installation

```sh
$ yarn add diawi-nodejs-uploader
=== or ===
$ npm install diawi-nodejs-uploader
```

## Usage

#### Programmatic

All options exept token and file are optional.

```js
import { upload } from 'diawi-nodejs-uploader';

await upload({
        file,
        token,
    }, {
        onStatusProgress: console.log,
        onUploadProgress: console.log,
    })
```

#### CLI

```js
// in development
```
