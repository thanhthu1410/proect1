const USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
})

//function validate Email
let valueEmail = document.querySelector(".valueEmail").value;
function isEmail(valueEmail) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(valueEmail);
}
// function hiển thị ra thông báo 
function myFunction(param) {
    var x = document.getElementById("snackbar");
    x.className = "show";
    x.innerHTML = param;
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}

// function chuyển về trang trước 
function backPage() {
    window.location.href = "cart.html"
}

function getProductInfo(productId, optionId) {
    let productList = JSON.parse(localStorage.getItem('listProducts'));
    for (let i in productList) {
        if (productList[i].id == productId) {
            for (let j in productList[i].options) {
                if (optionId ==  productList[i].options[j].id) {
                    productList[i].imgOption = productList[i].options[j].icon;
                    break;
                }
            }
            return productList[i]
        }
    }
}
// Function show ra những sản phẩm đã thêm vào giỏ hàng 
function showCartUser() {
    let idLogin = localStorage.getItem("checkLogin");
    let listUsers = JSON.parse(localStorage.getItem("listUser"));
    if (idLogin == null) {
        window.location.href = "login.html";
    } else {
        let user = listUsers.find((item) => {
            return item.idUser == idLogin;
        })
        let cartUser = user.cartUser;
        let result = "";
        for (let n = 0; n < cartUser.length; n++) {
            console.log("cartUser[n]", cartUser[n])
            result +=
                `
                    
                <div class="product-detail">
                    <div class="img">
                        <img src="../${getProductInfo(cartUser[n].productId, cartUser[n].idOption).imgOption}" alt="">
                    </div>
                    <div class="inforItem">
                        <p>${getProductInfo(cartUser[n].productId, cartUser[n].idOption).name}</p>
                        <span> ${cartUser[n].quantity} / ${USDollar.format(getProductInfo(cartUser[n].productId, cartUser[n].idOption).price)}</span> <br>
                       
                        <span class = "subtotal">Subtotal :${USDollar.format(getProductInfo(cartUser[n].productId, cartUser[n].idOption).price * cartUser[n].quantity)}</span><br>
                    </div>
                </div>
                 `
        }
        document.querySelector(".renderProduct").innerHTML = result;
    }
}
showCartUser();

//function tính tổng giá tiền của các sản phẩm đã thên vào giỏ hàng
function totalPrice() {
    let listUser = JSON.parse(localStorage.getItem("listUser"));
    let checkIsLogin = localStorage.getItem("checkLogin");
    let user = listUser.find((item) => {
        return item.idUser == checkIsLogin
    })

    let cartUser = user.cartUser;

    let totalPrice = 0;
    for (let i in cartUser) {
        totalPrice += getProductInfo(cartUser[i].productId, cartUser[i].idOption).price * cartUser[i].quantity;
    }
    document.querySelector(".totalPrice").innerHTML = `Subtotal : ${USDollar.format(totalPrice)} `
    // showCartUser()


}
totalPrice()

//function check information của khách hàng - sau đó check out kết thúc quá trình mua hàng 
function checkInfor() {
    let valueEmail = document.querySelector(".valueEmail").value;
    let valueFullname = document.querySelector(".valueFullname").value;
    let valueAddress = document.querySelector(".valueAddress").value;
    let valuePhone = document.querySelector(".valuePhone").value;
    // kiểm tra xem Email nhập vào có đúng hay chưa . 
    let checkEmail = isEmail(valueEmail);
    if (checkEmail == false) {
        myFunction("Please check your Email!")
        return;
    }

    // kiểm tra xem khách đã nhập đầy đủ thông tin hay chưa. yêu cầu nhập đủ thông tin
    if (valueEmail == "" || valueFullname == "" || valueAddress == "" || valuePhone == "") {
        myFunction("Please provide complete personal information.")
    }
    saveInformation()
    myFunction("Thank you for your purchase!")
    // function changePage() {
    //     window.location.href = "../index.html";
    // }
    // setTimeout(changePage, 2000)
}


function checkStock(userCart) {
    // check tồn kho
    let productList = JSON.parse(localStorage.getItem('listProducts'))
    for (let i in productList) {
        for (let j in userCart) {
            if (userCart[j].productId == productList[i].id) {
                for (let k in productList[i].options) {
                    if (userCart[j].idOption == productList[i].options[k].id) {
                       if (userCart[j].quantity > productList[i].options[k].stock) {
                            return [false,productList[i].name];
                       };
                    }
                }
                return [true,productList[i].name];
            }
        }
    }
}

function updateStock(userCart) {
    // check tồn kho
    let productList = JSON.parse(localStorage.getItem('listProducts'))
    for (let i in productList) {
        for (let j in userCart) {
            if (userCart[j].productId == productList[i].id) {
                for (let k in productList[i].options) {
                    if (userCart[j].idOption == productList[i].options[k].id) {
                        productList[i].options[k].stock -= userCart[j].quantity;
                        localStorage.setItem('listProducts', JSON.stringify(productList)); // save to local
                        break
                    }
                }
            }
        }
    }
}

function saveInformation() {
    let idLogin = localStorage.getItem("checkLogin");
    let listUsers = JSON.parse(localStorage.getItem("listUser"));
    if (idLogin == null) {
        window.location.href = "login.html";
    } else {
        let user = listUsers.find((item) => {
            return item.idUser == idLogin;
        })
        let valueEmail = document.querySelector(".valueEmail").value;
        let valueFullname = document.querySelector(".valueFullname").value;
        let valueAddress = document.querySelector(".valueAddress").value;
        let valuePhone = document.querySelector(".valuePhone").value;
        user.inforCustomer = {
            valueEmail: valueEmail,
            valueName: valueFullname,
            valueAddress: valueAddress,
            valuePhone: valuePhone
        }
        let resultCheck = checkStock(user.cartUser);
        console.log('a ă ớ b c', resultCheck[0], resultCheck[1]);
        if (!resultCheck[0]) {
            alert("Sản phẩm có tên: " + resultCheck[1] + " đã hết hàng, hoặc không tồn tại")
            return;
        }
        // update stock
        updateStock(user.cartUser);
        // save receipt
            
        // reset cart
        // user.cartUser = [];
        // localStorage.setItem("listUser",JSON.stringify(listUsers)) 
    }
}

 //nếu là khách hàng cũ thì tự đông cập nhật lại thông tin của khách . tránh để khách nhập lại ^^
function checkCustomer () {
    let idLogin = localStorage.getItem("checkLogin");
    let listUsers = JSON.parse(localStorage.getItem("listUser"));
    if (idLogin == null) {
        window.location.href = "../html/login.html";
    } else {
        let user = listUsers.find((item) => {
            return item.idUser == idLogin;
        })

        if (user.inforCustomer){
            let valueEmail = document.querySelector(".valueEmail");
            let valueFullname = document.querySelector(".valueFullname");
            let valueAddress = document.querySelector(".valueAddress");
            let valuePhone = document.querySelector(".valuePhone");
            valueEmail.value = user.inforCustomer.valueEmail;
            valueFullname.value = user.inforCustomer.valueName;
            valueAddress.value = user.inforCustomer.valueAddress,
            valuePhone.value = user.inforCustomer.valuePhone

        }
    }
}

checkCustomer();