const addBtn = document.getElementById('addBtn')
const inputContent = document.getElementById('inputContent')
const myList = document.querySelector('.todoList')
const message = document.getElementById('message')
const checkbox = document.querySelector("input[name=checkbox]")
const taskCount = document.getElementById("taskCounter")
const taskDone = document.querySelector('.td')
const editBtn = document.querySelector('.editBtn')
const errorMsg = document.querySelector('.errorMessage')
const taskTask = document.querySelector('.taskToDo')

let todoListFromLocalStorage = JSON.parse(localStorage.getItem('todoList'))
let counterFromLocalStorage = JSON.parse(localStorage.getItem('taskCounter'))

let todoList = []

function renderTask(){
    let tasks = ``
    for(let i = 0; i < todoList.length; i++){
        tasks += 
            `   <div class="myListContent">
                    <li class="taskToDo">
                        <p class="td">${todoList[i]}</p>
                    </li>
                </div>
            `
    }
    myList.innerHTML = tasks
}

function countTask(){
    let count = 0
    for (let i =0; i < todoList.length; i++){
        count += 1
    }
    taskCount.textContent = " " + count
    localStorage.setItem("taskCounter", JSON.stringify(count))
}

// 

addBtn.addEventListener('click', function(){
    if(todoList.includes(inputContent.value)){
        inputContent.value = ''
        errorMsg.textContent = "You can't add the same task twice"
        errorMsg.classList.add('is-visible')
        errorMsg.classList.remove('taskRemove')
        } 
        else {
            todoList.push(inputContent.value)
    }
    renderTask()
    inputContent.value = ''
    localStorage.setItem("todoList", JSON.stringify(todoList))
    disabledAddBtn()
    countTask()
    }
)

localStorage.getItem('todoList')
function disabledAddBtn(){
    if(inputContent.value === ""){
        addBtn.disabled = true
    } else{
        addBtn.disabled = false
    }
}

inputContent.addEventListener('input', function(){
    if(inputContent.value === ""){
        addBtn.disabled = true
    } else{
        addBtn.disabled = false
    }
}
)

document.addEventListener('dblclick', function(e){
    if (e.target.className == 'td'){
        e.target.parentNode.remove()
        todoList.pop()
        errorMsg.textContent = "Task has been removed"   
        errorMsg.classList.add('is-visible')
        errorMsg.classList.add('taskRemove') 
        localStorage.setItem("todoList", JSON.stringify(todoList))
    }
})

document.addEventListener('click', function(e){
    if(e.target.className == 'td'){
        e.target.parentNode.classList.toggle('task_click')
        localStorage.setItem('taskDone', 'true')
    }

    if(e.target.className == 'errorMessage is-visible'){
        e.target.classList.remove('is-visible')
    }

    if(e.target.className == 'errorMessage is-visible taskRemove'){
        e.target.classList.remove('is-visible')
        e.target.classList.remove('taskRemove')
}})


if(todoListFromLocalStorage){
    todoList = todoListFromLocalStorage
    renderTask()
}