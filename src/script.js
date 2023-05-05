setInterval(function() {
    changeClass();
}, 500);


index = 0;
// file.get();
// checkFiles();
window.addEventListener('resize', function() {
    document.documentElement.style.setProperty('--screen-width',window.innerWidth - 60 + "px");

});
// function checkFiles()
// {
//     let files = file.get();
//     // console.log(typeof files);
//     console.log(files);
//     // console.log(files[0]);
// }

function setTheme(theme)
{
    localStorage.setItem('theme', theme);
}
function setFont(font)
{
    localStorage.setItem('font',font);
}
function getTheme()
{
    return localStorage.getItem('theme');
}
function getColor()
{
    return localStorage.getItem('color');
}
function getFont()
{
    return localStorage.getItem('font');
}



function setCurrentTheme()
{
    document.documentElement.style.setProperty('--screen-width',window.innerWidth - 60 + "px");
    let currentTheme = getTheme();
    let currentColor = getColor();
    $('#notesIcon').css('color', currentColor);
    $('#addIcon').css('color', currentColor);
    $('#settingsIcon').css('color', currentColor);
    $('#closeArrow').css('color',currentColor);
    $('#openButton').css('color', currentColor);
    if (currentTheme == "white")
    {
        changeWhiteTheme();
    }
    else
    {
        changeDarkTheme();
    }
}
function changeWhiteTheme()
{
    let sideBar = document.getElementById("sideBar");
    sideBar.style.backgroundColor = "#e7e7e7";
    let noteBar = document.getElementById("noteBar");
    noteBar.style.backgroundColor = "#b6b5b5";
    let notePanel = document.getElementById('notePanel');
    notePanel.style.backgroundColor = "#8e8e8e";
    $('.noteClass').children('#noteHoverDiv').addClass('white');
    $('.noteClass').children('#textAreaDiv').children('textArea').addClass('white');
    $('#themeDiv').addClass('white');
    $('#fontDiv').addClass('white');
    $('#colorChangerDiv').addClass('white');
    
    try {
        let themeModDiv = document.getElementById("themeModDiv");
        themeModDiv.style.color = "black";

    } catch (error) {
        
    }
    var titleBar = document.getElementById("titleBar");
    titleBar.style.backgroundColor = "#cbcbcb";
}
function changeDarkTheme()
{
    let sideBar = document.getElementById("sideBar");
    sideBar.style.backgroundColor = "rgb(46, 46, 46)";
    let noteBar = document.getElementById("noteBar");
    noteBar.style.backgroundColor = "#111";
    let titleBar = document.getElementById("titleBar");
    titleBar.style.backgroundColor = "#1d1d1dcf";
    let notePanel = document.getElementById('notePanel');
    notePanel.style.backgroundColor = "#4d4d4d";
    $('.noteClass').children('#noteHoverDiv').removeClass('white');
    $('.noteClass').children('#textAreaDiv').children('textArea').removeClass('white');
    $('#themeDiv').removeClass('white');
    $('#fontDiv').removeClass('white');
    $('#colorChangerDiv').removeClass('white');
    try {
        var themeModDiv = document.getElementById("themeModDiv");
        themeModDiv.style.color = "white";
    } catch (error) {
        
    }
}
function add()
{
    let currentTheme = getTheme();
    let currentColor = getColor();
    let currentFont = getFont();
    if (currentFont == "italic")
    {
        changeFontItalic();
    }
    else if (currentFont == "bold")
    {
        changeFontBold();
    }
    else
    {
        changeFontNormal();
    }
    document.documentElement.style.setProperty('--main-color',currentColor);
    const noteBar = document.getElementById('titleBar');
    const noteDiv = document.createElement('div');
    noteDiv.classList.add('noteClass');
    noteDiv.id = `note${index}`;
    index++;


    const noteHoverDiv = document.createElement('div');
    noteHoverDiv.id = "noteHoverDiv";

    const textDiv = document.createElement('div');
    textDiv.innerHTML = `Yeni Not ${index}`;
    textDiv.classList.add('textDivClass');
    textDiv.classList.add(currentFont);



    const textAreaDiv = document.createElement('div');
    const textArea = document.createElement('textarea');
    textAreaDiv.id = "textAreaDiv";
    textArea.name = "textArea";
    textArea.id = "textAreaID";
    textArea.placeholder = "Selam!";
    textArea.classList.add("textAreaClass");
    textArea.classList.add(currentFont);
    textAreaDiv.appendChild(textArea);
    
    const saveButton = document.createElement("div");
    saveButton.classList.add("saveButtonClass");
    saveButton.innerHTML = '<i class="fa-solid fa-floppy-disk"></i>'
    saveButton.addEventListener("click", () => {
        let textArea = document.getElementById('textAreaID');
        let data = textArea.value;
        let key = generateUniqueKey();
        file.save(key,data);
        // file.check();
    });


    const closeButton = document.createElement('div');
    closeButton.classList.add('closeButtonClass');
    closeButton.innerHTML = '<i class="fa-solid fa-x"></i>';
    closeButton.addEventListener('click', () => {closeButton.closest('.noteClass').remove();});
    
    if (currentTheme == "white")
    {
        textArea.classList.add('white');
        noteHoverDiv.classList.add('white');
    }
    else
    {
        textArea.classList.remove('white');
        noteHoverDiv.classList.remove('white');
    }

    noteHoverDiv.appendChild(closeButton);
    noteHoverDiv.appendChild(saveButton);
    noteHoverDiv.appendChild(textDiv);
    noteDiv.appendChild(noteHoverDiv);
    noteDiv.appendChild(textAreaDiv);

    noteBar.appendChild(noteDiv);
}

function loadSettings()
{   
    
    let currentTheme = getTheme();
    let currentColor = getColor();
    if (currentTheme == "white")
    {
        changeWhiteTheme();
    }
    else
    {
        changeDarkTheme();
    }
    const titleBar = document.getElementById('titleBar');
    titleBar.style.display = 'none';
    const settingsDiv = document.getElementById('settingsDiv');
    const colorPicker = document.getElementById('colorPicker');
    colorPicker.value = currentColor;
    settingsDiv.style.display = "";
    
    colorPicker.addEventListener('input',setColor);
    function setColor()
    {
        changeThemeColor();
    }
    document.documentElement.style.setProperty('--main-color',currentColor);
}

function loadNotes()
{
    const settingsDiv = document.getElementById("settingsDiv");
    const titleBar = document.getElementById("titleBar");
    titleBar.id = "titleBar";
    document.getElementById("noteBar");
    titleBar.style.display = "";
    settingsDiv.style.display = "none";
    noteBar.appendChild(titleBar);
    

}

function changeClass()
{
    let currentTheme = getTheme();
    if (currentTheme == "white")
    {
        $('.noteClass').click(function() {
            $(this).addClass('divActive');
            $('.noteClass').not(this).removeClass('divActive');
            $('.noteClass:not(.divActive)').children('#textAreaDiv').hide();
            $('.noteClass.divActive').children('#textAreaDiv').show();
        });
    }
    else
    {
        $('.noteClass').click(function() {
            $(this).addClass('divActive white');
            $('.noteClass').not(this).removeClass('divActive white');
            $('.noteClass:not(.divActive)').children('#textAreaDiv').hide();
            $('.noteClass.divActive').children('#textAreaDiv').show();
        });
    }
    
}

function changeThemeToWhite()
{
    localStorage.setItem('theme','white');
    loadSettings()
}

function changeThemeToDark()
{
    localStorage.setItem('theme','dark');
    loadSettings()
}

function changeFontItalic()
{
    $('.textDivClass').addClass('italic').removeClass('normal').removeClass('bold');
    $('.textAreaClass').addClass('italic').removeClass('normal').removeClass('bold');
    $('#settingsDiv').addClass('italic').removeClass('normal').removeClass('bold');
    setFont('italic');
}

function changeFontNormal()
{
    $('.textDivClass').addClass('normal').removeClass('italic').removeClass('bold');
    $('.textAreaClass').addClass('normal').removeClass('italic').removeClass('bold');
    $('#settingsDiv').addClass('normal').removeClass('italic').removeClass('bold');
    setFont('normal');
}

function changeFontBold()
{
    $('.textDivClass').addClass('bold').removeClass('italic').removeClass('normal');
    $('.textAreaClass').addClass('bold').removeClass('italic').removeClass('normal');
    $('#settingsDiv').addClass('bold').removeClass('italic').removeClass('normal');
    setFont('bold');
}
function setThemeColor()
{
    selectedColor = localStorage.getItem('color');
    $('#notesIcon').style.color=selectedColor;
    $('#addIcon').style.color=selectedColor;
    $('#settingsIcon').style.color=selectedColor;
    $('#openButton').css('color', currentColor);
}

function changeThemeColor()
{
    const colorPicker = document.getElementById('colorPicker');
    let currentColor = colorPicker.value;
    $('#notesIcon').css('color', currentColor);
    $('#addIcon').css('color', currentColor);
    $('#settingsIcon').css('color', currentColor);
    $('#openButton').css('color', currentColor);
    localStorage.setItem('color',currentColor);
    document.documentElement.style.setProperty('--main-color',currentColor);
}   
function generateUniqueKey() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let key = '';
    for (let i = 0; i < 32; i++) {
      key += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return key;
}

function closeNotePanel()
{
    const notePanel = document.getElementById('notePanel');
    notePanel.style.transition = 'transform 0.4s ease-in-out';
    notePanel.style.display = 'none';
    const noteBar = document.getElementById('noteBar');
    noteBar.style.transition = 'transform 0.4s ease-in-out';
    noteBar.style.left = '50px';
    noteBar.style.width = "100%";
    const openButton = document.getElementById('openButton');
    openButton.style.display = "block";
    $('#textAreaDiv').css("width","98vw");
    $('#settingsDiv2').css("width","var(--screen-width)");
    
}
function openNotePanel()
{
    const notePanel = document.getElementById('notePanel');
    notePanel.style.display = 'block';
    const openButton = document.getElementById('openButton');
    openButton.style.display = "none";
    const noteBar = document.getElementById('noteBar');
    noteBar.style.transition = 'transform 0.4s ease-in-out';
    noteBar.style.left = '300px';
    // const 
    noteBar.style.width = 'calc(100% - 200px)';
    $('#textAreaDiv').css("width","calc(var(--screen-width) - 220px)");
    $('#settingsDiv2').css("width","calc(var(--screen-width) - 250px)");
}