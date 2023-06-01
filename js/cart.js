
// hàm convert tiền tệ 
const USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
})

function showCartUser() {
    console.log("run");
    let idLogin = localStorage.getItem("checkLogin");
    let listUsers = JSON.parse(localStorage.getItem("listUser"));
    if (idLogin == null) {
        window.location.href = "./html/login.html"; 
    } else {
        let user = listUsers.find((item) => {
            return item.idUser == idLogin;
        })

        let cartUser = user.cartUser;

        let result = "";
        if (cartUser.length == 0) {
            document.querySelector(".note").style.display = "block";
            document.querySelector(".container").style.display = "none";
        } else {
            document.querySelector(".note").style.display = "none";
            // showCartUser()
            for (let n = 0; n < cartUser.length; n++) {

                result +=
                    `
                    <tr>
                        <td>${n + 1}</td>
                        <td>${cartUser[n].name}</td>
                        <td><img src="${cartUser[n].img}" alt=""></td>
                        <td>${USDollar.format(cartUser[n].price)}</td>
                        <td class="quantity">
                            <i onclick="decrease('${cartUser[n].img}', ${n})" class="fa-solid fa-minus"></i>
                            ${cartUser[n].quantity}
                            <i onclick="increase('${cartUser[n].img}')"" class="fa-sharp fa-regular fa-plus"></i>
                        </td>
                        <td>${USDollar.format(cartUser[n].price * cartUser[n].quantity)}</td>
                        <td><i class="fa-solid fa-trash-can" onclick="deleteProduct('${cartUser[n].img}')"></i></td>
                    
                    </tr>
                    `


            }

            document.getElementById("renderProduct").innerHTML =
                `
                    <tr>
                        <th>No</th>
                        <th>Name Product</th>
                        <th>Image</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                        <th>Delete</th>
                    </tr>
                    
                ${result}
                
                    
                `
            result = "";
        }


    }
}
showCartUser();

//function tang so luong san pham
function increase(imgProduct) {
    let listUser = JSON.parse(localStorage.getItem("listUser"));
    let idLogin = localStorage.getItem("checkLogin");
    for (let i = 0; i < listUser.length; i++) {
        if (idLogin == listUser[i].idUser) {
            for (let j = 0; j < listUser[i].cartUser.length; j++) {
                if (imgProduct == listUser[i].cartUser[j].img) {
                    listUser[i].cartUser[j].quantity = ++listUser[i].cartUser[j].quantity;
                    localStorage.setItem("listUser", JSON.stringify(listUser));
                    showCartUser();
                    showTotalCartProduct();
                     totalPrice();
                    return;
                }
            }
        }

    }
   
    // localStorage.setItem("cartTotal",JSON.stringify())
}
function decrease(imgProduct, index) {
    let listUser = JSON.parse(localStorage.getItem("listUser"));
    let idLogin = localStorage.getItem("checkLogin");
    for (let i = 0; i < listUser.length; i++) {
        if (idLogin == listUser[i].idUser) {
            if (listUser[i].cartUser[index].quantity > 1) {
                for (let j = 0; j < listUser[i].cartUser.length; j++) {
                    if (imgProduct == listUser[i].cartUser[j].img) {
                        listUser[i].cartUser[j].quantity = --listUser[i].cartUser[j].quantity;
                        localStorage.setItem("listUser", JSON.stringify(listUser));
                        showCartUser();
                        showTotalCartProduct();
                        totalPrice();
                        return;
                    }
                }
            } else {
                deleteProduct(imgProduct);
            }
        }
    }
}
function backArrow() {
    window.location.href = "../index.html"
}
function deleteProduct(imgProduct) {
    let listUser = JSON.parse(localStorage.getItem("listUser"));
    let idLogin = localStorage.getItem("checkLogin");

    for (let i = 0; i < listUser.length; i++) {
        if (idLogin == listUser[i].idUser) {
            let cartUser = listUser[i].cartUser;
            // lấy cart user ra để lọc những item khác nhau
            let updatedCart = cartUser.filter((item) => item.img !== imgProduct);
            listUser[i].cartUser = updatedCart;
            localStorage.setItem("listUser", JSON.stringify(listUser));
            showCartUser(JSON.parse(localStorage.getItem("listUser")))
            showTotalCartProduct();
             totalPrice();
            return;
        }
    }
    

}

function showTotalCartProduct() {

    let listUser = JSON.parse(localStorage.getItem("listUser"));
    let checkIsLogin = localStorage.getItem("checkLogin");
    let user = listUser.find((item) => {
        return item.idUser == checkIsLogin
    })

    let cartUser = user.cartUser;

    let total = cartUser.reduce((total, curreValue) => {
        return total += curreValue.quantity;
    }, 0)

    // localStorage.setItem("cartTotal", user.cartUser.length);
    document.querySelector(".totalQuantity").innerHTML = `Total quantity: ${total} items`;
}
showTotalCartProduct()

// hàm tính total sản phẩm
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
    // showCartUser()


}
totalPrice()
function ShippingNow() {
    window.location.href = "../html/checkout.html" 
    
}
