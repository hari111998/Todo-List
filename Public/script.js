window.onload = async function() {

    const resp = await fetch('/todos', { method: 'GET' })
    const todos = await resp.json()
    if (todos.length == 0) {
        return
    }
    todos.forEach(element => {
        this.GetAllTodos(element)
    });
}
var id

function GetAllTodos(element) {

    var list = document.getElementById("taskList")
    var description = document.createElement("td")
    description.textContent = element.description

    var dueDate = document.createElement("td")
    if(element.dueDate!=null){
        dueDate.textContent = element.dueDate.split('T')[0]
    }

    var title = document.createElement("th")
    title.scope = "row"
    title.textContent = element.title

    var status = document.createElement("td")
    status.textContent = element.status

    var priority = document.createElement("td")
    priority.textContent = element.priority

    var edit = document.createElement("span")
    edit.className = "fas fa-edit"
    edit.addEventListener("click", function() {
        EditElement(element)
    })

    var addNote = document.createElement("span")
    addNote.className = "fas fa-plus"
    addNote.addEventListener("click", function() {
        AddNote(element.id)
    })
    var viewNotes = document.createElement("span")
    viewNotes.className = "fas fa-sticky-note"

    var action = document.createElement("td")
    action.appendChild(edit)
    action.appendChild(addNote)
    action.appendChild(viewNotes)
    action.style.display = "flex"
    action.style.flexDirection = "row"
    action.style.justifyContent = "space-between"
    var tr = document.createElement("tr")
    if (element.status == "Completed") {
        tr.className = "table-success"
        tr.style.pointerEvents="none"
    }
    else
    if (element.priority == "Low") {
        tr.className = "table-primary"

    } else if (element.priority == "Medium") {
        tr.className = "table-warning"
    } else if (element.priority == "High") {
        tr.className = "table-danger"
    }
    tr.appendChild(title)
    tr.appendChild(description)
    tr.appendChild(status)
    tr.appendChild(priority)
    tr.appendChild(dueDate)
    tr.appendChild(action)
    list.appendChild(tr)


}
var addDiv = false;

function ShowDiv(div) {
    if (!addDiv) {
        document.getElementById(div).style.display = "block"
        addDiv = true
        document.getElementById("taskList").style.opacity = "20%";
        document.getElementById("taskList").style.pointerEvents = "none";
        document.getElementById("nav").style.opacity = "20%";
        document.getElementById("nav").style.pointerEvents = "none";
        return
    }
    if (addDiv) {
        document.getElementById(div).style.display = "none"
        document.getElementById("taskList").style.opacity = "100%";
        document.getElementById("taskList").style.pointerEvents = "auto";
        document.getElementById("nav").style.opacity = "100%";
        document.getElementById("nav").style.pointerEvents = "auto";
        addDiv = false
        return
    }
}


async function AddNewItem() {
    var title = document.getElementById("taskTitle").value;
    var description = document.getElementById("taskDescription").value;
    var duedate = document.getElementById("taskDueDate").value;
    var status = document.getElementById("taskSatus").value;
    var priority = document.getElementById("taskPriority").value;
    const resp = await fetch('/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: title, description: description, dueDate: duedate, status: status, priority: priority })
    })
    const todos = await resp.json()
    ShowDiv("addTaskDiv")
    GetAllTodos(todos.data)

}

async function EditItem() {
    var description = document.getElementById("edittaskDescription").value;
    var duedate = document.getElementById("edittaskDueDate").value;
    var status = document.getElementById("edittaskStatus").value;
    var priority = document.getElementById("edittaskPriority").value;
    url = '/todos/' + id
    console.log(url)
    const resp = await fetch(url, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ description: description, dueDate: duedate, status: status, priority: priority })
    }).catch((err) => {
        console.error('err', err);
    })
    
}

function EditElement(element) {
    ShowDiv('editTaskDiv');
    document.getElementById("edittaskTitle").value = element.title
    document.getElementById("edittaskDescription").value = element.description
    if(element.dueDate!=null){
        document.getElementById("edittaskDueDate").value = element.dueDate.split('T')[0]
    }
    document.getElementById("edittaskStatus").value = element.status.toString()
    document.getElementById("edittaskPriority").value = element.priority
    id = element.id
}
function AddNote(elementId) {
    ShowDiv('addNoteTaskDiv');
    id = elementId
}

async function AddNoteTask(){
    var noteValue = document.getElementById("noteTask").value
    console.log(noteValue)
    var url = '/todos/'+id+'/notes'
    console.log(url)
    const resp = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ note:noteValue })
    })
    const note = await resp.json()

    if(note.success=="New note added"){
        alert("Note Added Successfully")
    }
    ShowDiv("addNoteTaskDiv")
}


function SortSatus() {
    var todos = document.getElementById("taskList");
    todos.sort((a, b) => (a.status > b.status) ? 1 : -1)
}



function sortTable(column) {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("list");
    switching = true;
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
      // Start by saying: no switching is done:
      switching = false;
      rows = table.rows;
      /* Loop through all table rows (except the
      first, which contains table headers): */
      for (i = 1; i < (rows.length - 1); i++) {
        // Start by saying there should be no switching:
        shouldSwitch = false;
        /* Get the two elements you want to compare,
        one from current row and one from the next: */
        x = rows[i].getElementsByTagName("TD")[column];
        y = rows[i + 1].getElementsByTagName("TD")[column];
        // Check if the two rows should switch place:
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark that a switch has been done: */
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
  }