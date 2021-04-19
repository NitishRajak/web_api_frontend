const loginBtn = document.getElementById('login');

const sendHttpRequest = (method, url, data) => {
    const promise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.responseType = 'json';

        if(data){
            xhr.setRequestHeader('Content-Type', 'application/json');
        }

        xhr.onload = () => {
            if(xhr.status >= 400){
              console.log(xhr.response);
                reject(xhr.response);
            }else{
              console.log(xhr.response);
                resolve(xhr.response);
            }
        };

        xhr.onerror =() => {
            reject('Something went wrong!');
        };

        xhr.send(JSON.stringify(data));
    });
    return promise;
};


const loginUser = () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    sendHttpRequest('POST', 'http://localhost:5000/user/login', {
        email: email,
        password: password
    }).then(responseData => {
        console.log(responseData);
        document.location = 'products.html';
        document.getElementById('errorMessage').innerHTML="";
        //alert('User Added successfully');
    }).catch(err => {
        if(err.error){
          document.getElementById('errorMessage').innerHTML=err.error.message;
        }else if (err.message){
          document.getElementById('errorMessage').innerHTML=err.message;
        }
      
        console.log(err);
        var obj = JSON.stringify(err);
        console.log();
        //alert('Error adding user'+err);
    });
};


loginBtn.addEventListener('click', loginUser);
