

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

    //title
    let h3 = document.createElement("H3");
    h3.setAttribute("class", "mb-1");
    let h3Text  = document.createTextNode(title);
    h3.appendChild(h3Text);
    contentBetweenDiv.appendChild(h3);
    // Created at
    let smallAt = document.createElement("SMALL");
    let smallAtText = document.createTextNode(createdAt);
    smallAt.appendChild(smallAtText);
    contentBetweenDiv.appendChild(smallAt);

    //Entry Id
    let entry_id = document.createElement("SMALL");
    let entryText = document.createTextNode(entryID);
    entry_id.appendChild(entryText);
    contentBetweenDiv.appendChild(entry_id);

    //Content
    let p = document.createElement("P");
    p.setAttribute("class", "mb-1");
    let pText = document.createTextNode(content);
    p.appendChild(pText);
    a.appendChild(p);

    //Created by
    let smallBy = document.createElement("SMALL");
    let smallByText = document.createTextNode(createdBy);
    smallBy.appendChild(smallByText);
    a.appendChild(smallBy);

    //Delete button
    let delBtn = document.createElement("BUTTON");
    delBtn.setAttribute("class", "btn btn-success");
    delBtn.setAttribute("id", "entryDeleteBtn");
    let delText = document.createTextNode("Delete");
    delBtn.appendChild(delText);
    a.appendChild(delBtn);

    delBtn.addEventListener("click", function(evt){
      console.log("EntryID: " + entryID);
      evt.preventDefault();
    })

    //Textarea to comments

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
            "Entry id: " + resurse.entryID,
            resurse.title,
            resurse.content,
            date[0],
            "Created by id:" + resurse.createdBy
        );    
    }    
  }
  getAllEntries();


  /************************************************************ */
  /**This function get a single entry and populate the html *****/
    async function getSingleEntry(id) {
      const response = await fetch('api/entries/' + id);
      const { data } = await response.json();
      var date = data.createdAt.split(" ");
      // seOnlyOneEntry(data.entryID, data.title, data.content, date[0], data.createdBy);
      getOnlyOneEntry(data.entryID, data.title, date[0], data.content, data.createdBy);
    
  }  
  
  /************************************************************ */
  /**This function populate a Card in html with onnly one entry */
  function getOnlyOneEntry(entryID, title, date, content, createdBy){  
    var container = document.getElementById("only_one");
    container.removeAttribute("class", "hidden");    
    document.getElementById("entry_title").innerHTML=title;
    document.getElementById("entry_date").innerHTML=date;
    document.getElementById("entry_id").innerHTML="Entry id: " + entryID;
    document.getElementById("entry_content").innerHTML=content;
    document.getElementById("created_by").innerHTML="Created by id:" + createdBy;    

  }

  /**Button to hidde the single Entry */
  var hiddeOne = document.getElementById("hidde_one");
    hiddeOne.addEventListener("click", function(evt){
      var container = document.getElementById("only_one");
      container.setAttribute("class", "hidden");
      evt.preventDefault();
    });
  


  /************************************************************ */
  /**This button get a single entry by id number ****************/
  var onlyOneBtn = document.getElementById("oneBtn");
  onlyOneBtn.addEventListener("click", function(evt){
        var container = document.getElementById("only_one");
        let entryID = document.getElementById("getOnlyOne").value; 
        if(entryID > 0){
          getSingleEntry(entryID);
        } else{
          alert("Can´t be ZERO, try a higher number");
        }     
        evt.preventDefault();
})


  function deleteOne(id){
    
  }


  /****************************************************************************************** */

  
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
  

  

