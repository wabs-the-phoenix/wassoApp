

(function() {
    userStorage = sessionStorage.getItem("userStorage");
    if(userStorage) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', '/api/users/me/');
        xhr.onreadystatechange = () => {
            if(xhr.readyState == 4) {
                if(xhr.status == 200 || xhr.status == 201) {
                    let res = xhr.responseText;
                    res = JSON.parse(res);
                    if(res.role !== `admin`) {
                        location = `/`;
                        return;
                    }
                    const userInfo = document.querySelector(`#userInfo`);
                    userInfo.innerHTML = `<i class="user icon"></i> `+ res.userName;
                    const nowDateTime = document.querySelector(`#dateTime`);
                    let timerId = setInterval(()=> {
                        nowDateTime.innerHTML = moment().format('DD/MM/YYYY hh:mm:ss');
                    }, 1000);
                }
                else {
                    location = `/`;
                }
            }
        }
        xhr.setRequestHeader('authorization', userStorage);
        xhr.send();
    }
    else {
        location = `/`;
    }
})()