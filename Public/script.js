window.onload = async function () {
    const resp = await fetch('/todos', { method: 'GET' })
    const todos = await resp.json()
    todos.forEach(element => {
        this.GetAllTodos(element)
    });

}

function GetAllTodos(element) {
    var list = document.getElementById("taskList")

    var dueDate = document.createElement("SPAN")
    dueDate.className = "badge badge-light badge-pill";
    dueDate.textContent = element.dueDate.split('T')[0]
    var li = document.createElement("li")
    if (element.priority == "Low") {
        li.className = "list-group-item d-flex justify-content-between align-items-center"
    }
    else if (element.priority == "Medium") {
        li.className = "list-group-item d-flex justify-content-between align-items-center bg-warning"
    }
    else if (element.priority == "High") {
        li.className = "list-group-item d-flex justify-content-between align-items-center bg-danger"
    }
    li.textContent = element.title
    li.appendChild(dueDate)
    li.addEventListener("click",function(){
        GetElementID(element)
    })
    list.appendChild(li)


}
var addDiv = false;
function ShowAddDiv() {
    console.log(addDiv)
    if (!addDiv) {
        console.log("inside")
        document.getElementById("addTaskDiv").style.display = "block"
        addDiv = true
        document.getElementById("taskList").style.opacity = "20%";
        document.getElementById("taskList").style.pointerEvents = "none";
        document.getElementById("nav").style.opacity = "20%";
        document.getElementById("nav").style.pointerEvents = "none";
        return
    }
    if (addDiv) {
        console.log("inside1")
        document.getElementById("addTaskDiv").style.display = "none"
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
        body: JSON.stringify({ title:title,description:description,dueDate:duedate,status:status,priority:priority })
    })
    const todos = await resp.json()
    GetAllTodos(todos.data)

}


function GetElementID(element){
    console.log(element)
}