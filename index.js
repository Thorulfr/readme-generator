// Required packages
const inquirer = require('inquirer');
const fs = require('fs');
const generateMarkdown = require('./utils/generateMarkdown.js');

// Array of questions to ask the user
const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'What is the title of your project?',
        validate: (titleInput) => {
            if (titleInput) {
                return true;
            } else {
                console.log('Please enter the title of your project!');
                return false;
            }
        },
    },
    {
        type: 'input',
        name: 'description',
        message:
            'Enter a brief description of your project. What does your project do? What inspired you to create it?',
        validate: (descriptionInput) => {
            if (descriptionInput) {
                return true;
            } else {
                console.log('Please enter a description!');
                return false;
            }
        },
    },
    {
        type: 'input',
        name: 'installation',
        message:
            'How do users install your project? Provide a step-by-step description of how to get your project up and running.',
        validate: (installationInput) => {
            if (installationInput) {
                return true;
            } else {
                console.log('Please enter installation instructions!');
                return false;
            }
        },
    },
    {
        type: 'input',
        name: 'usage',
        message:
            'How are users meant to use your project? Provide instructions and examples.',
        validate: (usageInput) => {
            if (usageInput) {
                return true;
            } else {
                console.log('Please enter usage instructions!');
                return false;
            }
        },
    },
    {
        type: 'confirm',
        name: 'confirmTests',
        message: 'Did you write tests for your application?',
        default: false,
    },
    {
        type: 'input',
        name: 'tests',
        message: 'Explain what tests you included. Provide examples.',
        when: ({ confirmTests }) => {
            if (confirmTests) {
                return true;
            } else {
                return false;
            }
        },
    },
    {
        type: 'input',
        name: 'github',
        message: 'What is your GitHub username?',
        validate: (githubInput) => {
            if (githubInput) {
                return true;
            } else {
                console.log('Please enter your GitHub username!');
                return false;
            }
        },
    },
    {
        type: 'confirm',
        name: 'confirmDeployed',
        message: 'Is your project deployed?',
        default: false,
    },
    {
        type: 'input',
        name: 'deployed',
        message: 'Provide a link to the deployment.',
        when: ({ confirmDeployed }) => {
            if (confirmDeployed) {
                return true;
            } else {
                return false;
            }
        },
    },
    {
        type: 'confirm',
        name: 'confirmContribute',
        message: 'Can other people contribute to this project?',
        default: false,
    },
    {
        type: 'input',
        name: 'contribute',
        message:
            'Enter guidelines on how others can do so. If nothing is entered, Contributor Covenant guidelines will be selected.',
        default: 'Contributor Covenant',
        when: ({ confirmContribute }) => {
            if (confirmContribute) {
                return true;
            } else {
                return false;
            }
        },
    },
    {
        type: 'input',
        name: 'email',
        message:
            'Enter your email address so users can reach you with any additional questions.',
        validate: (emailInput) => {
            if (emailInput) {
                return true;
            } else {
                console.log('Please enter your email address!');
                return false;
            }
        },
    },
    {
        type: 'list',
        name: 'license',
        message:
            'Lastly, select which license you want to use for this project.',
        choices: ['Apache 2.0', 'GNU General Public License', 'MIT'],
    },
];

// Write the generated markdown to a README.md file in the dist folder
function writeToFile(markdownContent) {
    return new Promise((resolve, reject) => {
        fs.writeFile('./dist/README.md', markdownContent, (err) => {
            if (err) {
                reject(err);
                return;
            }
            resolve({
                ok: true,
                message: 'README created successfully.',
            });
        });
    });
}

// Prompt the user for responses using the questions array above
function init() {
    return inquirer.prompt(questions);
}

// Run the prompt function, generate markdown using user's responses, then write to file
init()
    .then((answers) => {
        console.log(answers);
        return answers;
    })
    .then((answers) => {
        return generateMarkdown(answers);
    })
    .then((markdown) => {
        return writeToFile(markdown);
    })
    .catch((err) => {
        console.log(err);
    });
