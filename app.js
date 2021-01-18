document.body.style.backgroundColor='pink';
// Defining the UI variables 

const form = document.querySelector('#task-form')
const taskInput = document.querySelector('#task')
const taskList = document.querySelector('.collection');
const clrbtn = document.querySelector('.clear-tasks')
const filter = document.querySelector('#filter');

// Load all event listeners
loadEventListeners();
  
// Create the function
function loadEventListeners(){
    // DOM load event
    document.addEventListener('DOMContentLoaded',getTasks);
    //  Add task event
    form.addEventListener('submit',addTask);
    // Remove task event
    taskList.addEventListener('click',removeTask);
    // Clear task event
    clrbtn.addEventListener('click',clearTasks);
    // Filter tasks event
    filter.addEventListener('keyup',filterTasks);
}

//  Get tasks from Local Storage
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task){
       // Create li(list) element
    const li = document.createElement('li');    
    // Add a class
    li.className='collection-item';
    // Create a text node and append to li
    li.appendChild(document.createTextNode(task));
    // Create new link element
    const link = document.createElement('a');
    // Add link
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append link to li
    li.appendChild(link);
    // Append li to ul
    taskList.appendChild(li);
    });
}


// addTask function

function addTask(e){
    if(taskInput.value===''){
        alert('Add a task');
    }

    // Create li(list) element
    const li = document.createElement('li');    
    // Add a class
    li.className='collection-item';
    // Create a text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new link element
    const link = document.createElement('a');
    // Add link
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append link to li
    li.appendChild(link);
    // Append li to ul
    taskList.appendChild(li);

    
    // Store in Local Storage
    storeTaskInLocalStorage(taskInput.value);

    // Clear the input
    taskInput.value='';

    e.preventDefault();
}

// Store task
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Task

function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
       if(confirm('Are You Sure')){
        e.target.parentElement.parentElement.remove();

        //  Remove from Local Storage
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
       }        
    }
}

// Remove from local storage
   function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks',JSON.stringify(tasks));
   }

// Clear Tasks
function clearTasks(){
//   taskList.innerHTML='';
       
// Faster method through looping
      while(taskList.firstChild){
          taskList.removeChild(taskList.firstChild);
      }
    // CLear from local storage
    clearTasksFromLocalStorage();
}

// Clear from local storage
function clearTasksFromLocalStorage(){
    localStorage.clear();
}

// Filter Tasks
function filterTasks(e){
       const text = e.target.value.toLowerCase();
       
       document.querySelectorAll('.collection-item').forEach
       (function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        } else{
            task.style.display = 'none';
        }
       });
} 