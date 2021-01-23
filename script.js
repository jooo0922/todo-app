'use strict';

const form = document.getElementById('form');
const input = document.getElementById('input');
const todosUl = document.getElementById('todos');

const todos = JSON.parse(localStorage.getItem('todos'));

if (todos) {
  todos.forEach(todo => {
    addTodo(todo);
  });
}

// The submit event fires when a <form> is submitted.
// 여기서는 input에 값을 입력하고 enter 치는 행위 자체가 submit을 발생시킴.
form.addEventListener('submit', (e) => {
  e.preventDefault(); 
  // submit event는 항상 서버로 form을 제출하려는 default behavior가 있음.
  // 이게 남아있으면 이벤트가 호출하는 콜백함수를 수행할 수 없음. 그래서 preventDefault()로 없애준 거.

  addTodo();
});

function addTodo(todo){
  let todoText = input.value;

  if (todo) {
    todoText = todo.text;
  }

  if (todoText) { 
    const todoEl = document.createElement('li');

    // todo 자체를 가지고 있지 않으면 todo.completed는 undefined라 판단이 안됨.
    // 그래서 todo 자체가 있는지 없는지를 먼저 판단하고 없으면 뒤의 조건문은 연산을 안한 채로 그냥 if 블록을 건너뜀.
    // && 연산자는 앞의 조건문이 false면 뒤에는 아예 처리를 안하니까.
    if (todo && todo.completed) { 
      todoEl.classList.add('completed');
    }

    todoEl.innerText = todoText;

    todoEl.addEventListener('click', () => {
      todoEl.classList.toggle('completed');

      updateLS();
    });

    /**
     * contextmenu event
     * 
     * contextmenu event 는 사용자가 context menu(마우스 우클릭 아무데나 하면 뜨는 메뉴창 말하는거)를 열려고 할 때 발생함.
     * 이거는 마우스 우클릭 또는 context menu key를 누를 때 발생하겠죠.
     * 
     * 근데 중요한 건, 이거를 그냥 '마우스 우클릭 이벤트로써만' 받고 싶다면,
     * 해당 이벤트에 preventDefault()를 걸면 context menu는 안뜨고 마우스 우클릭 이벤트로써만 작동함.
     */
    todoEl.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      todoEl.remove();

      updateLS();
    });

    todosUl.appendChild(todoEl);

    input.value = '';

    updateLS();
  }
}

// 입력받은 값들을 local에도 crud 할 수 있게 해주는 함수는 이런식으로 만듦. 구조를 잘 익혀두도록.
function updateLS(){
  const todosEl = document.querySelectorAll('li');

  const todos = [];

  todosEl.forEach(todoEl => {
    todos.push({
      text: todoEl.innerText,
      completed: todoEl.classList.contains('completed')
    });
  });

  localStorage.setItem('todos', JSON.stringify(todos));
}