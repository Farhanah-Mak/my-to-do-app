const addBtn= document.querySelector('.add')
const popUp= document.querySelector('.pop-up')
const app= document.querySelector('.app')
const form= document.getElementById('form')
const inputText= document.getElementById('input-text')
const inputDate= document.getElementById('input-date')
const inputDescr= document.getElementById('input-descr')
const tasks= document.querySelector('.tasks')
const submit= document.getElementById('submit')
const close= document.querySelector('.done-btn')
const msg= document.querySelector('.msg')

addBtn.addEventListener('click',()=>{
    addPopUp()

})

close.addEventListener('click', ()=>{
    closePopUp()
})

form.addEventListener('submit',(e)=>{
    e.preventDefault()
    formValidation()
})

let formValidation=()=>{
    if(inputText.value === ''){
        msg.innerHTML= `Task cannot be empty`
    }
    else{
        msg.innerHTML= ''
        console.log('success')
        enterTask()
        closePopUp()
        submit.click()
        (()=>{
            closePopUp()
        })
    }
}

let taskList= [{}]

let enterTask=()=>{
    taskList.push({
        taskName: inputText.value,
        date: inputDate.value,
        description: inputDescr.value
    })
    localStorage.setItem('data', JSON.stringify(taskList))
    createTask()
   
}
let createTask=()=>{
    tasks.innerHTML= ''
    taskList.map((x,y)=>{
        return( 
            tasks.innerHTML += `
                <div id=${y}>
                    <h4>${x.taskName}</h4>
                    <p class="date">${x.date}</p>
                    <p>${x.description}</p>
                    <span class="options">
                        <i onClick="deleteTask(this)"class="fa-regular fa-trash"></i>
                        <i onClick="updateTask(this)" class="fa-regular fa-pen-to-square"></i>
                    </span>
            </div>
    
    `
        )
    })
    
    resetForm()
}


   

let resetForm=()=>{
    inputText.value= ''
    inputDate.value= ''
    inputDescr.value= ''
}

let deleteTask=(e)=>{
    e.parentElement.parentElement.remove()
    taskList.splice( e.parentElement.parentElement.id, 1)
    localStorage.setItem('data', JSON.stringify(taskList))
}
let updateTask=(e)=>{
    addPopUp()
    let selectedTask= e.parentElement.parentElement
    // console.log(selectedTask)
    inputText.value= selectedTask.children[0].innerHTML
    inputDate.value= selectedTask.children[1].innerHTML
    inputDescr.value= selectedTask.children[2].innerHTML
    deleteTask(e)
}
let closePopUp=()=>{
    app.classList.remove('active')
    popUp.classList.remove('active')
}
let addPopUp=()=>{
    app.classList.add('active')
    popUp.classList.add('active')
}
(()=>{
    taskList= JSON.parse(localStorage.getItem('data')) || []
    console.log(taskList)
    createTask()
})()