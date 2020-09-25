/* eslint-disable no-console */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const semanticRelease = require('semantic-release');

(async () => {
    try {
        const result = await semanticRelease({
            branches: ['master'],
            repositoryUrl: 'git@github.com:Natteke/diawi-nodejs-uploader.git',
        });

        if (result) {
            const { lastRelease, commits, nextRelease, releases } = result;

            console.log(
                `Published ${nextRelease.type} release version ${nextRelease.version} containing ${commits.length} commits.`,
            );

            if (lastRelease.version) {
                console.log(`The last release was "${lastRelease.version}".`);
            }

            for (const release of releases) {
                console.log(`The release was published with plugin "${release.pluginName}".`);
            }

        } else {
            console.log('No release published.');
        }
    } catch (err) {
        console.error('The automated release failed with %O', err);
    }
})();
