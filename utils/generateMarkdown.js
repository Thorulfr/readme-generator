// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {}

const generateTests = (tests) => {
    if (!tests) {
        return '';
    }
};

function generateMarkdown(data) {
    return `
# ${data.title}

## Description

${data.description}

## Installation

${data.installation}

## Usage Instructions

${data.usage}

## Questions

<https://github.com/${data.github}>
${data.email}

## License

${data.license}
`;
}

module.exports = generateMarkdown;
