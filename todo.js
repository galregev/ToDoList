// Global Array.
var all_notes = [];
var myId = 0; 

// Create a new Object.
function noteObj(text, date, time, id) {
    var notes = {
        text : text,
        date : date,
        time : time,
        id : id
    }
    return notes;
}

// Get From localStorage
function backUp() {
var item = JSON.parse(localStorage.getItem("items"));
    if ( item !== null ) {
        all_notes = item;
    } else {
        console.log('localStorage is empty.')
    }
}
backUp();

function checkForm() {

    messege.style.display = 'block';
    var selectedDate = new Date(noteDate.value);
    var now = new Date();

    if ( noteText.value === "" || noteDate.value === "" ) {
        noteText.style = "border:2px solid red; -webkit-animation: bounce 0.8s;";
        noteDate.style = "border:2px solid red; -webkit-animation: bounce 0.8s;";
        messege.innerHTML = "*אנא מלא את כל שדות הטופס.";
    } else if ( selectedDate < now ) {
        noteText.style.border = "none";
        noteDate.style.border = "2px solid red";
        noteTime.style.border = "none";
        messege.innerHTML = "*תאריך יעד למשימה לא יכול להיות בעבר.";
    } else {
        
        myId++;
        all_notes.push(noteObj(noteText.value, noteDate.value, noteTime.value, myId));
        localStorage.setItem("items", JSON.stringify(all_notes));
        document.getElementById('noteContainer').innerHTML = "";
       
        
            
            console.log(myId);
            addNew();
        

    }

}

function addNew() {

    for (i=0; i<all_notes.length; i++) {
        var selected = all_notes[i].id;
        // The note div.
        var theNote = document.createElement("DIV");
        theNote.className = "note";
        theNote.id = selected;
        // The "X" Btn.
        var x_btn = document.createElement("I");
        x_btn.classList.add("far", "fa-times-circle", "x", "remove");
        x_btn.onclick = function(){
            
            console.log(x_btn.parentElement);
            var id = x_btn.parentElement.childNodes.id;
            var NewId = Number(id);
            console.log(NewId);
        };
        theNote.appendChild(x_btn);

        // The paragraph of the note.
        var para = document.createElement("P");
        para.className = "noteText";
        var note_text = document.createTextNode(all_notes[i].text);
        para.appendChild(note_text); 
        theNote.appendChild(para);

        // The DateAndTime span.
        var span = document.createElement("span");
        span.className = "noteDate";
        var dateIcon = document.createElement("I");
        dateIcon.classList.add("far", "fa-calendar");
        span.appendChild(dateIcon);
        var timeDate = document.createTextNode(all_notes[i].date);
        span.appendChild(timeDate);

        timeIcon = document.createElement("I");
        timeIcon.classList.add("far", "fa-clock");
        span.appendChild(timeIcon);
        var timeText = document.createTextNode(all_notes[i].time);
        span.appendChild(timeText);

        theNote.appendChild(span);
        
        // The Finall note.
        document.getElementById('noteContainer').appendChild(theNote);
        selected++;
    }
}

function main() {

    if ( all_notes.length > 0 ) {
        
        addNew();

    } else {
        document.getElementById('noteContainer').innerHTML = "אין פתקים";
    }

}
main();

// Define Variables.
var noteText = document.forms["toDoList"]["noteText"]; // TextInput.
var noteDate = document.forms["toDoList"]["noteDate"]; // DateInput.
var noteTime = document.forms["toDoList"]["noteTime"]; // TimeInput.
var saveNote = document.getElementById("saveNote"); // Submit note btn.
var clear_Form = document.getElementById("clearForm");
var messege = document.getElementById("messege"); // Succes or Error Messege.

// EventListener.
saveNote.addEventListener("click", checkForm);
clear_Form.addEventListener("click", clearForm);

// Remove one Note only.
function del_item() {

}

// Clear the form inputs.
function clearForm() {
    noteText.value = "";
    noteDate.value = "";
    noteTime.value = "";

    messege.innerHTML = 'הטופס הוסר בהצלחה.';
    setTimeout(function(){
        messege.style.display = 'none';
    }, 1000); return false;
}

// Clear all the notes from localStorage.
function clearStorage() {
    localStorage.clear();
    location.reload();
}

console.log(all_notes);