const todoList = [
  {
    todo: 'Pray',
    dueDate: '2025-03-21',
     time: '12:22:10:pm'
  },
  {
    todo: 'Code',
    dueDate: '2025-03-21',
    time: '11:21:30:am'
  }
];


const todoDisplay = document.querySelector('.todo-display'); 
let todoParagraph = document.querySelector('.todo-paragraph');

displayTodoList();
function displayTodoList() {
let html = '';

todoList.forEach((value, index) => {
  let todoValue = value.todo;
  let todoDueDate = value.dueDate;
  let todotime = value.time;

  html += `
  <div class="todo-wrapper">
   <div class="todo-item"> ${todoValue} </div>
   <div class="todo-item"> ${todoDueDate} </div>
   <div class="todo-item"> ${todotime} </div>
    <button class="js-delete-btn delete-btn">
      ❌
    </button>
  </div>
  `;
});
todoDisplay.innerHTML = html;

deleteTodo();

};
displayTodoList();


//////////ADD TODO BUTTON////////////// 
const todoInput = document.querySelector('.js-todo-input');
const todoDateInput = document.querySelector('.js-date-input');
const todoTimeInput = document.querySelector('.js-time-input');
const addButton = document.querySelector('.js-add-btn');

// todoInput.addEventListener('keyup', ()=>{
// todoInput.value;
// })

function addTodo() {
  addButton.addEventListener('click', () => {
    let todo = todoInput.value;    
    let dueDate = todoDateInput.value;
    let time = todoTimeInput.value;
    todoList.push({todo, dueDate, time});
    displayTodoList();
  });
}
addTodo(); 

///////////DELETE TODO BUTTON///////////

function deleteTodo() {
  const deleteButton = document.querySelectorAll('.js-delete-btn');
  deleteButton.forEach((del, index) => {
    del.addEventListener('click', () => {
      todoList.splice(index, 1);
      displayTodoList();
    });
  });
};

/////////////REAL TIME//////////////////

const clockDisplay = document.querySelector('.js-clock-display');


let intervalId;
function startInterval() {
  let timeId;

intervalId = setInterval(() => {
  const date = new Date();
  let hrs = date.getHours();
  let min = date.getMinutes();
  let sec = date.getSeconds();
  let meridian = hrs >= 12 ? 'pm' : 'am'; 

  hrs = String(hrs).length === 1 ? `0${hrs}`: hrs;
  min = String(min).length === 1 ? `0${min}`: min;
  sec = String(sec).length === 1 ? `0${sec}`: sec;

  timeId = `${hrs}:${min}:${sec}:${meridian}`;

  clockDisplay.innerHTML = ` 
    ${timeId}
  `;

  const todoTimeDisplay = document.querySelector('.js-todoTime-display');
  let todoTimeHTML = '';
  todoList.forEach((todoTime) => {
    if(timeId === todoTime.time) {
      todoTimeHTML = `
        <div class="js-todoTime-alert">
        <p> It's todo time! 
          <button onclick="
            startInterval();
          ">Okay!</button>
        </p>

     ${stopInterval()}
        </div>
      `
    }
    todoTimeDisplay.innerHTML = todoTimeHTML;
  });
}, 1000);

}
startInterval();

function stopInterval() {
  clearInterval(intervalId);
};






/*   function displayTodoList() {
  let html = '';

  for (let i = 0; i < todoList.length; i++) {
  let todoIndex = todoList[i];
  
  html += `
  <div>
    ${todoIndex}
    <button class="js-delete-btn" onclick="
      todoList.splice(${i},1);
      displayTodoList();
      console.log(todoList)
    ">
      Delete
    </button>
  </div>
  `
}
todoDisplay.innerHTML = html;

} */
