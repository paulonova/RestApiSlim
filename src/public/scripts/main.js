// async function main() {
//   const response = await fetch('/todos/1');
//   const { data } = await response.json();
//   console.log(data);
// }

// main();


//Registering
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
    
})