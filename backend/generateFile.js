const fs = require('fs');
const path = require('path');
const { v4: uuid } = require('uuid');

const dircodes = path.join(__dirname, "codes");

if (!fs.existsSync(dircodes)) {
    fs.mkdirSync(dircodes, { recursive: true });
}

const generateFile = (lang, code) => {
    const jobid = uuid();
    // console.log("generateFile uuid: " + jobid);
    const filename = `${jobid}.${lang}`; //assuming lang is in .cpp ; (can manage from frontend)
    const filepath = path.join(dircodes, filename);
    //console.log(filepath);
    
    fs.writeFileSync(filepath, code);
    return filepath;
};

module.exports = { generateFile };