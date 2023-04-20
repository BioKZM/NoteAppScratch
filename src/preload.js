const { contextBridge } = require('electron');
let getTheme = () => 
{
    const fs = require('fs');
    const data = fs.readFileSync("C:\\Users\\berke\\AppData\\Roaming\\NoteAppData\\settings.json");
    const theme = JSON.parse(data).theme;
    console.log(theme);
    return theme;
}
let writeTheme = (currentTheme) => 
{
    const fs = require('fs');
    const data = {theme: currentTheme};
    const jsonData = JSON.stringify(data);
    fs.writeFileSync("C:\\Users\\berke\\AppData\\Roaming\\NoteAppData\\settings.json",jsonData);
}

// contextBridge.exposeInMainWorld('theme', getTheme);
contextBridge.exposeInMainWorld('theme', {
    get: getTheme(),
    write: (currentTheme) => writeTheme(currentTheme),
});