'use strict';

require('dotenv').config()
const fs = require("fs");
const yaml = require("js-yaml");

const getFilesInDirectory = directory => {
    const files = fs.readdirSync(`${directory}/`, "utf8");

    return files.filter(file => file !== ".DS_Store");
};

const readYamlFile = (directory, filename) =>
{
    let fileContent = yaml.safeLoad(fs.readFileSync(`${directory}/${filename}`, "utf8"));

    fileContent.steps.forEach(step => {
        for (const item in step) {
            if (step.hasOwnProperty(item))
            {

                let value = step[item].toString();

                let replacable = value.match(/\${(.*)}/)

                if (replacable)
                {
                    value = value.replace(/\${(.*?)\}/gi, process.env[replacable[1]])

                    if (!isNaN(value))
                    {
                        value = parseInt(value);
                    }

                    step[item] = value;
                }
            }
        }
    });

    console.log(fileContent);
    
    return fileContent;
};

module.exports = { getFilesInDirectory, readYamlFile };
