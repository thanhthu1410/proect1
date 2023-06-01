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

            result +=
                `
                    
                <div class="product-detail">
                    <div class="img">
                        <img src="${cartUser[n].img}" alt="">
                    </div>
                    <div class="inforItem">
                        <p>${cartUser[n].name}</p>
                        <span> ${cartUser[n].quantity} / ${USDollar.format(cartUser[n].price)}</span> <br>
                       
                        <span class = "subtotal">Subtotal :${USDollar.format(cartUser[n].price * cartUser[n].quantity)}</span><br>
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

    let totalPrice = cartUser.reduce((totalPrice, curreValue) => {
        return totalPrice += curreValue.quantity * curreValue.price;
    }, 0)
    console.log(totalPrice);
    document.querySelector(".totalPrice").innerHTML = `Subtotal : ${USDollar.format(totalPrice)} `
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
function getProductLocal(localProductList, productId) {
    console.log("asdasdasd", localProductList, productId);
    for (let i in  localProductList) {
        if (localProductList[i].id == productId) {
            return localProductList[i]
        }
    }
    return false
}
function checkCart(localProductList, userCarts) {
    for (let i in userCarts) {
        console.log("id product", userCarts[i])
        let product = getProductLocal(localProductList, userCarts[i].id);
        console.log("kiem tra sp trong khop", product)
        console.log("kiem tra sp minh mua",  userCarts[i])
        if (!product) {
            return false
        }
        if (userCarts[i].quantity > temp.stock ) {
            return false
        }
    }
    return true
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
        console.log("infor in local", user.inforCustomer);
        console.log(user.cartUser);
        // chinh sua gio hang, va tru trong kho
        // user.cartUser.length = 0
        // localStorage.setItem("listUser",JSON.stringify(listUsers))

        user.receipts = [];
        let productList = JSON.parse(localStorage.getItem('listProducts'));
        if (!checkCart(productList, user.cartUser)) {
            console.log("don hang khong hop le")
        }else {
            console.log("don hang hop le")
        }
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