// Generate the image path for the license badge
function generateLicenseBadge(license) {
    switch (license) {
        case 'Apache 2.0':
            return './assets/images/license-Apache-2-blue.svg';
        case 'GNU General Public License':
            return './assets/images/license-GPL-blue.svg';
        case 'MIT':
            return './assets/images/license-MIT-blue.svg';
        default:
            return '';
    }
}

// Generate the link for the license itself
function generateLicenseLink(license) {
    switch (license) {
        case 'Apache 2.0':
            return 'https://opensource.org/licenses/Apache-2.0';
        case 'GNU General Public License':
            return 'https://opensource.org/licenses/gpl-license';
        case 'MIT':
            return 'https://opensource.org/licenses/MIT';
        default:
            return '';
    }
}

// Generate Test Info section, if user indicates inclusion of tests
const generateTests = (tests) => {
    if (!tests) {
        return '';
    }
    return `
## Tests

The following tests have been implemented for this application:

${tests}
`;
};

// Generate Deployment Link section, if user indicates that a deployed version exists
const generateDeployedLink = (link) => {
    if (!link) {
        return '';
    }
    return `
## Deployment

A deployed version of this application can be found [here](${link}).
`;
};

// Generate contribution information, if user indicates that they're open to contributions for this project
const generateContribution = (contributionInfo) => {
    if (!contributionInfo) {
        return '';
    }

    if (contributionInfo === 'Contributor Covenant') {
        return `
## Contribution

Contribution to this project is governed by the Contributor Covenant's [Code of Conduct](https://www.contributor-covenant.org/version/2/1/code_of_conduct/). Please read through this code and ensure any proposed contributions follow the guidelines set forth therein.
`;
    } else {
        return `
## Contribution
    
${contributionInfo}
`;
    }
};

// Generate table of contents
const generateTableOfContents = (data) => {
    let tests = '';
    let deployed = '';
    let contribution = '';
    if (data.confirmTests) {
        tests = `* [Tests](<#tests>)`;
    }
    if (data.confirmDeployed) {
        deployed = `* [Deployment](<#deployment>)`;
    }
    if (data.confirmContribute) {
        contribution = `* [Contribution](#contribution)`;
    }
    return `
* [Description](#description)
${deployed}
* [Installation](#installation)
${tests}
* [Usage](#usage)
${contribution}
* [Questions](#questions)
* [License](#license)
`;
};

// Generate the final markdown content
function generateMarkdown(data) {
    return `# ${data.title}
![License Badge](${generateLicenseBadge(data.license)})
    
## Table of Contents
${generateTableOfContents(data)}

## Description

${data.description}
${generateDeployedLink(data.deployed)}
## Installation

${data.installation}
${generateTests(data.tests)}
## Usage

${data.usage}
${generateContribution(data.contribute)}
## Questions

If you have any questions about this project, please contact me through [my GitHub account](https://github.com/${
        data.github
    }) or by [sending me an email](mailto:${data.email}).

## License

Usage of this application is governed by the [${
        data.license
    }](${generateLicenseLink(data.license)}) license.

`;
}

module.exports = generateMarkdown;
