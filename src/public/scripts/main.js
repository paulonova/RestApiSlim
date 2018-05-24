
/****************************************************** */
//UTILITIES
/****************************************************** */

function errorMessage(msg, element){

    document.getElementById(element).innerHTML = msg;

}



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
    // a.setAttribute("href", "#");
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

    if(elementId != "getEntriesContainer"){
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

}

/**SELECT all Entries *********************************************/
async function getAllEntries() {
  const response = await fetch('api/entries');
  const { data } = await response.json();
  
  for (const resource  of data) {
      var date = resource .createdAt.split(" ");
      createElementCards(
          "container",
          resource.entryID,
          resource.title,
          resource.content,
          date[0],
          resource.createdBy
      );    
  }    
}
getAllEntries();

/****************************************************** */
//GET COMMENTS
/****************************************************** */


function createCommentCards(element, commentId, entryId, comment, createdBy, createdAt){

  //Containers
  let commentContainer = document.getElementById(element);

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
  let commIdText = document.createTextNode("Comment Id: " + commentId);
  comment_id.appendChild(commIdText);
  commentDetail.appendChild(comment_id);

  //Entry Id
  let entry_id = document.createElement("SMALL");
  entry_id.setAttribute("id", "comment_entry_id");
  let entryText = document.createTextNode("Entry id: " + entryId);
  entry_id.appendChild(entryText);
  commentDetail.appendChild(entry_id);

  //Created by
  let smallBy = document.createElement("SMALL");
  smallBy.setAttribute("id", "comment_created_by");
  let smallByText = document.createTextNode("Created by: " + createdBy);
  smallBy.appendChild(smallByText);
  commentDetail.appendChild(smallBy);
  
  //Created at
  let smallAt = document.createElement("SMALL");
  smallAt.setAttribute("id", "comment_created_at");
  let smallAtText = document.createTextNode("Created at: " + createdAt);
  smallAt.appendChild(smallAtText);
  commentDetail.appendChild(smallAt);

  if(element == "comment_container"){
      //Delete button
      let delBtn = document.createElement("BUTTON");
      delBtn.setAttribute("class", "btn btn-success");
      delBtn.setAttribute("id", "commentDeleteBtn");
      let delText = document.createTextNode("Delete");
      delBtn.appendChild(delText);
      commentBody.appendChild(delBtn);

      delBtn.addEventListener("click", function(evt){
      console.log(commentId);
      deleteComment(commentId);
      evt.preventDefault();
    });   
  }
  

}


function createCommentsByCommentIDAndEntryID(element, commentId, entryId, comment, createdBy, createdAt){
    
    
    if(element == "set-comments"){

      document.getElementById("set-comments").removeAttribute("class", "hidden");
      document.getElementById("set-entryid").setAttribute("class", "hidden");
      document.getElementById("comment_id").innerHTML="Comment id: " + commentId;
      document.getElementById("comment_entry_id").innerHTML="Entry id: " + entryId;
      document.getElementById("comment_created_by").innerHTML="Created by: " + createdBy;
      document.getElementById("comment_created_at").innerHTML="Created at: " + createdAt;
      document.getElementById("comment").innerHTML=comment;     
            
  }

    if(element == "set-entryid"){

      console.log("comment_container ..");
      document.getElementById("set-comments").setAttribute("class", "hidden");
      document.getElementById("set-entryid").removeAttribute("class", "hidden");

      createCommentCards("set-entryid", commentId, entryId, comment, createdBy, createdAt);
  }   

}


/**GET ENTRIES FROM A USER ************************/
async function getEntriesFromUser(){
  let getId = document.getElementById("getFromUser").value;
  let url = "api/entries/user/" + getId;

  const response = await fetch(url);
  const { data } = await response.json();

  if(data == ""){
    console.log("Is data: false");
    document.getElementById("getEntriesContainer").setAttribute("class", "hidden");
    document.getElementById("errorEntriesContainer").removeAttribute("class", "hidden");
    errorMessage("No Comments with this commentID.", "errorEntriesContainer");

  }else{

    console.log("Is data: true");
    for (const resource  of data) {
      var date = resource .createdAt.split(" ");
      createElementCards(
          "getEntriesContainer",
          resource.entryID,
          resource.title,
          resource.content,
          date[0],
          resource.createdBy
      );    
    } 
  }  
}

var getEntriesBtn = document.getElementById("getUserEntries");
getEntriesBtn.addEventListener("click", function(evt){
  document.getElementById("getEntriesContainer").removeAttribute("class", "hidden");
  getEntriesFromUser(); 
  evt.preventDefault();
  document.getElementById("getFromUser").value="";

})

var hiddeGetEnriesBtn = document.getElementById("hiddeGetEntries");
hiddeGetEnriesBtn.addEventListener("click", function(evt){
  evt.preventDefault();
  window.location.reload(false);

})




/************************************************************ */
/**COMMENTS BY COMMENT-ID AND COMMENTS BY ENTRY-ID************************/

async function getSingleCommandsById(){
  let getId = document.getElementById("get-commentId").value;
  let url = "api/comment/" + getId;

  const response = await fetch(url);
  const { data } = await response.json();

  if(data == ""){
    console.log("Is data: false");
    document.getElementById("set-comments").setAttribute("class", "hidden");
    document.getElementById("errorComment").removeAttribute("class", "hidden");
    errorMessage("No Comments with this commentID.", "errorComment");
  }else{
    console.log("Is data: true");
    var date = data.createdAt.split(" ");
    createCommentsByCommentIDAndEntryID(
        "set-comments", 
        data.commentID, 
        data.entryID, 
        data.content, 
        data.createdBy, 
        date[0]
      );
  }  
}


async function getCommandsByEntryId(){
  let getId = document.getElementById("get-commentId").value;
  let url = "api/comments/" + getId;

  const response = await fetch(url);
  const { data } = await response.json();  

  if(data == ""){
    console.log("Is data: false");
    document.getElementById("set-entryid").setAttribute("class", "hidden");
    document.getElementById("errorComment").removeAttribute("class", "hidden");
    errorMessage("No Comments with this entryID.", "errorComment");
  }else{
    console.log("Is data: true");
    for (let resource of data) {
      let date = resource.createdAt.split(" ");
      createCommentCards(
            "set-entryid", 
            resource.commentID, 
            resource.entryID, 
            resource.content, 
            resource.createdBy, 
           date[0]
          );
      }
  }
}

/**Button to get Comment by commentID */
var commentByIdBtn = document.getElementById("getSingleCommentBtn");
commentByIdBtn.addEventListener("click", function(evt){  
  document.getElementById("set-comments").removeAttribute("class", "hidden");    
    getSingleCommandsById();
    evt.preventDefault();
    document.getElementById("errorComment").setAttribute("class", "hidden");
    // window.location.reload(false);  
})

/**Button to get Comment by entryID */
var commentByEntryIdBtn = document.getElementById("getAllCommentsBtn");
commentByEntryIdBtn.addEventListener("click", function(evt){
    document.getElementById("set-entryid").removeAttribute("class", "hidden");  
    getCommandsByEntryId();
    evt.preventDefault();
    document.getElementById("errorComment").setAttribute("class", "hidden");
    // window.location.reload(false);  
})

/**Button to hidde all comments */
var hiddeAllComments = document.getElementById("hiddeAll");
hiddeAllComments.addEventListener("click", function(evt){    
    document.getElementById("set-comments").setAttribute("class", "hidden");
    document.getElementById("set-entryid").setAttribute("class", "hidden");
    document.getElementById("errorComment").setAttribute("class", "hidden");
    evt.preventDefault();
    window.location.reload(false);  
})



/************************************************************ */
/**DELETE COMMENTS ******************************************/
  async function deleteComment(id){
    console.log(id);
    let url = "api/comments/delete/" + id;
    console.log(url);
    fetch(url, {
      method: 'DELETE'
    }).then(r => r.json());
    window.location.reload(false);      
  }

populateComments();
async function populateComments(){

  const response = await fetch('api/comments');
  const { data } = await response.json();
  for (const resource of data){
    var date = resource.createdAt.split(" ");
    createCommentCards(
      "comment_container",
      resource.commentID,
      resource.entryID,
      resource.content,
      resource.createdBy,
      date[0]
    );    
  }
}

/****************************************************** */
//INSERT COMMENTS
/****************************************************** */

function insertNewComment() {

  const formData = new FormData();
  let content = document.getElementById("comment_area").value;
  formData.append('content', content);
  let entryID = document.getElementById("comm_entry_id").value;
  formData.append('entryID', entryID);
  let createdBy = document.getElementById("comm_created_by").value;
  formData.append('createdBy', createdBy);
  let createdAt = document.getElementById("comm_created_at").value;
  formData.append('createdAt', createdAt);

  const postOptions = {
    method: 'POST',
    body: formData,
    credentials: 'include'
  }

  fetch('api/comments', postOptions)
  .then(res => res.json())
  .then((newComment) => {
    document.body.insertAdjacentHTML('content', newComment.data.content     );
    document.body.insertAdjacentHTML('entryID', newComment.data.entryID     );
    document.body.insertAdjacentHTML('createdBy', newComment.data.createdBy );
    document.body.insertAdjacentHTML('createdAt', newComment.data.createdAt );
});  

}

/**Button to save comment */
var saveComment = document.getElementById("saveComment");
saveComment.addEventListener("click", function(evt){  
  insertNewComment();
  evt.preventDefault();
  window.location.reload(false);   
});


  /************************************************************************* */
  /**SEARCH FOR ENTRIES BY TITLE *********************************************/

    /**This function populate a Card in html with onnly one entry */
  function getentryByTitle(entryID, title, date, content, createdBy){  
    var container = document.getElementById("search-container");
    container.removeAttribute("class", "hidden");    
    document.getElementById("search-title").innerHTML=title;
    document.getElementById("search-entry-date").innerHTML=date;
    document.getElementById("search-entry-id").innerHTML="Entry id: " + entryID;
    document.getElementById("search-entry-comment").innerHTML=content;
    document.getElementById("search-created-by").innerHTML="Created by id:" + createdBy;    

  }

  async function searchByTitle() {
    search = document.getElementById("search_title").value;
    let titles = [];
    const response = await fetch('api/entries');
    const { data } = await response.json();
    
    for (const resource of data) {       
        var date = resource .createdAt.split(" ");
        titles.push(resource.title);
        let result = titles.filter(word => word == search);
        if(result == search && result != ""){
            getentryByTitle(
              resource.entryID,
              resource.title,
              date[0],
              resource.content,            
              resource.createdBy
          );   
          break;  
        } else{
          var container = document.getElementById("search-container");
          container.setAttribute("class", "hidden");    
          console.log("Search result: FALSE");
        }    
    }
  }

  /**Button to hidde searched Entry */
  var hiddeSearch = document.getElementById("search-hidde-entry");
    hiddeSearch.addEventListener("click", function(evt){
      var container = document.getElementById("search-container");
      container.setAttribute("class", "hidden");
      evt.preventDefault();
    });

  /**Button to search entry by title*/
  var searchButton = document.getElementById("search_btn");
  searchButton.addEventListener("click", function(){
    console.log("SEARCH");    
    searchByTitle();
    document.getElementById("search_title").value="";
  });

  
  /************************************************************ */
  /**SELECT A SINGLE ENTRY **************************************/
    async function getSingleEntry(id) {
      let url = "api/entries/" + id;
      const response = await fetch(url);
      const { data } = await response.json();
      var date = data.createdAt.split(" ");
      getOnlyOneEntry(
              data.entryID, 
              data.title, 
              date[0], 
              data.content, 
              data.createdBy
            );    
  }  
  
  /**This function populate a Card in html with onnly one entry */
  function getOnlyOneEntry(entryID, title, date, content, createdBy){  
    var container = document.getElementById("only_one");
    container.removeAttribute("class", "hidden");    
    document.getElementById("title").innerHTML=title;
    document.getElementById("entry_date").innerHTML=date;
    document.getElementById("entry_id").innerHTML="Entry id: " + entryID;
    document.getElementById("entry_content").innerHTML=content;
    document.getElementById("created_by").innerHTML="Created by id:" + createdBy;    

  }

  /**Button to hidde the single Entry */
  var hiddesearch = document.getElementById("hidde_one");
    hiddesearch.addEventListener("click", function(evt){
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
      document.body.insertAdjacentHTML('title', newEntry.data.title         );
      document.body.insertAdjacentHTML('content', newEntry.data.content     );
      document.body.insertAdjacentHTML('createdBy', newEntry.data.createdBy );
      document.body.insertAdjacentHTML('createdAt', newEntry.data.createdAt );
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

  
    /************************************************************************* */
    /**GET ALL USERS *********************************************/

    function createAllUsers(userId, userName, userCreated){

      let container = document.getElementById("user-body");
      let usercontainer = document.createElement("TR");
      container.appendChild(usercontainer);

      console.log(userId, userName, userCreated);

      //Username
      let user_name = document.createElement("TD");
      let userText = document.createTextNode(userName);
      user_name.appendChild(userText);
      usercontainer.appendChild(user_name);

      //User id
      let user_id = document.createElement("TD");
      let idText = document.createTextNode(userId)
      user_id.appendChild(idText);
      usercontainer.appendChild(user_id);

      let user_created = document.createElement("TD");
      let createdText = document.createTextNode(userCreated);
      user_created.appendChild(createdText);      
      usercontainer.appendChild(user_created);

    }

    async function getAllUsers() {
      console.log("01 ");
      const response = await fetch('api/users');
      const { data } = await response.json();
      
      console.log("02 ");
      for (const resource  of data) {
          var date = resource .createdAt.split(" ");
          createAllUsers(
              resource.userID,
              resource.username,
              date[0]
          );    
      }    
    }
    getAllUsers();
    
  
  
  

  

