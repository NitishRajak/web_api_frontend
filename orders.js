const orderBtn = document.getElementById('add_order');

var resCode = 0;

const sendHttpRequest = (method, url, data) => {
    const promise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        // xhr.open('GET', 'http://localhost:5000/products');
        xhr.responseType = 'json';

        if(data){
            xhr.setRequestHeader('Content-Type', 'application/json');
        }else if (method === 'DELETE'){
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

const deleteOrders = (id) => {
    sendHttpRequest('DELETE', 'http://localhost:5000/orders/'+id, {
        // email: email,
        // password: password
    }).then(responseData => {
        console.log(responseData);
        document.location = 'orders.html';
    }).catch(err => {
        console.log(err);
    });
};


    sendHttpRequest('GET', 'http://localhost:5000/orders').then(responseData => {
        console.log(responseData);
        var ordersHtml = "<table class='table table-dark table-striped'><thead><tr><th>Product Order</th><th>Order Quantity</th><th>Details</th><th>Actions</th></tr></thead><tbody>";
        if(responseData){
            if(responseData.orders){
                var orders = responseData.orders;
                console.log(orders)
                orders.forEach(function (order){
                    console.log(order.product);
                    var productName = "Product Name";
                    if (order.product !== null){
                        productName = order.product.name;
                    }
                    ordersHtml = ordersHtml + "<tr><td>"+ productName +"</td><td>"+order.quantity+"</td><td><a target='_blank' href='"+order.request.url+"'>Click to view details</a></td><td>"+"<div class='col-md-12 text-center'><button type='button' class='btn btn-primary'>Edit</button><button type='button' class='btn btn-danger' onclick="+'"'+"deleteOrders('"+order._id+"')"+'"' +">Delete</button></div>" +"</td></tr>";
                });
                document.getElementById('insertOrders').innerHTML = ordersHtml+"</tbody></table>";
            }
        }
    }).then(responseData => {
        console.log(responseData);
    });

const addOrder = () => {
    const product = document.getElementById('product').value;
    const quantity = document.getElementById('quantity').value;
    sendHttpRequest('POST', 'http://localhost:5000/orders', {
        productId: product,
        quantity: quantity
    }).then(responseData => {
        console.log(responseData);
        //document.location = 'orders.html';
        document.getElementById('successMessage').innerHTML="Oder added successfully";
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

orderBtn.addEventListener('click', addOrder);

