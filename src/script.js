setInterval(function() {
    changeClass();
}, 500);


index = 0;

function add()
{
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
    

    noteHoverDiv.appendChild(closeButton);
    noteHoverDiv.appendChild(textDiv);
    noteDiv.appendChild(noteHoverDiv);
    noteDiv.appendChild(textAreaDiv);

    noteBar.appendChild(noteDiv);
}

function loadSettings()
{
    $(document).ready(function() {
        $("#noteBar").load("settings.html");
      });
    console.log("Settings loaded");
}

function loadNotes()
{
    const selamDiv = document.getElementById("Selam");
    const titleBar = document.createElement("div");
    titleBar.id = "titleBar";
    document.getElementById("noteBar");
    noteBar.removeChild(selamDiv);
    noteBar.appendChild(titleBar);
}

function changeClass()
{
    $('.noteClass').click(function() {
        $(this).addClass('divActive');
        $('.noteClass').not(this).removeClass('divActive');
        $('.noteClass:not(.divActive)').children('#textAreaDiv').hide();
        $('.noteClass.divActive').children('#textAreaDiv').show();
    });
}