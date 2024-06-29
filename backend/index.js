const express = require('express');
const {generateFile} = require('./generateFile.js');
const {executecpp} = require('./executecpp.js');
const cors = require('cors');
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/", (req,res)=>{
    res.json({online : 'compiler'});
});

app.listen(8000,()=>{
    console.log("Server is listening on port 8000");
});

app.post("/run", async (req,res)=>{
    const {lang='cpp',code} = req.body; //default lang = cpp
    
    if(code == undefined){
        return res.status(400).json({success: false, message: "empty code"});
    }

    try {
        const filepath = await generateFile(lang,code);
        //console.log(filepath);

        const output = await executecpp(filepath);
        // const output = badoutput.split('\\')[0];
        // console.log(output);
        res.send({ filepath , output});
    } catch (error) {
        res.status(500).json({success : false, message : "error : " + error.message});
    }

});
