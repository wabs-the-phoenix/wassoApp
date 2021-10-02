(function() {
    //#region : usuals fonctions
    
    //#endregion
    //#region 
    const loginForm = document.querySelector('#loginForm')
    //#endregion

    //#region 
    if(loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let fields = loginForm.querySelectorAll('input');
            let formData = new FormData();
            for (let i = 0; i < fields.length; i++) {
                const element = fields[i];
                if(element.value == "") {
                    return;
                }
                formData.append(element.value, element.name);
            }
            
            const xhr = new XMLHttpRequest();
            xhr.open('POST', '/api/users/login/');
            xhr.onreadystatechange = () => {
                if(xhr.readyState == 4) {
                    if(xhr.status == 200) {
                        let res = JSON.parse(xhr.response);
                        sessionStorage.userStorage = res.token;
                        location = `/administration/`;
                    } else {
                        const message = document.createElement('div');
                        message.classList.add('ui');
                        message.classList.add('message');
                        message.classList.add('error');
    
                        message.innerHTML = JSON.parse(xhr.response).error;
                        let firstField = loginForm.querySelector('.field');
                        loginForm.parentElement.insertBefore(message, loginForm);
                    }
                }
            }
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.send(`login=${fields[0].value}&password=${fields[1].value}`);
            
        });
    }
    //#endregion
})()