setInterval(function() {
    changeClass();
}, 500);


index = 0;

function add()
{
    let currentTheme = theme.get;
    console.log(currentTheme);
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



    const textAreaDiv = document.createElement('div');
    const textArea = document.createElement('textarea');
    textAreaDiv.id = "textAreaDiv";
    textArea.name = "textArea";
    textArea.placeholder = "Selam!";
    textArea.classList.add('textAreaClass');
    
    textAreaDiv.appendChild(textArea);
    
    
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
    noteHoverDiv.appendChild(textDiv);
    noteDiv.appendChild(noteHoverDiv);
    noteDiv.appendChild(textAreaDiv);

    noteBar.appendChild(noteDiv);
}

function loadSettings()
{
    $(document).ready(function() {
        $("#settingsDiv").load("settings.html");
      });
    console.log("Settings loaded");
    const titleBar = document.getElementById('titleBar');
    titleBar.style.display = 'none';
    const settingsDiv = document.getElementById('settingsDiv');
    settingsDiv.style.display = "";
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
    const currentTheme = theme.get;
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
            $(this).addClass('divActive');
            $('.noteClass').not(this).removeClass('divActive');
            $('.noteClass:not(.divActive)').children('#textAreaDiv').hide();
            $('.noteClass.divActive').children('#textAreaDiv').show();
        });
    }
    
}

function changeWhiteTheme()
{
    var sideBar = document.getElementById("sideBar");
    sideBar.style.backgroundColor = "#e7e7e7";
    var noteBar = document.getElementById("noteBar");
    noteBar.style.backgroundColor = "#b6b5b5";
    $('.noteClass').children('#noteHoverDiv').addClass('white');
    $('.noteClass').children('#textAreaDiv').children('textArea').addClass('white');
    try {
        let themeModDiv = document.getElementById("themeModDiv");
        themeModDiv.style.color = "black";
        // let textArea = document.getElementById('textarea');
        // textArea.classList.add('white');
        
        // const noteHoverDiv = document.getElementById('noteHoverDiv');
        // noteHoverDiv.classList.add('white');
    } catch (error) {
        
    }
    var titleBar = document.getElementById("titleBar");
    titleBar.style.backgroundColor = "#cbcbcb";
    theme.write('white');
    
    

}

function changeDarkTheme()
{
    var sideBar = document.getElementById("sideBar");
    sideBar.style.backgroundColor = "rgb(46, 46, 46)";
    var noteBar = document.getElementById("noteBar");
    noteBar.style.backgroundColor = "#111";
    var titleBar = document.getElementById("titleBar");
    titleBar.style.backgroundColor = "#1d1d1dcf";
    $('.noteClass').children('#noteHoverDiv').removeClass('white');
    $('.noteClass').children('#textAreaDiv').children('textArea').removeClass('white');
    try {
        var themeModDiv = document.getElementById("themeModDiv");
        themeModDiv.style.color = "white";
        // const textArea = document.getElementById('textarea');
        // textArea.classList.remove('white');
        // const noteHoverDiv = document.getElementById('noteHoverDiv');
        // noteHoverDiv.classList.remove('white');
    } catch (error) {
        
    }
    theme.write('dark');
}
