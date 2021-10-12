//Somes implementations

(function() {
    //#region : usuals fonctions
    const removeAllChild =  (_node) => {
        for (let i = 0; i < _node.children.length; i++) {
            const element = _node.children[i];
            ((element) => {
                _node.removeChild(element);
            })(element);
            console.log(i);
        }
    }
    const verifyEmail = (email) => {
        //TODO
        //....
        return true;
    }
    const showMessage = (type, content, element) => {
        let message = document.createElement(`div`);
        message.className = `ui ${type} message`;
        message.innerHTML = `<p>${content}</p>`;
        const parent = element.parentElement;
        parent.insertBefore(message, element);
    }
    const toggleModal = (modalSpecificClass) => {
        $(`.ui.modal.${modalSpecificClass}`).modal('toggle');
    }
    const createUserRow = (element) => {
        let row = document.createElement('tr');
        moment.locale('fr');
        let date = moment(element.createdAt).format(`DD MMMM YYYY  hh:mm:ss`);
        
        row.innerHTML = `<td class="collapsing">
        <div class="ui fitted slider checkbox">
        <input type="checkbox" id="${element.id}" name="${element.id}"> <label></label>
        </div>
    </td><td>${element.userName}</td><td>${date}</td><td>${element.email}</td><td>${element.role}</td>`;
        
        userList.appendChild(row);
    }
    const loadNewUserPage = (e) => {
       const pageBtn = e.currentTarget;
       let pageNumber = pageBtn.id;
       let start = (pageNumber * 10) -10;
       let length = users.length - start;
       if(length > 10) {
           length = 10;
       }
       userList.innerHTML = "";
        for (let i = start; i < start + length; i++) {
            const element = users[i];
            createUserRow(element);
            
        }
       
    }
    const displayPagination = (number, userListFoot) => {
        let pagination = document.createElement(`div`);
        pagination.classList.add(`ui`)
        pagination.classList.add(`floated`)
        pagination.classList.add(`right`)
        pagination.classList.add(`menu`)
        let oldPage = userListFoot.querySelector(`.ui.menu`);
        if(oldPage) {
            userListFoot.removeChild(oldPage);
        }
        userListFoot.appendChild(pagination);
        let reste = number % 10;
        let itemNumber = parseInt(number / 10);
        if(reste > 0) {
            itemNumber ++;
        }
        if(itemNumber > 1) {
            for (let i = 0; i < itemNumber; i++) {
                const a = document.createElement(`a`);
                a.classList.add(`item`);
                a.id = i + 1;
                a.addEventListener('click', loadNewUserPage)
                a.innerHTML = i + 1;
                pagination.appendChild(a);
            }
        }
    }
    const showUsers = (min) => {
        //chemin pour retrouver tous les utilisateurs
        xhr.open('GET', '/api/users/');
        xhr.onreadystatechange = () => {
            if(xhr.readyState == 4) {
                if(xhr.status == 200) {
                    let res = xhr.responseText;
                    users = JSON.parse(res);
                     const userListFoot = document.querySelector(`#userListFoot`);
                    let extremums = displayPagination(users.length, userListFoot)
                    userList.innerHTML = "";
                    let lenght = users.length - min;
                    if(lenght > 10) {
                        lenght = 10;
                    }
                    for (let i = min; i < lenght; i++) {
                        const element = users[i];
                        let row = document.createElement('tr');
                        moment.locale('fr');
                        let date = moment(element.createdAt).format(`DD MMMM YYYY  hh:mm:ss`);
                        
                        row.innerHTML = `<td class="collapsing">
                        <div class="ui fitted slider checkbox">
                        <input type="checkbox" id="${element.id}" name="${element.id}"> <label></label>
                        </div>
                    </td><td>${element.userName}</td><td>${date}</td><td>${element.email}</td><td>${element.role}</td>`;
                        
                        userList.appendChild(row);
                    }
                }
                else {
                    userList.innerHTML = `<tr><td colspan=5><h4>Aucun Utilisateur trouvé</h4></td></tr>`
                }
            }
        }
        xhr.send();
    }
    const showTeams = (min) => {
        const xr = new XMLHttpRequest();
        xr.open('GET', '/api/teams/')
        xr.onreadystatechange = () => {
          if(xr.readyState == 4) {
                  if(xr.status == 200) {
                        let res = xr.responseText;
                        teams = JSON.parse(res);
                        teamList.innerHTML = '';
                        if(teams.length == 0) {
                            teamList.innerHTML = `<tr><td colspan=5><h4>Aucun Utilisateur trouvé</h4></td></tr>`;
                            return;
                        }
                       const teamListFoot =  document.querySelector(`#teamListFoot`);
                        let extremums = displayPagination(teams.length, teamListFoot)
                        teamList.innerHTML = "";
                        let lenght = teams.length - min;
                        if(lenght > 10) {
                            lenght = 10;
                        }
                        for (let i = min; i < lenght; i++) {
                            const element = teams[i];
                            let row = document.createElement('tr');
                            moment.locale('fr');
                            let date = moment(element.createdAt).format(`DD MM YYYY  hh:mm:ss`);
                            
                            row.innerHTML = `<td class="collapsing">
                            <div class="ui fitted slider checkbox">
                            <input type="checkbox" id="${element.id}" name="${element.id}"> <label></label>
                            </div>
                             </td><td>${element.name}</td><td>${date}</td><td>${element.createdAt}</td>`;
                            
                            userList.appendChild(row);
                        }
                   }
                   else if(xr.status == 400) {
                       location = '/';
    
                   }
                   else {
                    teamList.innerHTML = `<tr><td colspan=5><h4>Aucun Utilisateur trouvé</h4></td></tr>`
                    }
          }
           
        }
        xr.send();
    }
    const findSelectedId = (div) => {
        const allCheckboxes = div.querySelectorAll('input[type="checkbox"]');
        let choosen = [];
        for (let i = 0; i < allCheckboxes.length; i++) {
            const element = allCheckboxes[i];
            if (element.checked) {
                choosen.push(element);
            }
        }
        return choosen;
    }
    //#endregion

    //#region : events listenner
    const addUser = (e) => {
        $('.ui.modal.addUserForm').modal('show');
    }
    const deleteUser = (e) => {
        let choosen = findSelectedId(userList);
        if(choosen.lenght > 0) {
            let jsonChoosen = JSON.stringify(choosen);
            const xhr = new XMLHttpRequest();
            xhr.open('DELETE', `/api/users/delete`);
            xhr.onreadystatechange = () => {
                if(xhr.readyState == 4) {
                    if(xhr.status == 200) {
                        const alertModal = document.querySelector(`#alertModal`);
                        alertModal.innerHTML = `<p>Utilisateur supprimer avec succes</p>`
                        if(alertModal.classList.contains(`error`)) {
                            alertModal.classList.remove(`error`);
                        }
                        else if(alertModal.classList.contains(`success`)){

                        }
                        else {
                            alertModal.classList.add(`success`);
                        }
                            toggleModal(`addUserForm`);
                            toggleModal(`alert`)
                            showUsers(0);
                    }
                }
            }
            xhr.setRequestHeader('authorization', sessionStorage.userStorage)
            xhr.send(jsonChoosen);
        }
        
    }
    const addTeam = (e) => {
        console.log($('.ui.modal.addTeamForm'))
        $('.ui.modal.addTeamForm').modal('show');
    }

    const newUser = (e) => {
        const inputs = newUserForm.querySelectorAll(`input`);
        for (let i = 0; i < inputs.length; i++) {
            const element = inputs[i];
            if(element.value == "") {
                showMessage(`error`, "Aucun champ ne doit etre vide", newUserForm);
                element.style.borderColor = `#EE4040`;
                return;
            }
            
        }
        
        if(verifyEmail(email) && userPassword.value === confirmedPass.value) {
            const xhr = new XMLHttpRequest;
            xhr.open(`POST`, `/api/users/register/`)
            xhr.onreadystatechange = () => {
               if( xhr.readyState == 4) {
                   if(xhr.status == 200 || xhr.status == 201) {
                       for (let j = 0; j < inputs.length; j++) {
                           const element = inputs[j];
                           element.value = ``;
                       }
                       const alertModal = document.querySelector(`#alertModal`);
                       alertModal.innerHTML = `<p>Utilisateur ajouter avec succes</p>`
                       if(alertModal.classList.contains(`error`)) {
                        alertModal.classList.remove(`error`);
                       }
                       else if(alertModal.classList.contains(`success`)){

                       }
                       else {
                        alertModal.classList.add(`success`);
                       }
                        toggleModal(`addUserForm`);
                        toggleModal(`alert`)
                        showUsers(0);
                   }
                   else {
                       //TO DO: show Modal Message
                       //....
                       console.log(xhr.response)
                   }
               }
            }
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.send(`email=${email.value}&password=${userPassword.value}&userName=${userName.value}&roleId=${roleId.value}`);
        }
    }
    const newTeam = (e) => {

    }
    const cancel = (e) => {

    }
    //#endregion
    

    let users;
    let teams;
    const userList = document.querySelector('#userList');
    const teamList = document.querySelector("#teamList");
    const addUserBtn = document.querySelector(`#addUser`);
    const deleteUserBtn = document.querySelector('#deleteUser');
    const confirmUserInfoBtn = document.querySelector(`#confirmUserInfo`);
    const cancelUserInfoBtn = document.querySelector(`#cancelUserInfo`);
    const newUserForm = document.querySelector(`#newUserForm`);
    const email = document.querySelector(`#email`);
    const userName = document.querySelector(`#userName`);
    const userPassword = document.querySelector(`#password`);
    const confirmedPass = document.querySelector(`#confirmedPass`);
    const confirmTeamInfo = document.querySelector('#confirmTeamInfo');
    const roleId = document.querySelector(`#roleId`);
    //#region : recuperation des tous les utilisateurs
    const xhr = new XMLHttpRequest();
    showUsers(0);
    showTeams(0);
    //#endregion
    //#region : add event listener
    addUserBtn.addEventListener('click', addUser);
    deleteUserBtn.addEventListener('click', deleteUser);
    confirmUserInfoBtn.addEventListener(`click`, newUser);
    confirmTeamInfo.addEventListener('click', addTeam);
    //#endregion

})()