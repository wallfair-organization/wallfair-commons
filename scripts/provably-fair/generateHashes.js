const dotenv = require('dotenv');
dotenv.config();

const fs = require('fs');
const path = require('path');
// const crash = require('./crash');
const crash2 = require('./crash2');

const filePath = path.join(__dirname, 'output/hashes.txt');

const init = (totalHashes) => {
    const startTime = performance.now()
    console.log('Create empty file.');
    fs.writeFileSync(filePath, '');
    console.log(`Generating hashes into ${filePath} file...`);
    //reverse order, so first hash = line 1
    const hashes = crash2.generateListOfHashes(totalHashes).reverse().map((item)=> {
        fs.appendFileSync(filePath, `${item[1]}${"\r\n"}`);
        return item[1];
    });
    const endTime = performance.now();
    console.log(`${totalHashesToGenerate} hashes have been generated in ${(endTime - startTime)/1000} seconds.`)
}

const totalHashesToGenerate = 10_000_000;
init(totalHashesToGenerate);



