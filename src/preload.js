const { contextBridge } = require('electron');
const crypto = require('crypto-js');
const path = `${process.env.APPDATA}\\NoteAppData`;
const fs = require('fs');
// const appDataPath = `${process.env.APPDATA}\\NoteAppData`;
// console.log(appDataPath);


function getFiles()
{
    fs.readdir(path+"\\notes\\", (err,files) => {
        // console.log(files);
        // return files;
        let array = [];
        // files.forEach(file => array.push(file));
        // console.log(typeof array);
        // return array;
        files.forEach(file => array.push(file));
        console.log(array);
        return array;

    });
}

function checkFile()
{
    fs.watch(path+"\\notes\\", {recursive: true}, (eventType,filename) => {
        if (eventType == "change")
        {
            return true;
        }
        else
        {
            return false;
        }
    });
}

function saveFile(key,value)
{
    // const path = `C:\\Users\\berke\\AppData\\Roaming\\NoteAppData\\notes\\${key}.json`;
    let encrypted = crypto.AES.encrypt(value,key).toString();

    const data = {noteData : encrypted,};
    let jsonData = JSON.stringify(data);
    fs.writeFileSync(path + `\\notes\\${key}.json`,jsonData);
    const bytes = crypto.AES.decrypt(encrypted,key);
    const originalData = bytes.toString(crypto.enc.Utf8);
    console.log(originalData);
}
contextBridge.exposeInMainWorld('file',{
    save: (key,value) => saveFile(key,value),
    check: () => checkFile(),
    get: () => getFiles()
});