

/****************************************************** */
//GET ENTRIES
/****************************************************** */

/**Creating a CadView */
function createElementCards(entryID, title, content, createdAt, createdBy){
    var entries_container = document.getElementById("container");
    
    var listGroupDiv = document.createElement("DIV");
    listGroupDiv.setAttribute("class", "list-group");    
    entries_container.appendChild(listGroupDiv);

    let a = document.createElement("A");
    a.setAttribute("class", "list-group-item card-content flex-column align-items-start");
    a.setAttribute("href", "#");
    listGroupDiv.appendChild(a);

    let contentBetweenDiv = document.createElement("DIV");
    contentBetweenDiv.setAttribute("class", "d-flex w-100 justify-content-between");
    a.appendChild(contentBetweenDiv);

    let h3 = document.createElement("H3");
    h3.setAttribute("class", "mb-1");
    let h3Text  = document.createTextNode(title);
    h3.appendChild(h3Text);
    contentBetweenDiv.appendChild(h3);

    let smallAt = document.createElement("SMALL");
    let smallAtText = document.createTextNode(createdAt);
    smallAt.appendChild(smallAtText);
    contentBetweenDiv.appendChild(smallAt);

    let p = document.createElement("P");
    p.setAttribute("class", "mb-1");
    let pText = document.createTextNode(content);
    p.appendChild(pText);
    a.appendChild(p);
    let smallBy = document.createElement("SMALL");
    let smallByText = document.createTextNode(createdBy);
    smallBy.appendChild(smallByText);
    a.appendChild(smallBy);

}

/**Get all Entries */
  async function getAllEntries() {
    const response = await fetch('api/entries');
    const { data } = await response.json();
    
    console.log(date)
    for (const resurse of data) {
        var date = resurse.createdAt.split(" ");
        createElementCards(
            resurse.entryID,
            resurse.title,
            resurse.content,
            date[0],
            "Created by id:" + resurse.createdBy
        );    
    }    
  }
  getAllEntries();


  var onlyOneBtn = document.getElementById("oneBtn");
    onlyOneBtn.addEventListener("click", function(){
       main(1);
})

/**Get only one entry */
async function main(amount) {
    const response = await fetch('api/entries/' + amount);
    const { data } = await response.json();

    createElementCards(data.entryID, data.title, data.content, data.createdBy, data.createdAt);
    // console.log("*********************************");
    // console.log("entryID: " + data.entryID);
    // console.log("Title: " + data.title);
    // console.log("Content: " + data.content);
    // console.log("Created by: " + data.createdBy);
    // console.log("Created at: " + data.createdAt);
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
  

