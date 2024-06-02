let productName = document.getElementById("productName")
let productPrice = document.getElementById("productPrice")
let productModal = document.getElementById("productModal")
let productDescription = document.getElementById("productDescription")
let addProduct = document.getElementById("addProduct")
let updateBtn = document.querySelector("#updateBtn")
let search = document.getElementById("search")
let productList;
let indexOfUpdateProduct;


// DATA IN LOCAL STROGE
if (localStorage.getItem("listOfProducts") == null) {
    productList = [];
} else {
    productList = JSON.parse(localStorage.getItem("listOfProducts"));
    display(productList)
};

// ADD PRODUCT
addProduct.addEventListener("click", function addProduct() {
    if (validateProductName() && validateProductPrice() && validateProductModal() && validateProductDesc() == true) {
        let product = {
            name: productName.value,
            price: productPrice.value,
            modal: productModal.value,
            desc: productDescription.value
        }
        productList.push(product)
        localStorage.setItem("listOfProducts", JSON.stringify(productList))
        display(productList)
        clearForm()
    } else {
        productName.classList.add("is-invalid");
        productPrice.classList.add("is-invalid");
        productModal.classList.add("is-invalid");
        productDescription.classList.add("is-invalid");
    }
})


// DISPLAY PRODUCT LIST FUNCTION
function display(list) {
    let cartona = ``
    for (let i = 0; i < list.length; i++) {
        cartona += ` <tr>
                    <td>${i + 1}</td>
                    <td>${list[i].newName ? list[i].newName : list[i].name}</td>
                    <td>${list[i].price}</td>
                    <td>${list[i].modal}</td>
                    <td>${list[i].desc}</td>
                    <td><button onclick ="updateProduct(${i})" class="btn btn-warning btn-sm">Update</button></td>
                    <td><button onclick ="deleteForm(${i})" class="btn btn-danger btn-sm">Delete</button></td>
                </tr>`
    }
    document.getElementById("tBody").innerHTML = cartona
};

// CLEAR FORM FUNCTION
function clearForm() {
    productName.value = ''
    productPrice.value = ''
    productModal.value = ''
    productDescription.value = ""
    productName.classList.remove("is-valid");
    productPrice.classList.remove("is-valid");
    productModal.classList.remove("is-valid");
    productDescription.classList.remove("is-valid");
};

// UPDATE PRODUCT 
updateBtn.addEventListener("click", function update() {
    document.getElementById("addProduct").classList.replace("d-none", "d-block");
    document.getElementById("updateBtn").classList.add("d-none");
    let product = {
        name: productName.value,
        price: productPrice.value,
        modal: productModal.value,
        desc: productDescription.value
    }
    productList[indexOfUpdateProduct] = product
    display(productList)
    localStorage.setItem("listOfProducts", JSON.stringify(productList))
    clearForm()
});

function updateProduct(i) {
    document.getElementById("updateBtn").classList.replace("d-none", "d-block");
    document.getElementById("addProduct").classList.add("d-none");
    productName.value = productList[i].name
    productPrice.value = productList[i].price
    productModal.value = productList[i].modal
    productDescription.value = productList[i].desc
    indexOfUpdateProduct = i;
}

// DELETE PRODUCT FUNCTION
function deleteForm(index) {
    productList.splice(index, 1);
    localStorage.setItem("listOfProducts", JSON.stringify(productList))
    display(productList);
}

// SEARCH PRODUCT
search.addEventListener("input", function search() {
    let searchValue = document.getElementById("search").value

    var foundedItem = [];
    for (let i = 0; i < productList.length; i++) {
        if (productList[i].name.toLowerCase().includes(searchValue.toLowerCase()) == true) {
            foundedItem.push(productList[i])
            productList[i].newName = productList[i].name.toLowerCase().replace(searchValue.toLowerCase(), `<span class="text-danger">${searchValue}</span>
`)
        }
    }
    display(foundedItem)
})




// VALDIATION FOR PRODUCT NAME
productName.addEventListener("input", function () {
    validateProductName()
})

function validateProductName() {
    var regex = /^[A-Z][a-z]{3,8}$/;
    if (regex.test(productName.value) == true) {
        productName.classList.replace("is-invalid", "is-valid");
        document.getElementById("wrongName").classList.add("d-none");
        return true
    } else {
        productName.classList.add("is-invalid");
        document.getElementById("wrongName").classList.remove("d-none");
        return false
    }
};

// VALDIATION FOR PRODUCT PRICE
productPrice.addEventListener("input", function () {
    validateProductPrice()
})

function validateProductPrice() {
    var regex = /^([1-9][0-9]{3}|10000)$/;
    if (regex.test(productPrice.value) == true) {
        productPrice.classList.replace("is-invalid", "is-valid");
        document.getElementById("wrongPrice").classList.add("d-none");
        return true
    } else {
        productPrice.classList.add("is-invalid");
        document.getElementById("wrongPrice").classList.remove("d-none");
        return false
    }
};

// VALDIATION FOR PRODUCT MODEL
productModal.addEventListener("input", function () {
    validateProductModal()
})

function validateProductModal() {
    var regex = /^(Tv|Mobile|Laptope)$/;
    if (regex.test(productModal.value) == true) {
        productModal.classList.replace("is-invalid", "is-valid");
        document.getElementById("wrongModal").classList.add("d-none");
        return true
    } else {
        productModal.classList.add("is-invalid");
        document.getElementById("wrongModal").classList.remove("d-none");
        return false
    }
};

// VALDIATION FOR PRODUCT DESCRIPTION
productDescription.addEventListener("input", function () {
    validateProductDesc()
})

function validateProductDesc() {
    var regex = /^.{100,}$/;
    if (regex.test(productDescription.value) == true) {
        productDescription.classList.replace("is-invalid", "is-valid");
        document.getElementById("wrongDesc").classList.add("d-none");
        return true
    } else {
        productDescription.classList.add("is-invalid");
        document.getElementById("wrongDesc").classList.remove("d-none");
        return false
    }
};


