const { contextBridge, ipcRenderer } = require('electron');
let getTheme = () => 
{
    const fs = require('fs');
    const data = fs.readFileSync("C:\\Users\\berke\\AppData\\Roaming\\NoteAppData\\settings.json");
    const theme = JSON.parse(data).theme;
    return theme;
}
let writeTheme = (currentTheme) => 
{
    const currentFont = getFont();
    const currentColor = getColor();
    const fs = require('fs');
    const data = {theme : currentTheme, font: currentFont, color: currentColor};
    const jsonData = JSON.stringify(data);
    fs.writeFileSync("C:\\Users\\berke\\AppData\\Roaming\\NoteAppData\\settings.json",jsonData);
}
let getFont = () => 
{
    const fs = require('fs');
    const data = fs.readFileSync("C:\\Users\\berke\\AppData\\Roaming\\NoteAppData\\settings.json");
    const font = JSON.parse(data).font;
    return font;
}
let writeFont = (currentFont) =>
{
    const currentTheme = getTheme();
    const currentColor = getColor();
    const fs = require('fs');
    const data = {theme : currentTheme, font: currentFont, color: currentColor};
    const jsonData = JSON.stringify(data);
    fs.writeFileSync("C:\\Users\\berke\\AppData\\Roaming\\NoteAppData\\settings.json",jsonData);

}
let getColor = () =>
{
    const fs = require('fs');
    const data = fs.readFileSync("C:\\Users\\berke\\AppData\\Roaming\\NoteAppData\\settings.json");
    const color = JSON.parse(data).color;
    return color;
}
let writeColor = (currentColor) => 
{
    const currentFont = getFont();
    const currentTheme = getTheme();
    const fs = require('fs');
    const data = {theme : currentTheme, font: currentFont, color: currentColor};
    const jsonData = JSON.stringify(data);
    fs.writeFileSync("C:\\Users\\berke\\AppData\\Roaming\\NoteAppData\\settings.json",jsonData);

}
let showWarning = (options) =>
{
    ipcRenderer.invoke("showWarning", options).then((selection) => {
        if (selection === 0) {
            location.reload();
        }
    });
}
contextBridge.exposeInMainWorld('theme', {
    get: getTheme(),
    write: (currentTheme) => writeTheme(currentTheme),
    getf : getFont(),
    writef : (currentFont) => writeFont(currentFont),
    getc : getColor(),
    writec : (currentColor) => writeColor(currentColor),
    warning : (options) => showWarning(options),

});