const fs= require("fs");
const path=require("path");
const { v4: uuid } = require('uuid');// ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'


const dirCodes=path.join(__dirname,"codes");

if(!fs.existsSync(dirCodes)){
    fs.mkdirSync(dirCodes,{recursive: true});
}

const generateFile=(format,content)=>{
    const jobID=uuid();
    const filename= `${jobID}.${format}`;
    const filePath=path.join(dirCodes,filename);
    fs.writeFileSync(filePath,content);

    return filePath;
}

module.exports={generateFile};