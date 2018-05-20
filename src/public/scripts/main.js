

/****************************************************** */
//GET ENTRIES
/****************************************************** */

/**Creating a CadView */
function createElementCards(elementId, entryID, title, content, createdAt, createdBy){
    var entries_container = document.getElementById(elementId);

    //Containers
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
    let creAt = "Created at: " + createdAt;
    let smallAtText = document.createTextNode(creAt);
    smallAt.appendChild(smallAtText);
    contentBetweenDiv.appendChild(smallAt);

    //Entry Id
    let entry_id = document.createElement("SMALL");
    let entrId = "Entry id: " + entryID;
    let entryText = document.createTextNode(entrId);
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
    let creBy = "Created by: " + createdBy;
    let smallByText = document.createTextNode(creBy);
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
      deleteEntry(entryID);
      evt.preventDefault();
    });   

}

var text = "It is also worth noting that you can directly" +
"chain multiple promise blocks (.then() blocks, but there " +
"are other types too) onto the end of one another, passing the" + 
"result of each block to the next block as you travel down the chain." + 
"This makes promises very powerful."

createCommentCards("commentId", "entryId", text, "createdBy", "createdAt");
createCommentCards("commentId", "entryId", text, "createdBy", "createdAt");
createCommentCards("commentId", "entryId", text, "createdBy", "createdAt");

//Comment Container..
function createCommentCards(commentId, entryId, comment, createdBy, createdAt){

    //Containers
    let commentContainer = document.getElementById("comment_container");

    let commentCard = document.createElement("DIV");
    commentCard.setAttribute("class", "card comment-card");
    commentCard.setAttribute("id", "comment_card");

    let commentBody = document.createElement("DIV");
    commentBody.setAttribute("class", "card-body comment-body");
    commentBody.setAttribute("id", "comment_body");
    commentCard.appendChild(commentBody);

    var commentDetail = document.createElement("DIV");
    commentDetail.setAttribute("class", "comment-detail");
    commentDetail.setAttribute("id", "comment_detail");
    commentBody.appendChild(commentDetail);


    // Comment
    let smallcomment = document.createElement("P");
    smallcomment.setAttribute("id", "comment");
    smallcomment.setAttribute("class", "mb-1");
    let smallComText = document.createTextNode(comment);
    smallcomment.appendChild(smallComText);
    commentBody.appendChild(smallcomment);
    commentContainer.appendChild(commentCard);  

    //Comment Id
    let comment_id = document.createElement("SMALL");
    comment_id.setAttribute("id", "comment_id");
    let commIdText = document.createTextNode(commentId);
    comment_id.appendChild(commIdText);
    commentDetail.appendChild(comment_id);

    //Entry Id
    let entry_id = document.createElement("SMALL");
    entry_id.setAttribute("id", "comment_entry_id");
    let entryText = document.createTextNode(entryId);
    entry_id.appendChild(entryText);
    commentDetail.appendChild(entry_id);

    //Created by
    let smallBy = document.createElement("SMALL");
    smallBy.setAttribute("id", "comment_created_by");
    let smallByText = document.createTextNode(createdBy);
    smallBy.appendChild(smallByText);
    commentDetail.appendChild(smallBy);
    
    //Created at
    let smallAt = document.createElement("SMALL");
    smallAt.setAttribute("id", "comment_created_at");
    let smallAtText = document.createTextNode(createdAt);
    smallAt.appendChild(smallAtText);
    commentDetail.appendChild(smallAt);


}

function populateComments(createdBy, entryId){
  fetch()
}

 /************************************************************ */
/**SELECT all Entries *********************************************/
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
            resurse.createdBy
        );    
    }    
  }
  getAllEntries();


  /************************************************************ */
  /**SELECT a single entry **************************************/
    async function getSingleEntry(id) {
      const response = await fetch('api/entries/' + id);
      const { data } = await response.json();
      var date = data.createdAt.split(" ");
      getOnlyOneEntry(data.entryID, data.title, date[0], data.content, data.createdBy);
    
  }  
  
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

async function getSingleEntry(id) {
  const response = await fetch('api/entries/' + id);
  const { data } = await response.json();
  var date = data.createdAt.split(" ");
  getOnlyOneEntry(data.entryID, data.title, date[0], data.content, data.createdBy);

}  

/************************************************************ */
  /**DELETE a Entry ******************************************/
  async function deleteEntry(id){
    console.log(id);
    let url = "api/entry/" + id;
    console.log(url);
    fetch(url, {
      method: 'delete'
    }).then(r => r.json());

    window.location.reload(false);   
    
  }

  /************************************************************ */
  /**CREATE ENTRY ***********************************************/
  function insertNewEntry() {

    const formData = new FormData();
    let title = document.getElementById("entry_title").value;
    formData.append('title', title);
    let entryContent = document.getElementById("content_entry").value;
    formData.append('content', entryContent);
    let entryCreatedBy = document.getElementById("entry_created_by").value;
    formData.append('createdBy', entryCreatedBy);
    let entryDate = document.getElementById("entry_created_at").value;
    formData.append('createdAt', entryDate);

    const postOptions = {
      method: 'POST',
      body: formData,
      credentials: 'include'
    }
  
    fetch('api/entry', postOptions)
    .then(res => res.json())
    .then((newEntry) => {
      document.body.insertAdjacentHTML('title', newEntry.data.title);
      document.body.insertAdjacentHTML('content', newEntry.data.content);
      document.body.insertAdjacentHTML('createdBy', newEntry.data.createdBy);
      document.body.insertAdjacentHTML('createdAt', newEntry.data.createdAt);
  });  
} 

    var saveBtn = document.getElementById("saveEntry");
    saveBtn.addEventListener("click", function(evt){
      console.log("SAVED");  
      evt.preventDefault();
      insertNewEntry();
      window.location.reload(false);   
    });

    /************************************************************ */
  /**UPDATE ENTRY ***********************************************/

  function updateEntry() {
        
    const formData = new FormData();
    let updateEntryId = document.getElementById("update_entry_id").value;
    formData.append('entryID', updateEntryId);
    let title = document.getElementById("entry_title").value;
    formData.append('title', title);
    let entryContent = document.getElementById("content_entry").value;
    formData.append('content', entryContent);
    let entryCreatedBy = document.getElementById("entry_created_by").value;
    formData.append('createdBy', entryCreatedBy);
    let entryDate = document.getElementById("entry_created_at").value;
    formData.append('createdAt', entryDate);

    console.log(updateEntryId, title, entryContent, entryCreatedBy, entryDate);
    
    let url = "api/entry/" + updateEntryId;
    fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'PATCH',                                                              
      body: JSON.stringify({
        'title': title,
        'content': entryContent,
        'createdBy': entryCreatedBy,
        'createdAt': entryDate} )                                        
    })

  }

  var updateBtn = document.getElementById("updateEntry");
  updateBtn.addEventListener("click", function(evt){
      console.log("UPDATED");  
      evt.preventDefault();
      updateEntry();
      window.location.reload(false);   
    });

  


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
  

  

