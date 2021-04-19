const addProductBtn = document.getElementById('add_product');

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
        // if(method === "DELETE"){
        //     document.location = 'products.html';
        // }

        xhr.send(JSON.stringify(data));
    });
    return promise;
};

const deleteProducts = (id) => {
    sendHttpRequest('DELETE', 'http://localhost:5000/products/'+id, {
        // email: email,
        // password: password
    }).then(responseData => {
        console.log(responseData);
        document.location = 'products.html';
    }).catch(err => {
        console.log(err);
    });
};



    sendHttpRequest('GET', 'http://localhost:5000/products').then(responseData => {
        console.log(responseData);
        var productsHtml = "";
        if(responseData){
            if(responseData.products){
                var products = responseData.products;
                console.log(products)
                products.forEach(function (product){
                    console.log(product.name);
                    productsHtml = productsHtml + "<div class='items'><img src='..\\backend\\"+product.productImage +"' /><p>Product Name: "+ product.name +"</p><p>Product Id: "+ product._id +"</p><p>"+"</p><p>Product Price: "+ product.price +"</p><p>"+"<div class='col-md-12 text-center'><button type='button' class='btn btn-primary'>Edit</button><button type='button' class='btn btn-danger' onclick="+'"'+"deleteProducts('"+product._id+"')"+'"' +">Delete</button></div>"+"</p></div>";
                });
                document.getElementById('insertProducts').innerHTML = productsHtml;
            }
        }
    }).then(responseData => {
        console.log(responseData);
    });

const addProduct = () => {
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const productImage = document.getElementById('productImage').value;
    var imageName = null;
    if(productImage){
        arr = productImage.split("\\");
        imageName = "uploads\\"+arr[arr.length - 1];
    }
    console.log(imageName)
    sendHttpRequest('POST', 'http://localhost:5000/products', {
        name: name,
        price: price,
        productImage: productImage
    }).then(responseData => {
        console.log(responseData);
        document.getElementById('successMessage').innerHTML="Product Added Successfully";
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

addProductBtn.addEventListener('click', addProduct);
