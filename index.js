//admin
const user = 'admin'
const password = 'admin@min'
//user
// const user = 'user'
// const password = 'user@min'

'use strict';
const url = 'http://localhost:3000'

function product() {
    fetch(url + '/product', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "username": user,
            "password": password
        })

    })
        .then(response => response.json())
        .then(data => {
            console.log(data.status)
            if (data.status == 200) {
                let html = ''
                data.data.forEach(product => {
                    html += '<tr>'
                    html += '<td>' + product.Product_id + '</td>'
                    html += '<td>' + product.Code_product_type + '</td>'
                    html += '<td>' + product.Product_name + '</td>'
                    html += '<td>' + product.Barcode_number + '</td>'
                    html += '<td>' + product.Production_date + '</td>'
                    html += '<td>' + product.Selling_proce + '</td>'
                    html += '<td>' + product.Cost_price + '</td>'
                    html += '<td>' + product.Factory_code + '</td>'
                    html += '<td><button class="btn btn-danger" onclick="product_delete(' + product.Product_id + ')">Delete</button></td>'
                    html += '<td><button class="btn btn-warning" onclick="product_update(' + product.Product_id + ')">Edit</button></td>'
                    html += '</tr>'
                })
                document.getElementById('product').innerHTML = html
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'OOP!',
                    text: `${data.msg}`,
                })
            }
        })
        .catch(error => console.log(error))
}

function product_add() {
    Swal.fire({
        title: 'Create product',
        html:
            '<label>Code product type</label><br>' +
            '<input id="Code_product_type" class="Code_product_type" placeholder = "Codeproduct type"style="width:50%"><br>' +
            '<label>Product name</label><br>' +
            '<input id="Product_name" class="Product_name" placeholder = "Product name"style="width:50%"><br>' +
            '<label>Barcode number</label><br>' +
            '<input id="Barcode_number" class="Barcode_number" placeholder = "Barcode number"style="width:50%"><br>' +
            '<label>Production date</label><br>' +
            '<input id="Production_date" class="Production_date"  placeholder = "Production date" type="date" style="width:50%"><br>' +
            '<label>Selling price</label><br>' +
            '<input id="Selling_proce" class="Selling_proce" placeholder = "Selling price"style="width:50%"><br>' +
            '<label>Cost price</label><br>' +
            '<input id="Cost_price" class="Cost_price" placeholder = "Cost price"style="width:50%"><br>' +
            '<label>Factory code</label><br>' +
            '<input id="Factory_code" class="Factory_code" placeholder = "Factory code"style="width:50%"><br>',

        focusConfirm: false,
        preConfirm: () => {
            let Code_product_type = document.getElementById('Code_product_type').value
            let Product_name = document.getElementById('Product_name').value
            let Barcode_number = document.getElementById('Barcode_number').value
            let Production_date = document.getElementById('Production_date').value
            let Selling_proce = document.getElementById('Selling_proce').value
            let Cost_price = document.getElementById('Cost_price').value
            let Factory_code = document.getElementById('Factory_code').value
            console.log(Production_date)
            fetch(url + '/product_add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "username": user,
                    "password": password,
                    "Code_product_type": parseInt(Code_product_type),
                    "Product_name": Product_name,
                    "Barcode_number": Barcode_number,
                    "Production_date": Production_date,
                    "Selling_proce": parseFloat(Selling_proce),
                    "Cost_price": parseFloat(Cost_price),
                    "Factory_code": Factory_code,
                })

            })
                .then(response => response.json())
                .then(data => {
                    console.log(data.status);
                    if (data.status == 200) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: 'create product success',
                            confirmbuttonColor: 'ok',
                        }).then((result) => {
                            window.location.reload()
                        })
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'OOP!',
                            text: `${data.msg}`,
                        }).then((result) => {
                            window.location.reload()
                        })
                    }
                })
                .catch(error => console.log(error))
        }
    })
}
function product_delete(id) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(url + '/product_delete/' + id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "username": user,
                    "password": password
                })
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data.status)
                    if (data.status == 200) {
                        Swal.fire(
                            'DELETE SUCCESS!',
                            'Your file has been deleted.',
                            'success',
                            {
                            icon: 'DELETESUCCESS',
                            title: 'Success',
                            text: 'DELETE product success',
                            confirmbuttonColor: 'ok',
                        }).then((result) => {
                            window.location.reload()
                        })
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'OOP!',
                            text: `${data.msg}`,
                        });
                    }

                })
                .catch(error => console.log(error));
        }
    })
}



function product_update(product_id) {
    fetch(url + '/product/' + product_id, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "username": user,
            "password": password,
        })
    }).then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.error == false) {
                let product = data.data[0];

                Swal.fire({
                    title: 'Edit product',
                    html:
                        '<label>Code product type</label><br>' +
                        '<input id="Code_product_type" class="Code_product_type" value="' + product.Code_product_type + '" placeholder = "Code product type"style="width:50%"><br>' +
                        '<label>Product name</label><br>' +
                        '<input id="Product_name" class="Product_name" value="' + product.Product_name + '" placeholder = "Product name"style="width:50%"><br>' +
                        '<label>Barcode number</label><br>' +
                        '<input id="Barcode_number" class="Barcode_number" value="' + product.Barcode_number + '" placeholder = "Barcode number"style="width:50%"><br>' +
                        '<label>Production date</label><br>' +
                        '<input id="Production_date" class="Production_date" value="  ' + product.Production_date + '" placeholder = "Production date" type="date"style="width:50%"><br>' +
                        '<label>Selling price</label><br>' +
                        '<input id="Selling_proce" class="Selling_proce" value="' + product.Selling_proce + '" placeholder = "Selling price"style="width:50%"><br>' +
                        '<label>Cost price</label><br>' +
                        '<input id="Cost_price" class="Cost_price" value="' + product.Cost_price + '" placeholder = "Cost price"style="width:50%"><br>' +
                        'label>Factory code</label><br>' +
                        '<input id="Factory_code" class="Factory_code" value="' + product.Factory_code + '" placeholder = "Factory code"style="width:50%"><br>',

                    focusConfirm: false,
                    preConfirm: () => {

                        let Code_product_type = document.getElementById('Code_product_type').value;
                        let Product_name = document.getElementById('Product_name').value;
                        let Barcode_number = document.getElementById('Barcode_number').value;
                        let Production_date = document.getElementById('Production_date').value;
                        let Selling_proce = document.getElementById('Selling_proce').value;
                        let Cost_price = document.getElementById('Cost_price').value;
                        let Factory_code = document.getElementById('Factory_code').value;
                        fetch(url + '/product_update/' + product_id, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                "username": user,
                                "password": password,
                                "Code_product_type": parseInt(Code_product_type),
                                "Product_name": Product_name,
                                "Barcode_number": Barcode_number,
                                "Production_date": Production_date,
                                "Selling_proce": parseFloat(Selling_proce),
                                "Cost_price": parseFloat(Cost_price),
                                "Factory_code": Factory_code,
                            })
                        })
                            .then(response => response.json())
                            .then(data => {
                                if (data.status == 200) {
                                    Swal.fire({
                                        icon: 'success',
                                        title: 'Success',
                                        text: 'update product success',
                                        confirmbuttonColor: 'ok',
                                    }).then((result) => {
                                        window.location.reload()
                                    })
                                } else {
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'OOP!',
                                        text: `${data.msg}`,
                                    })
                                }
                            })
                            .catch(error => console.log(error))
                    }
                })
            }
        })
        .catch(error => console.log(error))
}

