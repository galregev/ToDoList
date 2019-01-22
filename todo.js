// Global Array.
var all_notes = [];
var myId = 0; 

// Create a new Object.
function noteObj(text, date, time) {
    var notes = {
        text : text,
        date : date,
        time : time,
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
        
        all_notes.push(noteObj(noteText.value, noteDate.value, noteTime.value));
        localStorage.setItem("items", JSON.stringify(all_notes));
        document.getElementById('noteContainer').innerHTML = "";
       
        
            
            
            addNew();
        

    }

}

function addNew() {

    for (i=0; i<all_notes.length; i++) {
        // The note div.
        var theNote = document.createElement("DIV");
        theNote.classList.add("note");
        theNote.id = i;
        theNote.style.display = 'inline-block';
        setTimeout(function() {
            theNote.className = theNote.className + " fadein";
          }, 10);

        // The "X" Btn.
        var x_btn = document.createElement("I");
        x_btn.classList.add("far", "fa-times-circle", "x", "remove");
        x_btn.setAttribute ("onclick","del_item(this.parentNode.id)");
        theNote.appendChild(x_btn);

        //input (text)
        var editInput = document.createElement("input"); // text
        editInput.className = "editIn";
        editInput.setAttribute("type", "text");
        editInput.setAttribute("value", "הזן טקסט לעריכה");
        
        //button.edit
        var editButton = document.createElement("button");

        //Each element needs modifying.
        editButton.innerText = "עריכה";
        editButton.className = "editable";
        editButton.onclick = editTask;

        // The paragraph of the note.
        var para = document.createElement("P");
        para.innerText = all_notes[i].text;
        para.classList.add("noteText");
        para.onclick = openEdit;
        //var note_text = document.createTextNode(all_notes[i].text);

        //para.appendChild(note_text); 
        theNote.appendChild(editButton);
        theNote.appendChild(editInput);
        theNote.appendChild(para);

        // EditMode.
        function openEdit() {
            
            // Define the ModelBox.
            editButton.style.display = "block";
            editInput.style.display = "block";

        }

        // Edit Mession.
        function editTask() {
            console.log("Edit task...");
            
            var listItem = this.parentNode;
            listItem.classList.add("editMode");
            var editInput = listItem.querySelector("input[type=text]");
            editInput.style.display = "block";
            var p = listItem.querySelector("p");
                
            var containsClass = listItem.classList.contains("editMode");
                
            //if the class of the parent is .editMode
            if(containsClass) {
            //P text become the input's value
                p.innerHTML = editInput.value;
                console.log(listItem.id);
                var newText = listItem.querySelector("p.noteText").innerText;
                var newTime = listItem.querySelector("label#time").innerText;
                var newDate = listItem.querySelector("span#date").innerText.substring(0,10);

                all_notes[listItem.id] = noteObj(newText, newTime, newDate);
                localStorage.setItem("items", JSON.stringify(all_notes));
            } else {
                editInput.value = p.textContent;
            }
                
        }

        // The DateAndTime span.
        var span = document.createElement("span");
        span.id = "date";
        span.className = "noteDate";
        var dateIcon = document.createElement("I");
        dateIcon.classList.add("far", "fa-calendar");
        span.appendChild(dateIcon);
        var timeDate = document.createTextNode(all_notes[i].date);
        span.appendChild(timeDate);



        // label time.
        var span2 = document.createElement("label");
        span2.id = "time";
        timeIcon = document.createElement("I");
        timeIcon.classList.add("far", "fa-clock");
        span2.appendChild(timeIcon);
        var timeText = document.createTextNode(all_notes[i].time);
        span2.appendChild(timeText);

        span.appendChild(span2);
        theNote.appendChild(span);
        
        // The Finall note.
        document.getElementById('noteContainer').appendChild(theNote);
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
function del_item(id) {
    all_notes.splice(id, 1);
        localStorage.setItem("items", JSON.stringify(all_notes));
        var note = document.getElementById(id);
        note.remove();
        setID (id);
}

function setID (id) {
    var nextID = parseInt(id) + 1;
    for (var i = nextID; i <= all_notes.length; i++) {
        var note = document.getElementById(i);
        note.id = i - 1;
    }
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
