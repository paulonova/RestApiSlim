

/****************************************************** */
//GET ENTRIES
/****************************************************** */

/**Creating a CadView */
function createElementCards(elementId, entryID, title, content, createdAt, createdBy){
    var entries_container = document.getElementById(elementId);
    
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

    let delBtn = document.createElement("BUTTON");
    delBtn.setAttribute("class", "btn btn-success");
    let delText = document.createTextNode("Delete");
    delBtn.appendChild(delText);
    a.appendChild(delBtn);

}

/**Get all Entries */
  async function getAllEntries() {
    const response = await fetch('api/entries');
    const { data } = await response.json();
    
    console.log(date)
    for (const resurse of data) {
        var date = resurse.createdAt.split(" ");
        createElementCards(
            "container",
            resurse.entryID,
            resurse.title,
            resurse.content,
            date[0],
            "Created by id:" + resurse.createdBy
        );    
    }    
  }
  getAllEntries();


  /** Button to get only one Entry*/
  var onlyOneBtn = document.getElementById("oneBtn");
    onlyOneBtn.addEventListener("click", function(){
        var container = document.getElementById("only_one");
        // container.removeChild();
        let entryID = document.getElementById("getOnlyOne").value;        
        main(entryID + 1);
})

/**Get only one entry */
async function main(entryID) {
    const response = await fetch('api/entries/' + entryID);
    const { data } = await response.json();
    var date = data.createdAt;
    date.split(" ");
    createElementCards("only_one", data.entryID, data.title, data.content, date[0], data.createdBy);
    
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
  

