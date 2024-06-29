const fs = require('fs');
const path = require('path');
const {exec} = require('child_process');
const { stderr } = require('process');

const outputpath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputpath)) {
    fs.mkdirSync(outputpath, { recursive: true });
}

const executecpp = (filepath) => { 
    //C:\\Users\\sarva\\OneDrive\\Desktop\\GIT\\Online-Compiler\\backend\\codes\\04c37e66-d27d-41ef-a4b3-0def4e82ec9d.cpp
    // const jobid = path.parse(filepath).name; //04c37e66-d27d-41ef-a4b3-0def4e82ec9d (gives only filename)
    // console.log("executecpp uuid: " + jobid);
    
    const jobid = path.basename(filepath).split(".")[0];
    const filename = `${jobid}.exe`;
    const outpath = path.join(outputpath,filename);

    return new Promise((resolve, reject) => {
        exec(`g++ ${filepath} -o ${outpath} && cd ${outputpath} && .\\${filename}`,(error,stdout,stderr)=>{
            if(error){
                reject(error);
            }
            if(stderr){
                reject(stderr);
            }
            resolve(stdout);
        });
    });
};

module.exports = { executecpp };