
/****************************************************** */
//REGISTER
/****************************************************** */
var register_button = document.getElementById("register");
var register_form = document.getElementById("register_form");
register_form.classList.remove("visible");

//Function do make visible register form..
register_button.addEventListener("click", function(){
    console.log("TESTANDO:::");
    register_form.classList.remove("hidden");
    register_form.setAttribute("class", "visible");
});

var logout = document.getElementById("logout");
logout.addEventListener("click", function(){
    console.log("LOGOUT..");
    
});

/****************************************************** */
//GET ALL LAST 20 ENTRIES
/****************************************************** */

var entries_container = document.getElementById("entries_container");
const get

function getAllEntries(){
    fetch('api/entries')
      .then(res => res.json())
      .then(console.log);
  }

  getAllEntries();


async function main() {
    const response = await fetch('api/todos/1');
    const { data } = await response.json();
    console.log(data);
  }
  
//   main();

function main(){
    fetch('api/todos/1')
      .then(res => res.json())
      .then(console.log);
  }
  
  function getAllUsers(){
    fetch('api/users')
      .then(res => res.json())
      .then(console.log);
  }
  
  function postTodo(){
    // x-www-form-urlencoded
    const formData = new FormData();
    const todoInput = document.getElementById('todoInput');
    formData.append('content', todoInput.value);
  
    const postOptions = {
      method: 'POST',
      body: formData,
      //VERY IMPORTANT
      credentials: 'include'
    }
  
    fetch('api/todos', postOptions)
      .then(res => res.json())
      .then((newTodo) => {
          document.body.insertAdjacentHTML('beforeend', newTodo.data.content);
      });
  }
  
  
//   function login(){
//     const formData = new FormData();
//     formData.append('username', 'goran');
//     formData.append('password', 'bunneltan');
//     const postOptions = {
//       method: 'POST',
//       body: formData,
//       //VERY IMPORTANT
//       credentials: 'include'
//     }
  
//     fetch('/login', postOptions)
//       .then(res => res.json())
//       .then(console.log);
//   }
  
//   login();
  
  
//   const addTodoButton = document.getElementById('addTodo');
//   addTodoButton.addEventListener('click', postTodo);
  

