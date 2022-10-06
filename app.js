const githubform = document.getElementById('github-form');
const nameInput = document.getElementById('githubname');
const clearLastUsers = document.getElementById('clear-last-users');
const lastUsers = document.getElementById('last-users');
const github = new Github();
const ui = new UI();
eventListeners();

function eventListeners(){
    githubform.addEventListener("submit",getData);
    clearLastUsers.addEventListener("click",clearAllSearched);
    document.addEventListener('DOMContentLoaded',getAllSearched)
}
function getData(e){
    let username = nameInput.value;
    
    if(username === ""){
        alert("Please enter a username");
    }else{
        github.getGithubData(username)
        .then(response =>{
            if(response.user.message === "Not Found"){
                ui.showError()
            }else{
                ui.addSearchedUsersToUI(username)
                Storage.addSearchedUsersToStorage(username);
                ui.showUserInfo(response.user);
                ui.showRepoInfo(response.repo);    
            }
        })
        .catch(err => ui.showError);
    }
    ui.clearInput();
    e.preventDefault()
}
function clearAllSearched(){
    if(confirm("Are you sure?")){
        Storage.clearAllSearchedUsersFromStorage();
        ui.clearAllSearchedUsersFromUI();
    }
}

function getAllSearched(){
    let users = Storage.getSearchedUsersFromStorage();
    let result = "";
    users.forEach(user => {
        result += `<li class="list-group-item">${user}</li>`;
    });
    lastUsers.innerHTML = result;
}